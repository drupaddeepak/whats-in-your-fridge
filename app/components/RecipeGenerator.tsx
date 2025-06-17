"use client"

import { Button } from "@/components/ui/button"
import { useRecipeStore } from "@/lib/store"
import { Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function RecipeGenerator() {
  const { ingredients, isLoading, setLoading, setRecipes, clearRecipes } = useRecipeStore()

  const generateRecipes = async () => {
    if (ingredients.length === 0) return

    setLoading(true)
    clearRecipes()

    try {
      console.log("Sending request with ingredients:", ingredients)
      
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredients.map((ing) => ing.name),
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          data
        })
        throw new Error(data.error || `Failed to generate recipes (${response.status})`)
      }

      if (!data.recipes || !Array.isArray(data.recipes)) {
        console.error("Invalid response format:", data)
        throw new Error("Invalid response from server")
      }

      setRecipes(data.recipes)
    } catch (error) {
      console.error("Error generating recipes:", error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to generate recipes. Please try again."
      
      toast.error(errorMessage, {
        duration: 5000,
        description: "Check the console for more details"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={generateRecipes}
      disabled={ingredients.length === 0 || isLoading}
      className="w-full bg-green-600 hover:bg-green-700 text-white"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Cooking up ideas...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 mr-2" />
          What can I make?
        </>
      )}
    </Button>
  )
}
