import { create } from "zustand"

interface Ingredient {
  id: string
  name: string
}

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

interface RecipeStore {
  ingredients: Ingredient[]
  recipes: Recipe[]
  selectedRecipe: Recipe | null
  isLoading: boolean
  fridgeOpen: boolean
  addIngredient: (name: string) => void
  removeIngredient: (id: string) => void
  clearIngredients: () => void
  setRecipes: (recipes: Recipe[]) => void
  setSelectedRecipe: (recipe: Recipe | null) => void
  clearRecipes: () => void
  setLoading: (loading: boolean) => void
  toggleFridge: () => void
  setFridgeOpen: (open: boolean) => void
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  ingredients: [],
  recipes: [],
  selectedRecipe: null,
  isLoading: false,
  fridgeOpen: false,
  addIngredient: (name) =>
    set((state) => ({
      ingredients: [...state.ingredients, { id: Date.now().toString(), name: name.trim() }],
    })),
  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((ingredient) => ingredient.id !== id),
    })),
  clearIngredients: () => set({ ingredients: [], recipes: [], selectedRecipe: null }),
  setRecipes: (recipes) => set({ recipes, selectedRecipe: null }),
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  clearRecipes: () => set({ recipes: [], selectedRecipe: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleFridge: () => set((state) => ({ fridgeOpen: !state.fridgeOpen })),
  setFridgeOpen: (open) => set({ fridgeOpen: open }),
}))
