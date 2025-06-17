"use client"

import FridgeDoor from "./components/FridgeDoor"
import IngredientInput from "./components/IngredientInput"
import RecipeDisplay from "./components/RecipeDisplay"
import RecipeOptions from "./components/RecipeOptions"
import RecipeGenerator from "./components/RecipeGenerator"
import { useRecipeStore } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const { recipes, selectedRecipe, fridgeOpen } = useRecipeStore()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Kitchen Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Kitchen Counter */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100 to-amber-50 opacity-30" />

        {/* Kitchen Tiles Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border border-gray-300" />
            ))}
          </div>
        </div>

        {/* Ambient Kitchen Lighting */}
        <motion.div
          className="absolute top-20 left-1/4 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="fridge-hum"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FridgeDoor>
          <div className="h-full flex flex-col">
            <IngredientInput />

            <div className="mt-4">
              <RecipeGenerator />
            </div>

            <div className="flex-1 overflow-y-auto mt-4 recipe-scroll">
              <AnimatePresence mode="wait">
                {selectedRecipe ? (
                  <RecipeDisplay key="selected" recipe={selectedRecipe} />
                ) : recipes.length > 0 ? (
                  <RecipeOptions key="options" recipes={recipes} />
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </FridgeDoor>
      </motion.div>
    </div>
  )
}
