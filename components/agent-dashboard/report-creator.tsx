"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

// Mock data for clients and properties
const clientsData = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Fatima Zahra" },
  { id: "3", name: "Mohammed Al Fasi" },
  { id: "4", name: "Sarah Johnson" },
]

const propertiesData = {
  "1": [
    { id: "101", name: "Hivernage Villa", address: "123 Hivernage, Marrakech" },
    { id: "102", name: "Gueliz Apartment", address: "45 Avenue Mohammed V, Gueliz, Marrakech" },
    { id: "103", name: "Palm Grove Villa", address: "78 Palm Grove, Marrakech" },
  ],
  "2": [{ id: "201", name: "Modern Apartment", address: "12 Rue Ibn Sina, Marrakech" }],
  "3": [
    { id: "301", name: "Luxury Villa", address: "56 Route de Fez, Marrakech" },
    { id: "302", name: "City Center Apartment", address: "89 Rue El Mouahidine, Marrakech" },
  ],
  "4": [{ id: "401", name: "Garden Apartment", address: "34 Avenue Hassan II, Marrakech" }],
}

export function AgentReportCreator() {
  const searchParams = useSearchParams()
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedProperty, setSelectedProperty] = useState("")
  const [reportData, setReportData] = useState({
    visitDate: "",
    visitorName: "",
    visitorContact: "",
    impression: "positive",
    feedback: "",
    notes: "",
  })
  const [availableProperties, setAvailableProperties] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const clientId = searchParams.get("clientId")
    if (clientId && clientsData.some((client) => client.id === clientId)) {
      setSelectedClient(clientId)
      setAvailableProperties(propertiesData[clientId as keyof typeof propertiesData] || [])
    }
  }, [searchParams])

  const handleClientChange = (clientId: string) => {
    setSelectedClient(clientId)
    setSelectedProperty("")
    setAvailableProperties(propertiesData[clientId as keyof typeof propertiesData] || [])
  }

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperty(propertyId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReportData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImpressionChange = (value: string) => {
    setReportData((prev) => ({ ...prev, impression: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedClient || !selectedProperty || !reportData.visitDate || !reportData.feedback) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Get existing reports or initialize empty array
    const existingReports = JSON.parse(localStorage.getItem("agentReports") || "[]")

    // Get client and property details
    const client = clientsData.find((c) => c.id === selectedClient)
    const property = availableProperties.find((p) => p.id === selectedProperty)

    // Create new report
    const newReport = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      clientId: selectedClient,
      clientName: client?.name || "Unknown Client",
      propertyId: selectedProperty,
      propertyName: property?.name || "Unknown Property",
      propertyAddress: property?.address || "",
      visitDate: reportData.visitDate,
      visitorName: reportData.visitorName || "Not specified",
      visitorContact: reportData.visitorContact || "Not provided",
      impression: reportData.impression,
      feedback: reportData.feedback,
      notes: reportData.notes || "No additional notes",
      agentId: localStorage.getItem("userId") || "unknown",
      agentName: localStorage.getItem("username") || "Unknown Agent",
      status: "submitted",
    }

    // Add new report to existing reports
    existingReports.push(newReport)

    // Save updated reports to localStorage
    localStorage.setItem("agentReports", JSON.stringify(existingReports))

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Report submitted",
        description: "The property visit report has been successfully submitted.",
      })

      // Reset form
      setReportData({
        visitDate: "",
        visitorName: "",
        visitorContact: "",
        impression: "positive",
        feedback: "",
        notes: "",
      })
      setSelectedClient("")
      setSelectedProperty("")
      setAvailableProperties([])

      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Property Visit Report</CardTitle>
          <CardDescription>Submit a detailed report about a client's property visit</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={selectedClient} onValueChange={handleClientChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsData.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <Select
                  value={selectedProperty}
                  onValueChange={handlePropertyChange}
                  disabled={!selectedClient || availableProperties.length === 0}
                  required
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !selectedClient
                          ? "Select a client first"
                          : availableProperties.length === 0
                            ? "No properties available"
                            : "Select property"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProperties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="visitDate">Visit Date</Label>
                <Input
                  id="visitDate"
                  name="visitDate"
                  type="date"
                  value={reportData.visitDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitorName">Visitor Name</Label>
                <Input
                  id="visitorName"
                  name="visitorName"
                  value={reportData.visitorName}
                  onChange={handleInputChange}
                  placeholder="Name of the visitor"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitorContact">Visitor Contact</Label>
              <Input
                id="visitorContact"
                name="visitorContact"
                value={reportData.visitorContact}
                onChange={handleInputChange}
                placeholder="Email or phone number"
              />
            </div>

            <div className="space-y-2">
              <Label>Overall Impression</Label>
              <RadioGroup
                value={reportData.impression}
                onValueChange={handleImpressionChange}
                className="flex flex-wrap space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="positive" id="positive" />
                  <Label htmlFor="positive">Positive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="neutral" />
                  <Label htmlFor="neutral">Neutral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="negative" id="negative" />
                  <Label htmlFor="negative">Negative</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Visitor Feedback</Label>
              <Textarea
                id="feedback"
                name="feedback"
                value={reportData.feedback}
                onChange={handleInputChange}
                placeholder="What did the visitor think about the property?"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Agent Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={reportData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes, follow-up actions, etc."
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
