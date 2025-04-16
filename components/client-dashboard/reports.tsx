"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Search, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Report {
  id: string
  date: string
  clientId: string
  clientName: string
  propertyId: string
  propertyName: string
  propertyAddress: string
  visitDate: string
  visitorName: string
  visitorContact: string
  impression: string
  feedback: string
  notes: string
  agentId: string
  agentName: string
  status: string
}

export function ClientReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterImpression, setFilterImpression] = useState("")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [clientId, setClientId] = useState("")

  useEffect(() => {
    // Get client ID from localStorage
    const userId = localStorage.getItem("userId")
    setClientId(userId || "")

    // Load reports from localStorage
    const storedReports = JSON.parse(localStorage.getItem("agentReports") || "[]") as Report[]

    // Filter reports for current client
    const clientReports = storedReports.filter((report) => report.clientId === userId)

    setReports(clientReports)
    setFilteredReports(clientReports)
  }, [])

  useEffect(() => {
    let result = reports

    // Apply impression filter
    if (filterImpression) {
      result = result.filter((report) => report.impression === filterImpression)
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (report) =>
          report.propertyName.toLowerCase().includes(term) ||
          report.propertyAddress.toLowerCase().includes(term) ||
          report.agentName.toLowerCase().includes(term) ||
          report.feedback.toLowerCase().includes(term),
      )
    }

    setFilteredReports(result)
  }, [reports, searchTerm, filterImpression])

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setIsDialogOpen(true)
  }

  const getImpressionBadge = (impression: string) => {
    switch (impression) {
      case "positive":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> Positive
          </Badge>
        )
      case "negative":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <AlertCircle className="mr-1 h-3 w-3" /> Negative
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            <HelpCircle className="mr-1 h-3 w-3" /> Neutral
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-typold text-xl md:text-2xl font-semibold mb-4 md:mb-6">Property Reports</h2>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search reports..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <Select value={filterImpression} onValueChange={setFilterImpression}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by impression" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Impressions</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="mb-2 h-12 w-12 text-gray-400">📋</div>
            <p className="text-center text-gray-500">
              {reports.length === 0
                ? "No property visit reports available yet."
                : "No reports match your search criteria."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredReports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{report.propertyName}</CardTitle>
                  {getImpressionBadge(report.impression)}
                </div>
                <CardDescription>{report.propertyAddress}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Agent:</span>
                    <span className="font-medium">{report.agentName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Visit Date:</span>
                    <span className="font-medium">{format(new Date(report.visitDate), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Visitor:</span>
                    <span className="font-medium">{report.visitorName}</span>
                  </div>
                  <div className="mt-2">
                    <p className="line-clamp-2 text-sm text-gray-600">{report.feedback}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Submitted: {format(new Date(report.date), "MMM d, yyyy")}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleViewReport(report)}>
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedReport && (
          <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Property Visit Report</DialogTitle>
              <DialogDescription>
                Submitted on {format(new Date(selectedReport.date), "MMMM d, yyyy")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4 py-3 md:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{selectedReport.propertyName}</h3>
                {getImpressionBadge(selectedReport.impression)}
              </div>

              <div className="rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 font-medium">Property Details</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address:</span>
                    <span>{selectedReport.propertyAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Agent:</span>
                    <span>{selectedReport.agentName}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 font-medium">Visit Information</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Visit Date:</span>
                    <span>{format(new Date(selectedReport.visitDate), "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Visitor Name:</span>
                    <span>{selectedReport.visitorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact:</span>
                    <span>{selectedReport.visitorContact}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Visitor Feedback</h4>
                <p className="whitespace-pre-wrap rounded-md border p-3 text-sm">{selectedReport.feedback}</p>
              </div>

              {selectedReport.notes && (
                <div>
                  <h4 className="mb-2 font-medium">Agent Notes</h4>
                  <p className="whitespace-pre-wrap rounded-md border p-3 text-sm">{selectedReport.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
