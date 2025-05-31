import { Suspense } from "react"
import ProductsGrid from "@/components/products/products-grid"
import FilterSidebar from "@/components/products/filter-sidebar"
import ProductsSkeletonGrid from "@/components/products/products-skeleton-grid"
import SearchHeader from "@/components/products/search-header"
import { fetchProducts, fetchCategories, fetchVehicleMakes, fetchVehicleModels, fetchYears } from "@/mock/products"

export default async function ProductsPage() {
  // Fetch initial products and filter options
  const initialProducts = await fetchProducts({ page: 1, limit: 12 })
  const categories = await fetchCategories()
  const makes = await fetchVehicleMakes()
  const models = await fetchVehicleModels()
  const years = await fetchYears()

  return (
    <div className="bg-white dark:bg-[#0C0C0C] min-h-screen">
      {/* Search/Filter Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-[#0C0C0C] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <SearchHeader makes={makes} models={models} years={years} />
        </div>
        
      </div>

      {/* Main content with sticky sidebar */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex pt-[180px]">
          {/* Sticky sidebar with hidden scrollbar */}
          <div className="w-64 h-[calc(100vh-180px)] sticky top-[180px]">
            <div className="h-full overflow-auto hide-scrollbar">
              <FilterSidebar categories={categories} />
            </div>
          </div>

          {/* Main content with left margin to account for sidebar */}
          <div className="ml-[16px] flex-1">
            <Suspense fallback={<ProductsSkeletonGrid />}>
              <ProductsGrid initialProducts={initialProducts} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
