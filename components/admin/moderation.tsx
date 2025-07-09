"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  Shield,
  Eye,
  CheckCircle,
  Clock,
  Search,
  AlertCircle,
  User,
  Package,
  MessageSquare,
  Star,
} from "lucide-react"
import {
  getModerationStats,
  getAllReports,
  updateReportStatus,
  // addModerationAction,
  searchReports,
} from "@/mock/mock-moderation-data"
import type { Report, ModerationAction } from "@/types/moderation"
import Image from "next/image"

export function AdminModeration() {
  const [stats, setStats] = useState(getModerationStats())
  const [reports, setReports] = useState(getAllReports())
  const [filteredReports, setFilteredReports] = useState(getAllReports())
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<ModerationAction["action_type"]>("no_action")
  const [actionReason, setActionReason] = useState("")
  const [actionNotes, setActionNotes] = useState("")
  const [actionDuration, setActionDuration] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Filter reports based on search and filters
  useEffect(() => {
    let filtered = reports

    // Search filter
    if (searchQuery.trim()) {
      filtered = searchReports(searchQuery)
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter)
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((report) => report.content_type === typeFilter)
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((report) => report.priority === priorityFilter)
    }

    setFilteredReports(filtered)
  }, [reports, searchQuery, statusFilter, typeFilter, priorityFilter])

  const handleTakeAction = async () => {
    if (!selectedReport || !actionReason.trim()) return

    setIsLoading(true)
    try {
      // Add moderation action
      // const action = addModerationAction({
      //   report_id: selectedReport.id,
      //   admin_id: "admin_current",
      //   admin_name: "Current Admin",
      //   action_type: actionType,
      //   reason: actionReason,
      //   notes: actionNotes || undefined,
      //   duration: actionDuration ? Number.parseInt(actionDuration) : undefined,
      // })

      // Refresh data
      setStats(getModerationStats())
      setReports(getAllReports())

      setMessage(`Action taken successfully: ${actionType.replace("_", " ")}`)
      setActionDialogOpen(false)
      setSelectedReport(null)

      // Reset form
      setActionType("no_action")
      setActionReason("")
      setActionNotes("")
      setActionDuration("")

      setTimeout(() => setMessage(""), 3000)
    } catch {
      setMessage("Error taking action. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignToMe = (reportId: string) => {
    updateReportStatus(reportId, "under_review", "admin_current")
    setReports(getAllReports())
    setStats(getModerationStats())
  }

  const getPriorityColor = (priority: Report["priority"]) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "under_review":
        return "default"
      case "resolved":
        return "default"
      case "dismissed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getContentTypeIcon = (type: Report["content_type"]) => {
    switch (type) {
      case "product":
        return <Package className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "review":
        return <Star className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Content Moderation</h2>
          <p className="text-gray-500 dark:text-gray-400">Review and take action on reported content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-[#670D2F]" />
        </div>
      </div>

      {/* Message */}
      {message && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_reports}</div>
            <p className="text-xs text-muted-foreground">All time reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending_reports}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved_reports}</div>
            <p className="text-xs text-muted-foreground">Actions taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.critical_priority}</div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="product">Products</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                  <SelectItem value="review">Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
          <CardDescription>Review and take action on reported content</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getContentTypeIcon(report.content_type)}
                      <div>
                        <div className="font-medium">{report.content_title}</div>
                        <div className="text-sm text-gray-500">
                          {report.content_type} • ID: {report.content_id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.reporter_name}</div>
                      <div className="text-sm text-gray-500">{report.reporter_email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.reason.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(report.priority)}>{report.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(report.status)}>{report.status.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(report.created_at).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Report Details</DialogTitle>
                            <DialogDescription>Review the full report and take appropriate action</DialogDescription>
                          </DialogHeader>
                          {selectedReport && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-medium">Content Type</Label>
                                  <p className="text-sm">{selectedReport.content_type}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Priority</Label>
                                  <Badge variant={getPriorityColor(selectedReport.priority)}>
                                    {selectedReport.priority}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <Label className="font-medium">Content Title</Label>
                                <p className="text-sm">{selectedReport.content_title}</p>
                              </div>

                              <div>
                                <Label className="font-medium">Reason</Label>
                                <p className="text-sm">{selectedReport.reason.replace("_", " ")}</p>
                              </div>

                              <div>
                                <Label className="font-medium">Description</Label>
                                <p className="text-sm">{selectedReport.description}</p>
                              </div>

                              <div>
                                <Label className="font-medium">Reporter</Label>
                                <p className="text-sm">
                                  {selectedReport.reporter_name} ({selectedReport.reporter_email})
                                </p>
                              </div>

                              {selectedReport.evidence_urls && selectedReport.evidence_urls.length > 0 && (
                                <div>
                                  <Label className="font-medium">Evidence</Label>
                                  <div className="flex space-x-2 mt-2">
                                    {selectedReport.evidence_urls.map((url, index) => (
                                      <Image
                                        width={40}
                                        height={40}
                                        key={index}
                                        src={url || "/placeholder.svg"}
                                        alt={`Evidence ${index + 1}`}
                                        className="w-20 h-20 object-cover rounded border"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}

                              {selectedReport.status === "pending" && (
                                <div className="flex space-x-2">
                                  <Button onClick={() => handleAssignToMe(selectedReport.id)} variant="outline">
                                    Assign to Me
                                  </Button>
                                  <Button
                                    onClick={() => setActionDialogOpen(true)}
                                    className="bg-[#670D2F] hover:bg-[#670D2F]/90"
                                  >
                                    Take Action
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {report.status === "pending" && (
                        <Button variant="outline" size="sm" onClick={() => handleAssignToMe(report.id)}>
                          Assign
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Take Moderation Action</DialogTitle>
            <DialogDescription>Choose the appropriate action for this report</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="action-type">Action Type</Label>
              <Select
                value={actionType}
                onValueChange={(value: ModerationAction["action_type"]) => setActionType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_action">No Action Required</SelectItem>
                  <SelectItem value="remove_content">Remove Content</SelectItem>
                  <SelectItem value="flag_content">Flag Content</SelectItem>
                  <SelectItem value="warning">Issue Warning</SelectItem>
                  <SelectItem value="suspend_user">Suspend User</SelectItem>
                  <SelectItem value="ban_user">Ban User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {actionType === "suspend_user" && (
              <div className="space-y-2">
                <Label htmlFor="duration">Suspension Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={actionDuration}
                  onChange={(e) => setActionDuration(e.target.value)}
                  placeholder="Enter number of days"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Input
                id="reason"
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Enter reason for this action"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Optional additional notes"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleTakeAction}
              disabled={isLoading || !actionReason.trim()}
              className="bg-[#670D2F] hover:bg-[#670D2F]/90"
            >
              {isLoading ? "Taking Action..." : "Take Action"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
