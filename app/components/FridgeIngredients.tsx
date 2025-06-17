"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface IngredientItem {
  id: string
  name: string
  emoji: string
  position: { shelf: number; x: number }
  size: "small" | "medium" | "large"
}

const fridgeIngredients: IngredientItem[] = [
  // Top shelf
  { id: "1", name: "Milk", emoji: "🥛", position: { shelf: 1, x: 20 }, size: "large" },
  { id: "2", name: "Orange Juice", emoji: "🧃", position: { shelf: 1, x: 60 }, size: "medium" },
  { id: "3", name: "Yogurt", emoji: "🥛", position: { shelf: 1, x: 85 }, size: "small" },

  // Middle shelf
  { id: "4", name: "Cheese", emoji: "🧀", position: { shelf: 2, x: 15 }, size: "medium" },
  { id: "5", name: "Eggs", emoji: "🥚", position: { shelf: 2, x: 40 }, size: "medium" },
  { id: "6", name: "Butter", emoji: "🧈", position: { shelf: 2, x: 65 }, size: "small" },
  { id: "7", name: "Jam", emoji: "🍯", position: { shelf: 2, x: 85 }, size: "small" },

  // Bottom shelf
  { id: "8", name: "Lettuce", emoji: "🥬", position: { shelf: 3, x: 10 }, size: "large" },
  { id: "9", name: "Tomatoes", emoji: "🍅", position: { shelf: 3, x: 35 }, size: "medium" },
  { id: "10", name: "Carrots", emoji: "🥕", position: { shelf: 3, x: 60 }, size: "medium" },
  { id: "11", name: "Apples", emoji: "🍎", position: { shelf: 3, x: 80 }, size: "medium" },

  // Door compartments
  { id: "12", name: "Ketchup", emoji: "🍅", position: { shelf: 4, x: 25 }, size: "small" },
  { id: "13", name: "Mustard", emoji: "🟡", position: { shelf: 4, x: 50 }, size: "small" },
  { id: "14", name: "Mayo", emoji: "⚪", position: { shelf: 4, x: 75 }, size: "small" },
]

interface FridgeIngredientsProps {
  isOpen: boolean
  lightOn: boolean
}

export default function FridgeIngredients({ isOpen, lightOn }: FridgeIngredientsProps) {
  const [visibleIngredients, setVisibleIngredients] = useState<IngredientItem[]>([])

  useEffect(() => {
    if (isOpen) {
      // Stagger the appearance of ingredients
      fridgeIngredients.forEach((ingredient, index) => {
        setTimeout(() => {
          setVisibleIngredients((prev) => [...prev, ingredient])
        }, index * 100)
      })
    } else {
      setVisibleIngredients([])
    }
  }, [isOpen])

  const getShelfTop = (shelf: number) => {
    switch (shelf) {
      case 1:
        return "15%" // Top shelf
      case 2:
        return "40%" // Middle shelf
      case 3:
        return "65%" // Bottom shelf
      case 4:
        return "85%" // Door shelf
      default:
        return "50%"
    }
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return "w-6 h-6 text-lg"
      case "medium":
        return "w-8 h-8 text-xl"
      case "large":
        return "w-10 h-10 text-2xl"
      default:
        return "w-8 h-8 text-xl"
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {visibleIngredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.id}
            className={`absolute ${getSizeClasses(ingredient.size)} flex items-center justify-center`}
            style={{
              top: getShelfTop(ingredient.position.shelf),
              left: `${ingredient.position.x}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              opacity: 0,
              scale: 0,
              y: 20,
              rotateY: -90,
            }}
            animate={{
              opacity: lightOn ? 1 : 0.7,
              scale: 1,
              y: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
              y: -20,
              rotateY: 90,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            whileHover={{
              scale: 1.2,
              z: 10,
              transition: { duration: 0.2 },
            }}
          >
            {/* Ingredient Shadow */}
            <motion.div
              className="absolute inset-0 bg-black/20 rounded-full blur-sm"
              style={{ transform: "translateY(2px)" }}
              animate={{
                opacity: lightOn ? 0.3 : 0.1,
              }}
            />

            {/* Ingredient */}
            <motion.div
              className="relative bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/50 flex items-center justify-center"
              style={{
                filter: lightOn ? "brightness(1.1)" : "brightness(0.8)",
              }}
              animate={{
                boxShadow: lightOn
                  ? "0 4px 8px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)"
                  : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <span className="select-none">{ingredient.emoji}</span>
            </motion.div>

            {/* Ingredient Label (appears on hover) */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {ingredient.name}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Shelf Highlights */}
      <AnimatePresence>
        {isOpen && lightOn && (
          <>
            {[1, 2, 3].map((shelf) => (
              <motion.div
                key={`shelf-${shelf}`}
                className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ top: getShelfTop(shelf) }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ delay: shelf * 0.1, duration: 0.3 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Condensation Effect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Condensation droplets */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`droplet-${i}`}
                className="absolute w-1 h-1 bg-blue-200/60 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, 10, 20],
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
