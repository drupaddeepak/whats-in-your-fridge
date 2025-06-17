"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRecipeStore } from "@/lib/store"
import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import FridgeShelves from "./FridgeShelves"

interface FridgeDoorProps {
  children: ReactNode
}

export default function FridgeDoor({ children }: FridgeDoorProps) {
  const { fridgeOpen, toggleFridge, setFridgeOpen } = useRecipeStore()
  const [lightOn, setLightOn] = useState(false)
  const [doorShadow, setDoorShadow] = useState(false)
  const [showShelves, setShowShelves] = useState(false)

  useEffect(() => {
    if (fridgeOpen) {
      const timer = setTimeout(() => setLightOn(true), 200)
      const shelvesTimer = setTimeout(() => setShowShelves(true), 1000) // Show shelves after content loads
      setDoorShadow(true)
      return () => {
        clearTimeout(timer)
        clearTimeout(shelvesTimer)
      }
    } else {
      setLightOn(false)
      setDoorShadow(false)
      setShowShelves(false)
    }
  }, [fridgeOpen])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const fridgeElement = document.querySelector('.fridge-hum')
      if (fridgeOpen && fridgeElement && !fridgeElement.contains(event.target as Node)) {
        setFridgeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [fridgeOpen, setFridgeOpen])

  return (
    <div className="relative perspective-1000">
      {/* Fridge Shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-8 bg-black/20 rounded-full blur-md"
        animate={{
          scale: fridgeOpen ? 1.2 : 1,
          opacity: fridgeOpen ? 0.3 : 0.2,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Main Fridge Container */}
      <div className="relative">
        {/* Fridge Body */}
        <motion.div
          className="relative w-96 h-[600px] bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl shadow-2xl border-4 border-blue-300 overflow-hidden"
          animate={{
            scale: fridgeOpen ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Fridge Top Vent */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-blue-400 rounded-full opacity-60" />
          <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full opacity-40" />

          {/* Fridge Interior */}
          <div className="absolute inset-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden border-2 border-blue-200">
            {/* Interior Light */}
            <AnimatePresence>
              {lightOn && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-2 right-2 w-8 h-2 bg-blue-200 rounded-full shadow-lg z-20"
                  style={{
                    boxShadow: lightOn ? "0 0 20px rgba(59, 130, 246, 0.3)" : "none",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Add the detailed shelving system here */}
            <FridgeShelves isOpen={fridgeOpen} lightOn={lightOn} showAfterColumn={showShelves} />

            {/* Content Area */}
            <AnimatePresence>
              {fridgeOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="p-4 h-full relative z-10"
                  style={{
                    background: lightOn
                      ? "linear-gradient(to bottom, rgba(239,246,255,0.95), rgba(219,234,254,0.95))"
                      : "linear-gradient(to bottom, rgba(239,246,255,0.85), rgba(219,234,254,0.85))",
                  }}
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fridge Door */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-2xl shadow-2xl border-4 border-blue-300 cursor-pointer overflow-hidden"
            animate={{
              rotateY: fridgeOpen ? -125 : 0,
              x: fridgeOpen ? -20 : 0,
              z: fridgeOpen ? 50 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              duration: 0.8,
            }}
            onClick={toggleFridge}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              boxShadow: doorShadow
                ? "20px 0 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1)"
                : "0 10px 30px rgba(59, 130, 246, 0.2)",
            }}
            whileHover={{ scale: fridgeOpen ? 1 : 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Door Handle */}
            <motion.div
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg"
              animate={{
                boxShadow: fridgeOpen
                  ? "inset 2px 0 4px rgba(0,0,0,0.3), 2px 0 8px rgba(0,0,0,0.2)"
                  : "inset 1px 0 2px rgba(0,0,0,0.2), 1px 0 4px rgba(0,0,0,0.1)",
              }}
              whileHover={{ scale: 1.05 }}
            />

            {/* Door Handle Grip */}
            <div className="absolute right-7 top-1/2 transform -translate-y-1/2 w-2 h-12 bg-blue-600 rounded-full" />

            {/* Door Shelves/Compartments with Items */}
            <div className="absolute inset-6 space-y-6">
              <motion.div
                className="relative h-12 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg shadow-inner border border-blue-300"
                animate={{ opacity: fridgeOpen ? 0.3 : 0.7 }}
              >
                {/* Condiments on door shelf */}
                <FridgeShelves isOpen={false} lightOn={false} showAfterColumn={false} />
              </motion.div>
              <motion.div
                className="h-12 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg shadow-inner border border-blue-300"
                animate={{ opacity: fridgeOpen ? 0.3 : 0.7 }}
              />
              <motion.div
                className="h-16 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg shadow-inner border border-blue-300"
                animate={{ opacity: fridgeOpen ? 0.3 : 0.7 }}
              />
            </div>

            {/* Brand Logo */}
            <motion.div
              className="absolute top-12 left-1/2 transform -translate-x-1/2"
              animate={{ opacity: fridgeOpen ? 0.4 : 1 }}
            >
              <h2 className="text-3xl font-bold text-blue-700 tracking-wider">What's in Fridge</h2>
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mt-1" />
            </motion.div>

            {/* Temperature Display */}
            <motion.div
              className="absolute top-32 right-8 bg-blue-900 text-blue-200 px-3 py-1 rounded font-mono text-sm"
              animate={{ opacity: fridgeOpen ? 0.3 : 0.8 }}
            >
              38°F
            </motion.div>

            {/* Click to Open Text */}
            <AnimatePresence>
              {!fridgeOpen && (
                <motion.div
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0.6, 1, 0.6], y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    y: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="bg-blue-50/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-blue-200"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(239,246,255,0.9)" }}
                  >
                    <p className="text-blue-700 font-medium">🍽️ Click to open</p>
                    <p className="text-blue-500 text-xs">What's in your fridge?</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Door Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
          </motion.div>

          {/* Freezer Section */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-100 to-blue-200 border-b-2 border-blue-300 rounded-t-2xl overflow-hidden"
            animate={{ opacity: fridgeOpen ? 0.5 : 1 }}
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-semibold">
              FREEZER
            </div>
            <div className="absolute bottom-2 left-4 right-4 h-1 bg-blue-400 rounded-full opacity-60" />
          </motion.div>
        </motion.div>

        {/* Floor Reflection */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-200/30 to-transparent rounded-2xl blur-sm"
          animate={{
            opacity: fridgeOpen ? 0.6 : 0.4,
            scaleX: fridgeOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
