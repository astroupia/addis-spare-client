import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsSkeletonGrid() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-36" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
