// components/add-to-cart-button.tsx
"use client";

import { AuthGuard } from "@/components/purchase_without_login/auth-guard";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const AddToCartButton = () => {
  return (
    <AuthGuard>
      {(handleClick) => (
        <Button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#670D2F] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#3A0519] focus:outline-none focus:ring-2 focus:ring-[#670D2F]/50"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart.
        </Button>
      )}
    </AuthGuard>
  );
};




