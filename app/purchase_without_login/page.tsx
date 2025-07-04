// app/purchase_without_login/page.tsx
"use client";

import { AddToCartButton } from "@/components/purchase_without_login/add-to-cart-button";

export default function PurchaseWithoutLoginPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C0C] text-black dark:text-white p-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold">Spare Part: Engine Oil</h1>
        <p className="text-sm">
          High-quality synthetic engine oil. Protect your car’s engine and extend its life.
        </p>

        {/* Reusable Add to Cart Button with AuthGuard logic inside */}
        <AddToCartButton />
      </div>
    </div>
  );
}
