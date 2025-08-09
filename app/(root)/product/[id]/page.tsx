import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductDetailContent from "@/components/products/product-detail-content"
import ProductDetailSkeleton from "@/components/products/product-detail-skeleton"
import { fetchProductBySlug } from "@/mock/products"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const product = await fetchProductBySlug(id)

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      }
    }

    return {
      title: `${product.name} - ${product.brand} | Auto Parts`,
      description: product.description,
      openGraph: {
        title: `${product.name} - ${product.brand}`,
        description: product.description,
        images: product.images.length > 0 ? [product.images[0]] : [],
      },
    }
  } catch (error) {
    console.error(error);
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params

  try {
    const product = await fetchProductBySlug(id)

    if (!product) {
      notFound()
    }

    return (
      <div className="bg-white dark:bg-[#0C0C0C] min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <Suspense fallback={<ProductDetailSkeleton />}>
            <ProductDetailContent product={product} />
          </Suspense>
        </div>
      </div>
    )
  } catch (error) {
    console.error(error);
    notFound()
  }
}
