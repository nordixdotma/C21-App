"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Printer } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { jsPDF } from "jspdf"

// Mock data for properties and clients
const properties = [
  {
    id: 1,
    name: "Luxury Villa in Palmeraie",
    price: "4,500,000 MAD",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    location: "Palmeraie, Marrakech",
  },
  {
    id: 2,
    name: "Modern Apartment in Gueliz",
    price: "1,800,000 MAD",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    location: "Gueliz, Marrakech",
  },
  {
    id: 3,
    name: "Traditional Riad in Medina",
    price: "3,200,000 MAD",
    type: "Riad",
    bedrooms: 4,
    bathrooms: 5,
    area: 280,
    location: "Medina, Marrakech",
  },
  {
    id: 4,
    name: "Penthouse in Hivernage",
    price: "5,100,000 MAD",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    location: "Hivernage, Marrakech",
  },
]

const clients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    nationality: "British",
    phone: "+44 7700 900123",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    nationality: "American",
    phone: "+1 202-555-0156",
  },
  {
    id: 3,
    name: "Mohammed Al Fasi",
    email: "mohammed.alfasi@example.com",
    nationality: "Moroccan",
    phone: "+212 661-234567",
  },
  {
    id: 4,
    name: "Fatima Zahra",
    email: "fatima.zahra@example.com",
    nationality: "French",
    phone: "+33 6 12 34 56 78",
  },
]

const contractTemplates = [
  { id: 1, name: "Standard Sale Contract", type: "sale" },
  { id: 2, name: "Premium Sale Contract", type: "sale" },
  { id: 3, name: "Standard Rental Agreement", type: "rental" },
  { id: 4, name: "Commercial Lease Agreement", type: "rental" },
]

