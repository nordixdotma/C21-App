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

interface Client {
  id: string
  name: string
}

interface Property {
  id: string
  name: string
  address: string
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
  const [availableProperties, setAvailableProperties] = useState<Property[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const response = await fetch("/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch clients")
        }

        const data = await response.json()
        setClients(data)

        // Check if clientId is in URL params
        const clientId = searchParams.get("clientId")
        if (clientId && data.some((client) => client.id === clientId)) {
          setSelectedClient(clientId)
          fetchClientProperties(clientId)
        }
      } catch (error) {
        console.error("Error fetching clients:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClients()
  }, [searchParams])

  const fetchClientProperties = async (clientId: string) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await fetch(`/api/projects/client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch properties")
      }

      const data = await response.json()

      const formattedProperties = data.map((property) => ({
        id: property.id,
        name: property.name,
        address: property.address ? `${property.address}, ${property.city || ""}` : property.location,
      }))

      setAvailableProperties(formattedProperties)
    } catch (error) {
      console.error("Error fetching properties:", error)
    }
  }

  const handleClientChange = (clientId: string) => {
    setSelectedClient(clientId)
    setSelectedProperty("")
    fetchClientProperties(clientId)
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Authentication error",
          description: "Please log in again.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: selectedProperty,
          clientId: selectedClient,
          visitDate: reportData.visitDate,
          visitorName: reportData.visitorName,
          visitorContact: reportData.visitorContact,
          impression: reportData.impression,
          feedback: reportData.feedback,
          notes: reportData.notes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit report")
      }

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
    } catch (error) {
      console.error("Error submitting report:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
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
                    {clients.map((client) => (
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
