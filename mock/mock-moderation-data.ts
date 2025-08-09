import type { Report, ModerationAction, ContentModerationStats, ReportedContent } from "@/types/moderation"

// Mock Reports
export const mock_reports: Report[] = [
  {
    id: "report_001",
    content_type: "product",
    content_id: "product_123",
    content_title: "Fake Brake Pads - Premium Quality",
    content_url: "/product/product_123",
    reporter_id: "user_456",
    reporter_name: "John Doe",
    reporter_email: "john.doe@example.com",
    reason: "fake_product",
    description:
      "This product is advertised as premium brake pads but the images show clearly counterfeit parts. The seller is using stolen product photos from legitimate manufacturers.",
    evidence_urls: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
    priority: "critical",
    status: "pending",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "report_002",
    content_type: "user",
    content_id: "user_789",
    content_title: "Suspicious Seller Account",
    reporter_id: "user_321",
    reporter_name: "Jane Smith",
    reporter_email: "jane.smith@example.com",
    reason: "spam",
    description:
      "This user has been sending spam messages to multiple buyers, offering deals outside the platform and requesting direct payments.",
    priority: "high",
    status: "under_review",
    assigned_to: "admin_001",
    assigned_at: "2024-01-15T11:00:00Z",
    created_at: "2024-01-14T16:45:00Z",
    updated_at: "2024-01-15T11:00:00Z",
  },
  {
    id: "report_003",
    content_type: "message",
    content_id: "message_456",
    content_title: "Inappropriate Message Content",
    reporter_id: "user_654",
    reporter_name: "Mike Wilson",
    reporter_email: "mike.wilson@example.com",
    reason: "harassment",
    description: "Received threatening and abusive messages from this user after declining their lowball offer.",
    priority: "high",
    status: "resolved",
    assigned_to: "admin_002",
    assigned_at: "2024-01-13T14:20:00Z",
    resolved_at: "2024-01-14T09:15:00Z",
    resolution_notes: "User has been suspended for 7 days and warned about platform conduct policies.",
    created_at: "2024-01-13T12:30:00Z",
    updated_at: "2024-01-14T09:15:00Z",
  },
  {
    id: "report_004",
    content_type: "review",
    content_id: "review_789",
    content_title: "Fake Review for Oil Filter",
    reporter_id: "user_987",
    reporter_name: "Sarah Johnson",
    reporter_email: "sarah.johnson@example.com",
    reason: "spam",
    description:
      "This review is clearly fake - generic text, posted immediately after account creation, and doesn't match the product specifications.",
    priority: "medium",
    status: "pending",
    created_at: "2024-01-15T08:15:00Z",
    updated_at: "2024-01-15T08:15:00Z",
  },
  {
    id: "report_005",
    content_type: "product",
    content_id: "product_456",
    content_title: "Overpriced Spark Plugs",
    reporter_id: "user_111",
    reporter_name: "David Brown",
    reporter_email: "david.brown@example.com",
    reason: "other",
    description: "Product is significantly overpriced compared to market rates. Possible price manipulation.",
    priority: "low",
    status: "dismissed",
    assigned_to: "admin_001",
    assigned_at: "2024-01-12T10:00:00Z",
    resolved_at: "2024-01-12T15:30:00Z",
    resolution_notes: "Pricing is within acceptable market range. No policy violation found.",
    created_at: "2024-01-12T09:45:00Z",
    updated_at: "2024-01-12T15:30:00Z",
  },
  {
    id: "report_006",
    content_type: "user",
    content_id: "user_222",
    content_title: "Seller Not Responding",
    reporter_id: "user_333",
    reporter_name: "Lisa Anderson",
    reporter_email: "lisa.anderson@example.com",
    reason: "other",
    description:
      "Seller has not responded to messages for over a week after payment was made. Order status shows as processing but no updates.",
    priority: "medium",
    status: "under_review",
    assigned_to: "admin_003",
    assigned_at: "2024-01-14T13:45:00Z",
    created_at: "2024-01-14T11:20:00Z",
    updated_at: "2024-01-14T13:45:00Z",
  },
]

// Mock Moderation Actions
export const mock_moderation_actions: ModerationAction[] = [
  {
    id: "action_001",
    report_id: "report_003",
    admin_id: "admin_002",
    admin_name: "Admin Sarah",
    action_type: "suspend_user",
    reason: "Harassment and threatening behavior",
    notes:
      "User violated community guidelines by sending threatening messages. Suspended for 7 days with final warning.",
    duration: 7,
    created_at: "2024-01-14T09:15:00Z",
  },
  {
    id: "action_002",
    report_id: "report_005",
    admin_id: "admin_001",
    admin_name: "Admin John",
    action_type: "no_action",
    reason: "No policy violation found",
    notes: "Product pricing is within acceptable market range. Reporter may have been comparing with wholesale prices.",
    created_at: "2024-01-12T15:30:00Z",
  },
  {
    id: "action_003",
    report_id: "report_007",
    admin_id: "admin_002",
    admin_name: "Admin Sarah",
    action_type: "remove_content",
    reason: "Copyright infringement",
    notes: "Product listing contained copyrighted images without permission. Content removed and seller notified.",
    created_at: "2024-01-11T14:20:00Z",
  },
  {
    id: "action_004",
    report_id: "report_008",
    admin_id: "admin_003",
    admin_name: "Admin Mike",
    action_type: "flag_content",
    reason: "Misleading product description",
    notes:
      "Product description contains exaggerated claims. Content flagged for review and seller contacted for corrections.",
    created_at: "2024-01-10T16:45:00Z",
  },
]