export function ContractGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedProperty, setSelectedProperty] = useState("")
  const [selectedClient, setSelectedClient] = useState("")
  const [contractDate, setContractDate] = useState("")
  const [additionalTerms, setAdditionalTerms] = useState("")
  const [contractType, setContractType] = useState("sale")
  const [activeTab, setActiveTab] = useState("generate")
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfFileName, setPdfFileName] = useState<string | null>(null)

  const handleGenerateContract = () => {
    if (!selectedTemplate || !selectedProperty || !selectedClient || !contractDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to generate a contract.",
        variant: "destructive",
      })
      return
    }

    try {
      // Create a new PDF document - using A4 format
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Get the template, property and client
      const template = contractTemplates.find((t) => t.id === Number.parseInt(selectedTemplate))
      const property = properties.find((p) => p.id === Number.parseInt(selectedProperty))
      const client = clients.find((c) => c.id === Number.parseInt(selectedClient))

      // Helper function to add styled text
      const addText = (text: string, x: number, y: number, fontSize = 10, style = "normal", align = "left") => {
        doc.setFontSize(fontSize)
        doc.setFont("helvetica", style)
        doc.text(text, x, y, { align: align as "left" | "center" | "right" | "justify" })
        return doc
      }

      // Space for logo (to be added later)
      // Top section with contract title and reference
      addText(`${template?.name}`, 105, 20, 16, "bold", "center")
      addText(
        `REF: C21-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        105,
        28,
        10,
        "normal",
        "center",
      )
      addText(`Date: ${contractDate}`, 195, 20, 10, "normal", "right")

      // Add horizontal line
      doc.setDrawColor(0)
      doc.setLineWidth(0.5)
      doc.line(15, 35, 195, 35)

      // Compact property and parties section
      doc.setDrawColor(200, 200, 200)
      doc.setFillColor(248, 248, 248)
      doc.rect(15, 40, 180, 50, "FD")

      // Left side - Property details
      addText("PROPERTY", 55, 47, 11, "bold", "center")
      addText(`${property?.name}`, 55, 54, 10, "normal", "center")
      addText(`Type: ${property?.type} | Area: ${property?.area} m²`, 55, 61, 9, "normal", "center")
      addText(`Location: ${property?.location}`, 55, 68, 9, "normal", "center")
      addText(`Price: ${property?.price}`, 55, 75, 10, "bold", "center")

      // Right side - Parties
      addText("PARTIES", 155, 47, 11, "bold", "center")
      addText("SELLER: Century 21 Marrakech", 155, 54, 9, "normal", "center")
      addText("114 Avenue Mohammed V, Marrakech", 155, 61, 9, "normal", "center")
      addText(`BUYER: ${client?.name}`, 155, 68, 9, "normal", "center")
      addText(`Tel: ${client?.phone} | ${client?.nationality}`, 155, 75, 9, "normal", "center")

      // Contract terms - Compact version
      addText("TERMS AND CONDITIONS", 105, 100, 12, "bold", "center")

      let yPosition = 110
      const lineHeight = 6

      // Compact terms
      const compactTerms = [
        "1. The SELLER agrees to sell and the BUYER agrees to purchase the above property for the stated price.",
        `2. A deposit of ${Math.round(Number.parseInt(property?.price.replace(/[^0-9]/g, "")) * 0.1).toLocaleString()} MAD (10%) shall be paid upon signing.`,
        "3. The remaining balance shall be paid at the final deed transfer, within 60 days from this date.",
        "4. The property is sold in its current condition, which the BUYER acknowledges having inspected.",
        "5. The SELLER guarantees clear title to the property, free from encumbrances or claims.",
        "6. Registration taxes and notary fees shall be borne by the BUYER.",
        "7. Property taxes up to the date of transfer shall be paid by the SELLER.",
      ]

      compactTerms.forEach((term) => {
        const lines = doc.splitTextToSize(term, 175)
        lines.forEach((line) => {
          addText(line, 15, yPosition, 9)
          yPosition += lineHeight
        })
      })

      // Additional terms (if any)
      if (additionalTerms) {
        yPosition += lineHeight
        addText("ADDITIONAL TERMS:", 15, yPosition, 10, "bold")
        yPosition += lineHeight

        const additionalLines = doc.splitTextToSize(additionalTerms, 175)
        additionalLines.forEach((line) => {
          if (yPosition < 270) {
            // Ensure we don't go off the page
            addText(line, 15, yPosition, 9)
            yPosition += lineHeight
          }
        })
      }

      // Signature section - Compact
      yPosition = Math.min(yPosition + 10, 240) // Cap the position to ensure signatures fit

      addText("SIGNATURES", 105, yPosition, 11, "bold", "center")
      yPosition += 5

      // Signature lines
      doc.line(25, yPosition + 20, 85, yPosition + 20)
      doc.line(125, yPosition + 20, 185, yPosition + 20)

      addText("CENTURY 21 MARRAKECH", 55, yPosition + 10, 9, "normal", "center")
      addText("BUYER", 155, yPosition + 10, 9, "normal", "center")

      addText("Date: " + contractDate, 105, yPosition + 35, 9, "normal", "center")

      // Footer
      addText("CENTURY 21 MARRAKECH - OFFICIAL CONTRACT", 105, 285, 8, "normal", "center")

      // Generate PDF blob and create URL
      const pdfBlob = doc.output("blob")
      const url = URL.createObjectURL(pdfBlob)
      setPdfUrl(url)

      // Set filename
      const filename = `${template?.name}-${client?.name.replace(/\s+/g, "-")}-${contractDate}.pdf`
      setPdfFileName(filename)

      // Switch to preview tab
      setActiveTab("preview")

      toast({
        title: "Contract generated",
        description: "Your contract has been successfully generated.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownloadPDF = () => {
    if (pdfUrl && pdfFileName) {
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = pdfFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download started",
        description: "Your contract PDF is being downloaded.",
      })
    }
  }

  const handlePrintContract = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, "_blank")
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print()
        }
      } else {
        toast({
          title: "Error",
          description: "Could not open print window. Please check your popup blocker settings.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-typold text-2xl font-semibold">Contract Generator</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate Contract</TabsTrigger>
          <TabsTrigger value="preview" disabled={!pdfUrl}>
            Preview Contract
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
              <CardDescription>Fill in the details to generate a contract</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contract-type">Contract Type</Label>
                <Select value={contractType} onValueChange={setContractType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Sale Contract</SelectItem>
                    <SelectItem value="rental">Rental Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Contract Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTemplates
                      .filter((template) => template.type === contractType)
                      .map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id.toString()}>
                        {property.name} - {property.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Contract Date</Label>
                <Input id="date" type="date" value={contractDate} onChange={(e) => setContractDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Additional Terms</Label>
                <Textarea
                  id="terms"
                  placeholder="Enter any additional terms or conditions..."
                  value={additionalTerms}
                  onChange={(e) => setAdditionalTerms(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateContract} className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Contract
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          {pdfUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Contract Preview</CardTitle>
                <CardDescription>Review your generated contract</CardDescription>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrintContract}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] w-full border">
                  <iframe src={pdfUrl} className="h-full w-full" title="Contract PDF Preview" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
