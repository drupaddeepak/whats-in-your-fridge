"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRecipeStore } from "@/lib/store"
import { Clock, ChefHat, Utensils, Star, ArrowRight } from "lucide-react"

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

interface RecipeOptionsProps {
  recipes: Recipe[]
}

export default function RecipeOptions({ recipes }: RecipeOptionsProps) {
  const { setSelectedRecipe } = useRecipeStore()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "raw":
        return "bg-green-50 text-green-700 border-green-200"
      case "stovetop":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "oven":
        return "bg-red-50 text-red-700 border-red-200"
      case "microwave":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 space-y-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🍽️ Recipe Options</h3>
        <p className="text-sm text-gray-600">Choose a recipe that sounds delicious!</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto recipe-scroll">
        <AnimatePresence>
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-green-300 transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-green-600" />
                      {recipe.name}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Badge variant="outline" className={getDifficultyColor(recipe.difficulty)}>
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.cookingTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{getMethodIcon(recipe.method)}</span>
                      <Badge variant="outline" className={`text-xs ${getMethodColor(recipe.method)}`}>
                        {recipe.method}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Ingredients Preview */}
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Ingredients:</h5>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                          {ingredient}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{recipe.ingredients.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Instructions Preview */}
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Quick Steps:</h5>
                    <p className="text-xs text-gray-600 line-clamp-2">{recipe.instructions[0]}...</p>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm h-8"
                    size="sm"
                  >
                    <Utensils className="w-3 h-3 mr-1" />
                    Cook This Recipe
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>

                  {/* Suggestions */}
                  {recipe.suggestions && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                      <div className="flex items-start gap-1">
                        <Star className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-yellow-700">{recipe.suggestions}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center pt-2">
        <p className="text-xs text-gray-500">💡 Tip: Click any recipe to see full cooking instructions</p>
      </div>
    </motion.div>
  )
}
