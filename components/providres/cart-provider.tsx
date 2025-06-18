"use client"

import { CartProvider as CartContextProvider } from "@/components/cart/use-cart"
import type React from "react"

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>
}
