"use client"

import * as React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "@/components/products/products-grid"

export interface CartItem {
  product: Product
  quantity: number
  selectedOptions?: Record<string, string>
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; options?: Record<string, string> } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; options?: Record<string, string> } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number; options?: Record<string, string> } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number, options?: Record<string, string>) => void
  removeItem: (productId: string, options?: Record<string, string>) => void
  updateQuantity: (productId: string, quantity: number, options?: Record<string, string>) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, options = {} } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === product._id && JSON.stringify(item.selectedOptions) === JSON.stringify(options),
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += quantity
        return { items: updatedItems }
      } else {
        return {
          items: [...state.items, { product, quantity, selectedOptions: options }],
        }
      }
    }

    case "REMOVE_ITEM": {
      const { productId, options = {} } = action.payload
      return {
        items: state.items.filter(
          (item) =>
            !(item.product._id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(options)),
        ),
      }
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity, options = {} } = action.payload
      return {
        items: state.items.map((item) =>
          item.product._id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(options)
            ? { ...item, quantity }
            : item,
        ),
      }
    }

    case "CLEAR_CART":
      return { items: [] }

    case "LOAD_CART":
      return { items: action.payload }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart-storage")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: parsedCart.state?.items || [] })
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart-storage", JSON.stringify({ state }))
  }, [state])

  const addItem = (product: Product, quantity = 1, options = {}) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, options } })
  }

  const removeItem = (productId: string, options = {}) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, options } })
  }

  const updateQuantity = (productId: string, quantity: number, options = {}) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity, options } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
