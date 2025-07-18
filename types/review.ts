
export interface ProductReview {
  id: string
  product_id: string
  user_id: string
  order_id: string
  rating: number // 1-5 stars
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  verified_purchase: boolean
  helpful_votes: number
  total_votes: number
  status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
  user: {
    id: string
    first_name: string
    last_name: string
    avatar_url?: string
    verified: boolean
  }
  images?: ReviewImage[]
}

export interface ReviewImage {
  id: string
  review_id: string
  image_url: string
  caption?: string
  created_at: string
}

export interface ReviewSummary {
  product_id: string
  total_reviews: number
  average_rating: number
  rating_distribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

export interface ReviewFilters {
  rating?: number
  verified_only?: boolean
  with_images?: boolean
  sort_by?: "newest" | "oldest" | "highest_rating" | "lowest_rating" | "most_helpful"
}

export interface WriteReviewData {
  product_id: string
  order_id: string
  rating: number
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  images?: File[]
}

export interface ReviewVote {
  id: string
  review_id: string
  user_id: string
  vote_type: "helpful" | "not_helpful"
  created_at: string
}
