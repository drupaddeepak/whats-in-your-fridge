"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRecipeStore } from "@/lib/store"
import { Clock, ChefHat, Lightbulb, ArrowLeft, Utensils } from "lucide-react"

interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  cookingTime: string
  difficulty: string
  method: string
  suggestions?: string
}

interface RecipeDisplayProps {
  recipe: Recipe
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const { setSelectedRecipe } = useRecipeStore()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "stovetop":
        return "🔥"
      case "oven":
        return "🔥"
      case "raw":
        return "🥗"
      case "microwave":
        return "📡"
      case "grill":
        return "🔥"
      default:
        return "🍳"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4"
    >
      <Card className="bg-white/95 backdrop-blur-sm border-green-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-green-800 mb-2">
                <ChefHat className="w-5 h-5" />
                {recipe.name}
              </CardTitle>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {recipe.cookingTime}
                </div>
                <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                <div className="flex items-center gap-1">
                  <span>{getMethodIcon(recipe.method)}</span>
                  <span className="text-gray-600 text-sm">{recipe.method}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setSelectedRecipe(null)} variant="ghost" size="icon" className="ml-2 h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Ingredients */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Ingredients:
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="outline" className="text-sm bg-blue-50 text-blue-800">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">📝 Instructions:</h4>
            <ol className="space-y-3">
              {recipe.instructions.map((step, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Suggestions */}
          {recipe.suggestions && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 text-sm">💡 Chef's Suggestions:</h4>
                  <p className="text-sm text-yellow-700 mt-1">{recipe.suggestions}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
