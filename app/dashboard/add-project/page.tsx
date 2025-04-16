"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BasicInfo } from "@/components/dashboard/add-project/basic-info"
import { MediaUpload } from "@/components/dashboard/add-project/media-upload"
import { PropertyDetails } from "@/components/dashboard/add-project/property-details"
import { PropertyFeatures } from "@/components/dashboard/add-project/property-features"
import { PropertyLocation } from "@/components/dashboard/add-project/property-location"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Media" },
  { id: 3, name: "Details" },
  { id: 4, name: "Features" },
  { id: 5, name: "Location" },
]

export default function AddProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    description: "",
    type: "",
    status: "",
    priceType: "sale",
    price: "",
    ownerId: "", // Added owner ID field
    assignedAgents: [] as string[], // Added assigned agents field

    // Media
    images: [] as File[],
    imageUrls: [] as string[], // To store data URLs for images
    videoUrl: "",

    // Details
    bedrooms: "",
    rooms: "",
    bathrooms: "",
    areaSize: "",
    sizePostfix: "sqft",
    landArea: "",
    landAreaPostfix: "sqft",
    garages: "",
    garageSize: "",
    yearBuilt: "",

    // Features
    features: [] as string[],

    // Location
    address: "",
    city: "",
    area: "",
    state: "",
    country: "Morocco",
    zipCode: "",
    latitude: "",
    longitude: "",
  })

  const router = useRouter()

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.title || !formData.price) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep === 2 && formData.imageUrls.length === 0) {
      toast({
        title: "Missing images",
        description: "Please upload at least one image",
        variant: "destructive",
      })
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.price) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Convert property type and status to match database enum values
      const propertyTypeMap: Record<string, string> = {
        apartment: "Apartment",
        house: "House",
        villa: "Villa",
        commercial: "Commercial",
        land: "Land",
        office: "Commercial",
        industrial: "Commercial",
      }

      const statusMap: Record<string, string> = {
        available: "For Sale",
        sold: "Sold",
        rented: "Rented",
      }

      // Prepare data for API
      const projectData = {
        ...formData,
        type: propertyTypeMap[formData.type] || "Apartment",
        status: formData.priceType === "rent" ? "For Rent" : statusMap[formData.status] || "For Sale",
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create project")
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: "Property added successfully.",
      })

      // Redirect to the projects list
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: error.message || "There was an error saving the property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="font-typold text-3xl font-semibold text-white">Add New Project</h1>
          <div className="mt-8">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-sm font-medium ${currentStep >= step.id ? "text-primary" : "text-gray-500"}`}
                >
                  {step.name}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2 bg-gray-800" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-lg">
          {currentStep === 1 && <BasicInfo data={formData} updateData={updateFormData} onNext={handleNext} />}
          {currentStep === 2 && (
            <MediaUpload data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <PropertyDetails data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 4 && (
            <PropertyFeatures data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 5 && (
            <PropertyLocation
              data={formData}
              updateData={updateFormData}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  )
}
