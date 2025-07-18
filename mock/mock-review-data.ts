
import type { ProductReview, ReviewSummary } from "@/types/review"

export const mockReviews: ProductReview[] = [
  {
    id: "review_1",
    product_id: "p1",
    user_id: "user_1",
    order_id: "order_123",
    rating: 5,
    title: "Excellent brake pads - highly recommend!",
    content:
      "These brake pads exceeded my expectations. Installation was straightforward, and the stopping power is noticeably better than my previous pads. No squeaking or dust issues so far after 3 months of use. The ceramic material seems to be holding up well even with daily city driving.",
    pros: ["Great stopping power", "No brake dust", "Easy installation", "Quiet operation"],
    cons: ["Slightly more expensive than alternatives"],
    verified_purchase: true,
    helpful_votes: 24,
    total_votes: 28,
    status: "approved",
    created_at: "2023-08-15T10:30:00Z",
    updated_at: "2023-08-15T10:30:00Z",
    user: {
      id: "user_1",
      first_name: "Michael",
      last_name: "Johnson",
      avatar_url: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "review_2",
    product_id: "1",
    user_id: "user_2",
    order_id: "order_124",
    rating: 4,
    title: "Good quality, but installation was tricky",
    content:
      "The brake pads themselves are of good quality and work well. However, I had some difficulty during installation - the clips didn't fit as smoothly as expected. Once installed properly, they perform great with good stopping power and minimal noise.",
    pros: ["Good stopping power", "Quality materials", "Reasonable price"],
    cons: ["Installation clips could be better", "Instructions unclear"],
    verified_purchase: true,
    helpful_votes: 12,
    total_votes: 15,
    status: "approved",
    created_at: "2023-09-02T14:20:00Z",
    updated_at: "2023-09-02T14:20:00Z",
    user: {
      id: "user_2",
      first_name: "Sarah",
      last_name: "Williams",
      verified: false,
    },
  },
  {
    id: "review_3",
    product_id: "p2",
    user_id: "user_3",
    order_id: "order_125",
    rating: 5,
    title: "Perfect fit and great value",
    content:
      "This oil filter fits my 2018 Honda Civic perfectly. The build quality is solid, and it's much more affordable than the dealer alternative. I've been using FilterPro products for years and they never disappoint. Easy to install and does the job well.",
    pros: ["Perfect fit", "Great value", "Easy installation", "Trusted brand"],
    cons: [],
    verified_purchase: true,
    helpful_votes: 18,
    total_votes: 20,
    status: "approved",
    created_at: "2023-09-10T09:45:00Z",
    updated_at: "2023-09-10T09:45:00Z",
    user: {
      id: "user_3",
      first_name: "David",
      last_name: "Chen",
      avatar_url: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "review_4",
    product_id: "p3",
    user_id: "user_4",
    order_id: "order_126",
    rating: 5,
    title: "NGK quality as expected",
    content:
      "These iridium spark plugs are exactly what I expected from NGK. Easy installation, immediate improvement in engine smoothness, and better fuel economy. I've been using NGK plugs for over 10 years and they consistently deliver quality and performance.",
    pros: ["Improved engine performance", "Better fuel economy", "Long-lasting", "Easy installation"],
    cons: ["Price is higher than copper plugs"],
    verified_purchase: true,
    helpful_votes: 31,
    total_votes: 33,
    status: "approved",
    created_at: "2023-09-18T16:15:00Z",
    updated_at: "2023-09-18T16:15:00Z",
    user: {
      id: "user_4",
      first_name: "Robert",
      last_name: "Martinez",
      verified: true,
    },
  },
  {
    id: "review_5",
    product_id: "p1",
    user_id: "user_5",
    order_id: "order_127",
    rating: 3,
    title: "Average performance, some issues",
    content:
      "These brake pads work okay but I've noticed some squeaking after a few weeks of use. The stopping power is adequate but not exceptional. For the price, I expected better performance. They do the job but there are probably better options available.",
    pros: ["Decent stopping power", "Fair price"],
    cons: ["Squeaking after break-in", "Performance could be better", "More brake dust than expected"],
    verified_purchase: true,
    helpful_votes: 8,
    total_votes: 12,
    status: "approved",
    created_at: "2023-09-25T11:30:00Z",
    updated_at: "2023-09-25T11:30:00Z",
    user: {
      id: "user_5",
      first_name: "Jennifer",
      last_name: "Davis",
      avatar_url: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
]

export const mockReviewSummaries: ReviewSummary[] = [
  {
    product_id: "1",
    total_reviews: 3,
    average_rating: 4.0,
    rating_distribution: {
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 1,
    },
  },
  {
    product_id: "2",
    total_reviews: 1,
    average_rating: 5.0,
    rating_distribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
    },
  },
  {
    product_id: "3",
    total_reviews: 1,
    average_rating: 5.0,
    rating_distribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
    },
  },
]

export async function getProductReviews(productId: string, filters?: any): Promise<ProductReview[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let reviews = mockReviews.filter((review) => review.product_id === productId)

  if (filters?.rating) {
    reviews = reviews.filter((review) => review.rating === filters.rating)
  }

  if (filters?.verified_only) {
    reviews = reviews.filter((review) => review.verified_purchase)
  }

  if (filters?.sort_by) {
    switch (filters.sort_by) {
      case "newest":
        reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        reviews.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "highest_rating":
        reviews.sort((a, b) => b.rating - a.rating)
        break
      case "lowest_rating":
        reviews.sort((a, b) => a.rating - b.rating)
        break
      case "most_helpful":
        reviews.sort((a, b) => b.helpful_votes - a.helpful_votes)
        break
    }
  }

  return reviews
}

export async function getReviewSummary(productId: string): Promise<ReviewSummary | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockReviewSummaries.find((summary) => summary.product_id === productId) || null
}

export async function getUserReviews(userId: string): Promise<ProductReview[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockReviews.filter((review) => review.user_id === userId)
}

export async function submitReview(
  reviewData: any,
): Promise<{ success: boolean; review?: ProductReview; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate validation
  if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
    return { success: false, error: "Invalid rating" }
  }

  if (!reviewData.title || reviewData.title.length < 5) {
    return { success: false, error: "Title must be at least 5 characters" }
  }

  if (!reviewData.content || reviewData.content.length < 20) {
    return { success: false, error: "Review content must be at least 20 characters" }
  }

  const newReview: ProductReview = {
    id: `review_${Date.now()}`,
    product_id: reviewData.product_id,
    user_id: reviewData.user_id || "current_user",
    order_id: reviewData.order_id,
    rating: reviewData.rating,
    title: reviewData.title,
    content: reviewData.content,
    pros: reviewData.pros || [],
    cons: reviewData.cons || [],
    verified_purchase: true,
    helpful_votes: 0,
    total_votes: 0,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user: {
      id: "current_user",
      first_name: "Current",
      last_name: "User",
      verified: true,
    },
  }

  return { success: true, review: newReview }
}

export async function voteOnReview(
  reviewId: string,
  voteType: "helpful" | "not_helpful",
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { success: true }
}
