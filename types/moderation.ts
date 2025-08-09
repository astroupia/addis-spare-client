export interface Report {
  id: string
  content_type: "product" | "user" | "message" | "review"
  content_id: string
  content_title: string
  content_url?: string
  reporter_id: string
  reporter_name: string
  reporter_email: string
  reason: "spam" | "harassment" | "fake_product" | "inappropriate_content" | "copyright" | "other"
  description: string
  evidence_urls?: string[]
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "under_review" | "resolved" | "dismissed"
  assigned_to?: string
  assigned_at?: string
  resolved_at?: string
  resolution_notes?: string
  created_at: string
  updated_at: string
}

export interface ModerationAction {
  id: string
  report_id: string
  admin_id: string
  admin_name: string
  action_type: "remove_content" | "suspend_user" | "ban_user" | "flag_content" | "warning" | "no_action"
  reason: string
  notes?: string
  duration?: number // for suspensions, in days
  created_at: string
}

export interface ContentModerationStats {
  total_reports: number
  pending_reports: number
  resolved_reports: number
  dismissed_reports: number
  critical_priority: number
  high_priority: number
  medium_priority: number
  low_priority: number
  reports_by_type: {
    product: number
    user: number
    message: number
    review: number
  }
  recent_actions: ModerationAction[]
}

export interface ReportedContent {
  id: string
  type: "product" | "user" | "message" | "review"
  title: string
  description?: string
  url?: string
  image_url?: string
  author_id?: string
  author_name?: string
  created_at: string
  status: "active" | "flagged" | "removed" | "suspended"
}
