"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Car,
  Wrench,
  Package,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/components/products/products-grid"

interface ProductDetailContentProps {
  product: Product
}
export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})

  // Ensure we always have valid image URLs
  const images =
    product.images && product.images.length > 0
      ? product.images.map(
          (img) => img || `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`,
        )
      : [`/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} of ${product.name} to cart`)
    router.push("/cart")
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }))
  }

  const getCurrentImageSrc = () => {
    const currentImage = images[currentImageIndex]
    return imageError[currentImageIndex]
      ? `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`
      : currentImage
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/?category=${product.category.toLowerCase()}`}
          className="hover:text-gray-700 dark:hover:text-gray-200"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Image
              src={getCurrentImageSrc() || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => handleImageError(currentImageIndex)}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Stock indicator */}
            <div className="absolute top-4 right-4">
              {product.stockControlled ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  <Check className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  On Backorder
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnail navigation */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex
                      ? "border-[#670D2F] dark:border-[#ff8fb1]"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Image
                    src={imageError[index] ? `/placeholder.svg?height=80&width=80&text=${index + 1}` : image}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full p-2"
                    onError={() => handleImageError(index)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-[#670D2F] dark:text-[#ff8fb1]">
                {product.category}
              </Badge>
              <span className="text-sm font-medium text-[#670D2F] dark:text-[#ff8fb1]">{product.brand}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">4.0 (24 reviews)</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">SKU: {product.sku}</p>
          </div>

          <div className="text-4xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
            <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">per part</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <span className="text-sm text-gray-500 dark:text-gray-400">Quantity</span>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#670D2F] hover:bg-[#670D2F]/90 text-white"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                onClick={handleWishlist}
                variant="outline"
                size="lg"
                className={isWishlisted ? "text-red-600 border-red-600" : ""}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm">1 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Product Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium capitalize text-gray-700 dark:text-gray-300">
                      {key.replace("_", " ")}:
                    </span>
                    <span className="text-gray-900 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>

              {product.tags.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compatibility" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Vehicle Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.compatibility.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    This part is compatible with the following vehicles:
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {product.compatibility.map((vehicle, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <Car className="h-4 w-4 text-[#670D2F] dark:text-[#ff8fb1] flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">{vehicle.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Universal fit - Compatible with most vehicles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
