import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-[#0C0C0C] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <AlertCircle className="h-24 w-24 text-gray-400 mx-auto" />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Product Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
            </Button>
            <Button asChild className="bg-[#670D2F] hover:bg-[#670D2F]/90">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
