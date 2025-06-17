import { GoogleGenerativeAI } from "@google/generative-ai"

// Add debugging for API key
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing")
  throw new Error("GEMINI_API_KEY is not configured. Please add it to your .env.local file.")
}

// Log first few characters of API key for debugging (safely)
console.log("API Key starts with:", apiKey.substring(0, 4) + "...")

const genAI = new GoogleGenerativeAI(apiKey)

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json()

    if (!ingredients || ingredients.length === 0) {
      return Response.json({ error: "No ingredients provided" }, { status: 400 })
    }

    console.log("Generating recipes for ingredients:", ingredients)

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Create 3 different simple recipes using only the following ingredients: ${ingredients.join(", ")}. 
Each recipe should be easy to prepare with common kitchen tools and take no more than 30 minutes. 
Provide variety in cooking methods (e.g., one could be a salad, one cooked, one baked, etc.).

For each recipe, provide:
- A concise recipe name
- List of ingredients used (only from the provided list)
- Step-by-step instructions (3-5 steps)
- Basic cooking time estimate
- Difficulty level (Easy/Medium)
- Cooking method (Raw/Stovetop/Oven/etc.)

If the ingredients can't make complete dishes, suggest simple additions that would complete each meal.

Please format your response as JSON with this structure:
{
  "recipes": [
    {
      "id": 1,
      "name": "Recipe Name 1",
      "ingredients": ["ingredient1", "ingredient2"],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "cookingTime": "15-20 minutes",
      "difficulty": "Easy",
      "method": "Stovetop",
      "suggestions": "Optional suggestions for additional ingredients"
    },
    {
      "id": 2,
      "name": "Recipe Name 2",
      "ingredients": ["ingredient1", "ingredient3"],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "cookingTime": "10-15 minutes",
      "difficulty": "Easy",
      "method": "Raw",
      "suggestions": "Optional suggestions for additional ingredients"
    },
    {
      "id": 3,
      "name": "Recipe Name 3",
      "ingredients": ["ingredient2", "ingredient3"],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "cookingTime": "20-25 minutes",
      "difficulty": "Medium",
      "method": "Oven",
      "suggestions": "Optional suggestions for additional ingredients"
    }
  ]
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to parse JSON from the response
    let recipes
    try {
      // Extract JSON from the response if it's wrapped in markdown
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
      const jsonText = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text
      const parsed = JSON.parse(jsonText)
      recipes = parsed.recipes || parsed
    } catch (parseError) {
      // If JSON parsing fails, create structured responses from the text
      const sections = text.split(/Recipe \d+:|##|\*\*/).filter((section) => section.trim().length > 20)
      recipes = sections.slice(0, 3).map((section, index) => ({
        id: index + 1,
        name: `Recipe Option ${index + 1}`,
        ingredients: ingredients,
        instructions: section
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .slice(0, 5),
        cookingTime: "15-30 minutes",
        difficulty: "Easy",
        method: "Stovetop",
        suggestions: "Check the full response for additional suggestions",
      }))
    }

    // Ensure we have at least 3 recipes
    while (recipes.length < 3) {
      recipes.push({
        id: recipes.length + 1,
        name: `Simple Recipe ${recipes.length + 1}`,
        ingredients: ingredients.slice(0, 3),
        instructions: [
          "Prepare your ingredients",
          "Combine ingredients as desired",
          "Cook or serve as appropriate",
          "Season to taste",
          "Enjoy your meal!",
        ],
        cookingTime: "15-20 minutes",
        difficulty: "Easy",
        method: "Stovetop",
        suggestions: "Add salt, pepper, and oil as needed",
      })
    }

    return Response.json({ recipes: recipes.slice(0, 3) })
  } catch (error) {
    console.error("Recipe generation error:", error)
    
    // More specific error messages with better debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      })

      if (error.message.includes("API key")) {
        return Response.json(
          { error: "API key is not configured correctly. Please check your .env.local file." },
          { status: 500 }
        )
      }
      if (error.message.includes("quota")) {
        return Response.json(
          { error: "API quota exceeded. Please try again later." },
          { status: 429 }
        )
      }
    }
    
    return Response.json(
      { error: "Failed to generate recipes. Please try again." },
      { status: 500 }
    )
  }
}
