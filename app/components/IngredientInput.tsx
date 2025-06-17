"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRecipeStore } from "@/lib/store"
import { Plus, X } from "lucide-react"

export default function IngredientInput() {
  const [inputValue, setInputValue] = useState("")
  const { ingredients, addIngredient, removeIngredient, clearIngredients } = useRecipeStore()

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      addIngredient(inputValue)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddIngredient()
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">What's in your fridge?</h3>

        <div className="flex gap-2 mb-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add an ingredient..."
            className="flex-1"
          />
          <Button onClick={handleAddIngredient} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {ingredients.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge
                  key={ingredient.id}
                  variant="secondary"
                  className="flex items-center gap-1 bg-blue-100 text-blue-800"
                >
                  {ingredient.name}
                  <button
                    onClick={() => removeIngredient(ingredient.id)}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={clearIngredients} variant="outline" size="sm" className="text-xs">
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