// Mock Content Moderation Stats
export const mock_moderation_stats: ContentModerationStats = {
  total_reports: 47,
  pending_reports: 12,
  resolved_reports: 28,
  dismissed_reports: 7,
  critical_priority: 3,
  high_priority: 8,
  medium_priority: 15,
  low_priority: 21,
  reports_by_type: {
    product: 18,
    user: 12,
    message: 9,
    review: 8,
  },
  recent_actions: mock_moderation_actions.slice(0, 5),
}

// Mock Reported Content
export const mock_reported_content: ReportedContent[] = [
  {
    id: "product_123",
    type: "product",
    title: "Fake Brake Pads - Premium Quality",
    description: "High-performance ceramic brake pads for superior stopping power",
    url: "/product/product_123",
    image_url: "/placeholder.svg?height=200&width=200",
    author_id: "seller_001",
    author_name: "AutoParts Direct",
    created_at: "2024-01-10T12:00:00Z",
    status: "flagged",
  },
  {
    id: "user_789",
    type: "user",
    title: "Suspicious Seller Account",
    description: "User profile with multiple policy violations",
    author_name: "SpamSeller123",
    created_at: "2024-01-05T08:30:00Z",
    status: "suspended",
  },
  {
    id: "message_456",
    type: "message",
    title: "Inappropriate Message Content",
    description: "Threatening message sent to buyer",
    author_id: "user_bad",
    author_name: "BadUser",
    created_at: "2024-01-13T12:15:00Z",
    status: "removed",
  },
  {
    id: "review_789",
    type: "review",
    title: "Fake Review for Oil Filter",
    description: "Generic positive review with suspicious timing",
    author_id: "user_fake",
    author_name: "FakeReviewer",
    created_at: "2024-01-15T07:45:00Z",
    status: "active",
  },
]

// Helper functions
export function getModerationStats(): ContentModerationStats {
  return mock_moderation_stats
}

export function getAllReports(): Report[] {
  return mock_reports
}

export function getReportsByStatus(status: Report["status"]): Report[] {
  return mock_reports.filter((report) => report.status === status)
}

export function getReportsByPriority(priority: Report["priority"]): Report[] {
  return mock_reports.filter((report) => report.priority === priority)
}

export function getReportsByType(type: Report["content_type"]): Report[] {
  return mock_reports.filter((report) => report.content_type === type)
}

export function getReportById(id: string): Report | undefined {
  return mock_reports.find((report) => report.id === id)
}

export function getModerationActions(): ModerationAction[] {
  return mock_moderation_actions
}

export function getReportedContent(): ReportedContent[] {
  return mock_reported_content
}

export function updateReportStatus(reportId: string, status: Report["status"], adminId?: string): boolean {
  const reportIndex = mock_reports.findIndex((report) => report.id === reportId)
  if (reportIndex !== -1) {
    mock_reports[reportIndex].status = status
    mock_reports[reportIndex].updated_at = new Date().toISOString()

    if (status === "under_review" && adminId) {
      mock_reports[reportIndex].assigned_to = adminId
      mock_reports[reportIndex].assigned_at = new Date().toISOString()
    }

    if (status === "resolved" || status === "dismissed") {
      mock_reports[reportIndex].resolved_at = new Date().toISOString()
    }

    return true
  }
  return false
}

export function addModerationAction(action: Omit<ModerationAction, "id" | "created_at">): ModerationAction {
  const newAction: ModerationAction = {
    ...action,
    id: `action_${Date.now()}`,
    created_at: new Date().toISOString(),
  }

  mock_moderation_actions.unshift(newAction)

  // Update report status to resolved
  updateReportStatus(action.report_id, "resolved")

  return newAction
}

export function searchReports(query: string): Report[] {
  const lowercaseQuery = query.toLowerCase()
  return mock_reports.filter(
    (report) =>
      report.content_title.toLowerCase().includes(lowercaseQuery) ||
      report.description.toLowerCase().includes(lowercaseQuery) ||
      report.reporter_name.toLowerCase().includes(lowercaseQuery) ||
      report.reason.toLowerCase().includes(lowercaseQuery),
  )
}
