"use client"

import type { CartItem as CartItemType } from "@/components/cart/use-cart"
import { useCart } from "@/components/cart/use-cart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import CartItem from "./cart-item"

export default function CartContent() {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Get cart from context - safely with error handling
  let items: CartItemType[] = []
  let getTotalPrice: () => number = () => 0
  let clearCart: () => void = () => {}

  const cart = useCart()

  try {
    items = cart.items
    getTotalPrice = cart.getTotalPrice
    clearCart = cart.clearCart
  } catch (error) {
    console.error("Cart context not available:", error)
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Order placed successfully!")
    clearCart()
    setIsCheckingOut(false)
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Looks like you haven&apos;t added any parts to your cart yet.
        </p>
        <Button asChild className="bg-[#670D2F] hover:bg-[#670D2F]/90">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={`${item.product._id}-${item.selectedOptions?.color || "default"}`} item={item} />
          ))}

          {/* Clear Cart Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">{getTotalPrice() > 50 ? "Free" : "$9.99"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">
                  ${(getTotalPrice() + (getTotalPrice() > 50 ? 0 : 9.99) + getTotalPrice() * 0.08).toFixed(2)}
                </span>
              </div>
            </div>

            {getTotalPrice() <= 50 && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}

            <Button
              className="w-full mt-6 bg-[#670D2F] hover:bg-[#670D2F]/90"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              Secure checkout with SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
