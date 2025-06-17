"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface ShelfItem {
  id: string
  name: string
  emoji: string
  container?: string
  position: { x: number; y: number; z?: number }
  size: "small" | "medium" | "large"
  type: "dairy" | "vegetable" | "fruit" | "condiment" | "frozen" | "meat" | "beverage"
}

const shelfItems: ShelfItem[] = [
  // Top Shelf - Dairy & Beverages
  {
    id: "milk",
    name: "Milk",
    emoji: "🥛",
    position: { x: 15, y: 20 },
    size: "large",
    type: "dairy",
    container: "carton",
  },
  {
    id: "orange-juice",
    name: "Orange Juice",
    emoji: "🧃",
    position: { x: 35, y: 22 },
    size: "medium",
    type: "beverage",
    container: "carton",
  },
  {
    id: "yogurt-cups",
    name: "Yogurt",
    emoji: "🥛",
    position: { x: 55, y: 18 },
    size: "medium",
    type: "dairy",
    container: "plastic-cups",
  },
  {
    id: "cream",
    name: "Heavy Cream",
    emoji: "🥛",
    position: { x: 75, y: 20 },
    size: "small",
    type: "dairy",
    container: "bottle",
  },

  // Second Shelf - Leftovers & Prepared Foods
  {
    id: "leftover-pasta",
    name: "Leftover Pasta",
    emoji: "🍝",
    position: { x: 20, y: 45 },
    size: "medium",
    type: "meat",
    container: "tupperware",
  },
  {
    id: "cheese-block",
    name: "Cheddar Cheese",
    emoji: "🧀",
    position: { x: 45, y: 42 },
    size: "medium",
    type: "dairy",
    container: "wrapper",
  },
  {
    id: "deli-meat",
    name: "Deli Turkey",
    emoji: "🥩",
    position: { x: 70, y: 44 },
    size: "medium",
    type: "meat",
    container: "package",
  },

  // Crisper Drawers - Vegetables
  {
    id: "lettuce",
    name: "Lettuce",
    emoji: "🥬",
    position: { x: 25, y: 72 },
    size: "large",
    type: "vegetable",
    container: "crisper",
  },
  {
    id: "carrots",
    name: "Carrots",
    emoji: "🥕",
    position: { x: 50, y: 70 },
    size: "medium",
    type: "vegetable",
    container: "bag",
  },
  {
    id: "bell-peppers",
    name: "Bell Peppers",
    emoji: "🫑",
    position: { x: 75, y: 73 },
    size: "medium",
    type: "vegetable",
    container: "loose",
  },

  // Fruit Drawer
  {
    id: "apple-bowl",
    name: "Apples",
    emoji: "🍎",
    position: { x: 20, y: 85 },
    size: "large",
    type: "fruit",
    container: "bowl",
  },
  {
    id: "grapes",
    name: "Grapes",
    emoji: "🍇",
    position: { x: 50, y: 83 },
    size: "medium",
    type: "fruit",
    container: "bag",
  },
  {
    id: "oranges",
    name: "Oranges",
    emoji: "🍊",
    position: { x: 75, y: 86 },
    size: "medium",
    type: "fruit",
    container: "net-bag",
  },
]

const freezerItems: ShelfItem[] = [
  {
    id: "ice-cream",
    name: "Vanilla Ice Cream",
    emoji: "🍦",
    position: { x: 25, y: 15 },
    size: "large",
    type: "frozen",
    container: "tub",
  },
  {
    id: "frozen-peas",
    name: "Frozen Peas",
    emoji: "🟢",
    position: { x: 55, y: 12 },
    size: "medium",
    type: "frozen",
    container: "bag",
  },
  {
    id: "ice-cubes",
    name: "Ice",
    emoji: "🧊",
    position: { x: 80, y: 14 },
    size: "medium",
    type: "frozen",
    container: "tray",
  },
]

const doorItems: ShelfItem[] = [
  // Top door shelf
  {
    id: "ketchup",
    name: "Ketchup",
    emoji: "🍅",
    position: { x: 20, y: 25 },
    size: "medium",
    type: "condiment",
    container: "bottle",
  },
  {
    id: "mustard",
    name: "Mustard",
    emoji: "🟡",
    position: { x: 45, y: 23 },
    size: "small",
    type: "condiment",
    container: "squeeze",
  },
  {
    id: "mayo",
    name: "Mayonnaise",
    emoji: "⚪",
    position: { x: 70, y: 24 },
    size: "medium",
    type: "condiment",
    container: "jar",
  },

  // Middle door shelf
  {
    id: "salad-dressing",
    name: "Ranch Dressing",
    emoji: "🥗",
    position: { x: 25, y: 50 },
    size: "medium",
    type: "condiment",
    container: "bottle",
  },
  {
    id: "hot-sauce",
    name: "Hot Sauce",
    emoji: "🌶️",
    position: { x: 55, y: 48 },
    size: "small",
    type: "condiment",
    container: "bottle",
  },

  // Bottom door shelf - Eggs
  {
    id: "eggs",
    name: "Eggs",
    emoji: "🥚",
    position: { x: 40, y: 75 },
    size: "large",
    type: "dairy",
    container: "carton",
  },
]

interface FridgeShelvesProps {
  isOpen: boolean
  lightOn: boolean
  showAfterColumn?: boolean
}

