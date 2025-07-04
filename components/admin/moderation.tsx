"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Package,
  MessageSquare,
  Clock,
  Flag,
} from "lucide-react"
import { takeDownContent, dismissReport, getAllReportedContent as getAllReportedContentMock } from "@/mock/mock-admin-data"
import type { ReportedContent } from "@/mock/mock-admin-data"
import Image from "next/image"

export function AdminModeration() {
  const [reports, setReports] = useState<ReportedContent[]>([])
  const [filteredReports, setFilteredReports] = useState<ReportedContent[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState<ReportedContent | null>(null)
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"takedown" | "dismiss" | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const reportData = getAllReportedContentMock()
      setReports(reportData)
      setFilteredReports(reportData)
      setIsLoading(false)
    }

    loadReports()
  }, [])

  useEffect(() => {
    const filtered = reports.filter((report) => {
      const matchesSearch =
        report.target_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reporter_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || report.status === statusFilter
      const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
      const matchesType = typeFilter === "all" || report.type === typeFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesType
    })

    // Sort by priority and date
    filtered.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      const priorityDiff =
        priorityOrder[b.priority as keyof typeof priorityOrder] -
        priorityOrder[a.priority as keyof typeof priorityOrder]
      if (priorityDiff !== 0) return priorityDiff
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    setFilteredReports(filtered)
  }, [searchTerm, statusFilter, priorityFilter, typeFilter, reports])

  const handleTakeAction = async (report: ReportedContent, action: "takedown" | "dismiss") => {
    const adminId = "admin_001" // In real app, get from session
    const success =
      action === "takedown"
        ? takeDownContent(report.id, adminId, adminNotes)
        : dismissReport(report.id, adminId, adminNotes)

    if (success) {
      // Update local state
      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id
            ? {
                ...r,
                status: "resolved",
                reviewed_at: new Date().toISOString(),
                reviewed_by: adminId,
                admin_notes: adminNotes,
                action_taken: action === "takedown" ? "content_removed" : "no_action",
              }
            : r,
        ),
      )
      setActionDialogOpen(false)
      setSelectedReport(null)
      setAdminNotes("")
    }
  }
  

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "under_review":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Eye className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        )
      case "dismissed":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <XCircle className="h-3 w-3 mr-1" />
            Dismissed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "product":
        return <Package className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      case "review":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case "inappropriate_content":
        return "Inappropriate Content"
      case "spam":
        return "Spam"
      case "fraud":
        return "Fraud"
      case "harassment":
        return "Harassment"
      case "copyright":
        return "Copyright Violation"
      case "other":
        return "Other"
      default:
        return reason
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter((r) => r.status === "pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter((r) => r.status === "under_review").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter((r) => r.priority === "critical").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter((r) => r.status === "resolved").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Content Moderation
          </CardTitle>
          <CardDescription>Review and take action on reported content</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="product">Products</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(report.type)}
                        <span className="capitalize">{report.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                          <Image
                            src={report.target_image || "/placeholder.svg"}
                            alt={report.target_name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded object-cover"
                          />
                        
                        <div>
                          <p className="font-medium">{report.target_name}</p>
                          <p className="text-sm text-gray-500">ID: {report.target_id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{report.reporter_name}</p>
                        <p className="text-sm text-gray-500">{report.reporter_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getReasonLabel(report.reason)}</TableCell>
                    <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Report Details</DialogTitle>
                                <DialogDescription>
                                  Review the full report and take appropriate action
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Type</Label>
                                    <p className="capitalize">{report.type}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Priority</Label>
                                    <div className="mt-1">{getPriorityBadge(report.priority)}</div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Reason</Label>
                                    <p>{getReasonLabel(report.reason)}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <div className="mt-1">{getStatusBadge(report.status)}</div>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Description</Label>
                                  <p className="mt-1 text-sm text-gray-600">{report.description}</p>
                                </div>
                                {report.admin_notes && (
                                  <div>
                                    <Label className="text-sm font-medium">Admin Notes</Label>
                                    <p className="mt-1 text-sm text-gray-600">{report.admin_notes}</p>
                                  </div>
                                )}
                                {report.evidence_urls && report.evidence_urls.length > 0 && (
                                  <div>
                                    <Label className="text-sm font-medium">Evidence</Label>
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                      {report.evidence_urls.map((url: string, index: number) => (
                                        <Image
                                          width={32}
                                          height={32}
                                          key={index}
                                          src={url || "/placeholder.svg"}
                                          alt={`Evidence ${index + 1}`}
                                          className="w-full h-32 object-cover rounded border"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          {(report.status === "pending" || report.status === "under_review") && (
                            <>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedReport(report)
                                  setActionType("takedown")
                                  setActionDialogOpen(true)
                                }}
                                className="text-red-600"
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Take Down Content
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedReport(report)
                                  setActionType("dismiss")
                                  setActionDialogOpen(true)
                                }}
                                className="text-green-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Dismiss Report
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No reports found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === "takedown" ? "Take Down Content" : "Dismiss Report"}</DialogTitle>
            <DialogDescription>
              {actionType === "takedown"
                ? "This will remove the reported content and take appropriate action against the violator."
                : "This will mark the report as dismissed with no action taken."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="admin-notes">Admin Notes</Label>
              <Textarea
                id="admin-notes"
                placeholder="Add notes about your decision..."
                value={adminNotes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdminNotes(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedReport && handleTakeAction(selectedReport, actionType!)}
              className={actionType === "takedown" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {actionType === "takedown" ? "Take Down" : "Dismiss"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
