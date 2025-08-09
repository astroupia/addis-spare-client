import ProductDetailSkeleton from "@/components/products/product-detail-skeleton"

export default function Loading() {
  return (
    <div className="bg-white dark:bg-[#0C0C0C] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <ProductDetailSkeleton />
      </div>
    </div>
  )
}