export default function FridgeShelves({ isOpen, lightOn, showAfterColumn = true }: FridgeShelvesProps) {
  const [visibleItems, setVisibleItems] = useState<ShelfItem[]>([])
  const [visibleFreezerItems, setVisibleFreezerItems] = useState<ShelfItem[]>([])
  const [visibleDoorItems, setVisibleDoorItems] = useState<ShelfItem[]>([])

  useEffect(() => {
    if (isOpen && showAfterColumn) {
      // Delay to show after the "What can I make?" column appears
      const timer = setTimeout(() => {
        // Main fridge items
        shelfItems.forEach((item, index) => {
          setTimeout(() => {
            setVisibleItems((prev) => [...prev, item])
          }, index * 80)
        })

        // Freezer items
        freezerItems.forEach((item, index) => {
          setTimeout(
            () => {
              setVisibleFreezerItems((prev) => [...prev, item])
            },
            (index + shelfItems.length) * 80,
          )
        })

        // Door items
        doorItems.forEach((item, index) => {
          setTimeout(
            () => {
              setVisibleDoorItems((prev) => [...prev, item])
            },
            (index + shelfItems.length + freezerItems.length) * 80,
          )
        })
      }, 800) // Wait for main content to appear

      return () => clearTimeout(timer)
    } else {
      setVisibleItems([])
      setVisibleFreezerItems([])
      setVisibleDoorItems([])
    }
  }, [isOpen, showAfterColumn])

  const getContainerStyle = (container?: string, size?: string) => {
    const baseClasses = "flex items-center justify-center rounded-lg transition-all duration-300"

    switch (container) {
      case "carton":
        return `${baseClasses} bg-white border-2 border-gray-200 shadow-md`
      case "bottle":
        return `${baseClasses} bg-gradient-to-b from-green-100 to-green-200 border border-green-300 shadow-sm`
      case "jar":
        return `${baseClasses} bg-gradient-to-b from-yellow-50 to-yellow-100 border border-yellow-200 shadow-sm`
      case "tupperware":
        return `${baseClasses} bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-200 shadow-md`
      case "bag":
        return `${baseClasses} bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 shadow-sm`
      case "bowl":
        return `${baseClasses} bg-gradient-to-b from-white to-gray-50 border-2 border-gray-300 shadow-lg rounded-full`
      case "crisper":
        return `${baseClasses} bg-gradient-to-b from-green-50 to-green-100 border border-green-200 shadow-md rounded-xl`
      case "tub":
        return `${baseClasses} bg-gradient-to-b from-pink-50 to-pink-100 border border-pink-200 shadow-md rounded-xl`
      case "tray":
        return `${baseClasses} bg-gradient-to-b from-blue-100 to-blue-200 border border-blue-300 shadow-sm`
      default:
        return `${baseClasses} bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg`
    }
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return "w-8 h-8 text-lg"
      case "medium":
        return "w-10 h-10 text-xl"
      case "large":
        return "w-12 h-12 text-2xl"
      default:
        return "w-10 h-10 text-xl"
    }
  }

  const renderShelfStructure = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Shelf lines */}
      <motion.div
        className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-gray-300/60 to-transparent rounded-full"
        style={{ top: "35%" }}
        animate={{ opacity: lightOn ? 0.8 : 0.4 }}
      />
      <motion.div
        className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-gray-300/60 to-transparent rounded-full"
        style={{ top: "60%" }}
        animate={{ opacity: lightOn ? 0.8 : 0.4 }}
      />

      {/* Crisper drawers */}
      <motion.div
        className="absolute left-2 right-2 bottom-8 h-16 bg-gradient-to-b from-green-50/60 to-green-100/60 border border-green-200/40 rounded-lg"
        animate={{ opacity: lightOn ? 0.6 : 0.3 }}
      />
    </div>
  )

  return (
    <>
      {/* Shelf Structure */}
      {isOpen && renderShelfStructure()}

      {/* Main Fridge Items */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`absolute ${getSizeClasses(item.size)}`}
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: item.position.z || 1,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: 30,
                rotateX: -90,
              }}
              animate={{
                opacity: lightOn ? 1 : 0.7,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0,
                y: -30,
                rotateX: 90,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
              whileHover={{
                scale: 1.15,
                z: 20,
                transition: { duration: 0.2 },
              }}
            >
              {/* Item Shadow */}
              <motion.div
                className="absolute inset-0 bg-black/20 rounded-lg blur-sm"
                style={{ transform: "translateY(3px)" }}
                animate={{
                  opacity: lightOn ? 0.4 : 0.2,
                }}
              />

              {/* Item Container */}
              <motion.div
                className={getContainerStyle(item.container, item.size)}
                style={{
                  filter: lightOn ? "brightness(1.1) saturate(1.1)" : "brightness(0.8) saturate(0.8)",
                }}
                animate={{
                  boxShadow: lightOn
                    ? "0 6px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3)"
                    : "0 3px 6px rgba(0,0,0,0.1)",
                }}
              >
                <span className="select-none drop-shadow-sm">{item.emoji}</span>
              </motion.div>

              {/* Item Label */}
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Freezer Items */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none">
        <AnimatePresence>
          {visibleFreezerItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`absolute ${getSizeClasses(item.size)}`}
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: -20,
              }}
              animate={{
                opacity: lightOn ? 0.9 : 0.6,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className={getContainerStyle(item.container, item.size)}
                style={{
                  filter: "brightness(0.9) saturate(0.9) hue-rotate(-10deg)",
                }}
              >
                <span className="select-none">{item.emoji}</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
              >
                {item.name}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Door Items (rendered when door is closed) */}
      {!isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {visibleDoorItems.map((item, index) => (
              <motion.div
                key={`door-${item.id}`}
                className={`absolute ${getSizeClasses(item.size)}`}
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.6, scale: 0.9 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
              >
                <div className={getContainerStyle(item.container, item.size)}>
                  <span className="select-none opacity-70">{item.emoji}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Special Effects */}
      {isOpen && lightOn && (
        <AnimatePresence>
          {/* Fridge Frost Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 2 }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`frost-${i}`}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4,
                  delay: Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 5,
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}
