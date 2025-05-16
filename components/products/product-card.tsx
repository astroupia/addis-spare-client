import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Zap, Tag, ShoppingCart } from "lucide-react"
import type { Product } from "./products-grid"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get the first image or use a placeholder
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.name)}`

  // Format compatibility for display
  const compatibilityText =
    product.compatibility && product.compatibility.length > 0
      ? product.compatibility.map((c) => `${c.make} ${c.model} ${c.year}`).join(", ")
      : "Universal Fit"

  // Get key attributes for display
  const keyAttributes = product.attributes ? Object.entries(product.attributes).slice(0, 3) : []

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
      <Link href={`/products/${product._id}`} className="block">
        <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stockControlled ? (
            <div className="absolute top-2 right-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs px-2 py-1 rounded">
              In Stock
            </div>
          ) : (
            <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 text-xs px-2 py-1 rounded">
              On Backorder
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">{product.category}</div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
          </div>
          <div className="text-xs font-medium text-[#670D2F] dark:text-[#ff8fb1]">{product.brand}</div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">SKU: {product.sku}</div>

        <div className="space-y-2 mb-4">
          {/* Compatibility */}
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500 shrink-0" />
            <span className="truncate text-gray-700 dark:text-gray-300" title={compatibilityText}>
              {compatibilityText.length > 40 ? compatibilityText.substring(0, 40) + "..." : compatibilityText}
            </span>
          </div>

          {/* Key attributes */}
          {keyAttributes.map(([key, value], index) => (
            <div key={index} className="flex items-center text-sm">
              <Zap className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                {key}: {value}
              </span>
            </div>
          ))}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex items-center text-sm">
              <Tag className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500 shrink-0" />
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {product.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">+{product.tags.length - 3} more</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">per part</div>
          </div>

          <Button className="bg-[#670D2F] hover:bg-[#670D2F]/90 text-white">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
