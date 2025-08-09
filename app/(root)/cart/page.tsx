import { Suspense } from "react"
import CartContent from "@/components/cart/cart-content"
import CartSkeleton from "@/components/cart/cart-skeleton"

export default function CartPage() {
  return (
    <div className="bg-white dark:bg-[#0C0C0C] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <Suspense fallback={<CartSkeleton />}>
          <CartContent />
        </Suspense>
      </div>
    </div>
  )
}
