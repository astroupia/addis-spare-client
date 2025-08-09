"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { SavedItem } from "@/types/auth";
import Image from "next/image";

interface SavedItemsProps {
  savedItems: SavedItem[];
  formatDate: (date: string) => string;
}

export default function SavedItems({ savedItems, formatDate }: SavedItemsProps) {
  const [hasMounted, setHasMounted] = useState(false);

  // Ensure rendering only happens after client hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <Image
                width={200}
                height={128}
                src={item.product_image || "/placeholder.svg"}
                alt={item.product_name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h3 className="font-medium mb-2">{item.product_name}</h3>
              <p className="text-lg font-bold text-[#670D2F] mb-2">
                ${item.product_price.toFixed(2)}
              </p>
              {item.notes && <p className="text-sm text-gray-500 mb-3">{item.notes}</p>}
              <p className="text-xs text-gray-400">
                Saved {formatDate(item.saved_at)}
              </p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" className="flex-1 bg-[#670D2F] hover:bg-[#3A0519]">
                  Add to Cart
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
