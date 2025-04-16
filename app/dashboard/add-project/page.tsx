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

// Add this function to generate a unique project ID
const generateProjectId = () => {
  // Get current date components
  const now = new Date()
  const year = now.getFullYear().toString().slice(-2) // Last 2 digits of year
  const month = (now.getMonth() + 1).toString().padStart(2, "0")

  // Get random alphanumeric string
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()

  // Combine to create a project ID like "23-05-X7F2"
  return `${year}-${month}-${randomPart}`
}

export default function AddProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
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
    projectId: "",

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
    propertyId: "",
    yearBuilt: "",

    // Features
    features: [] as string[],

    // Location
    address: "",
    city: "",
    area: "",
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

  const handleSubmit = () => {
    if (!formData.title || !formData.price) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Generate a unique ID
    const projectId = Date.now().toString()

    const newProject = {
      ...formData,
      id: Date.now().toString(),
      projectId: generateProjectId(), // Add auto-generated project ID
      createdAt: new Date().toISOString(),
      // ... rest of the code
    }

    // Create the project object
    const project = {
      id: projectId,
      projectId: formData.projectId || projectId, // Use the user-provided project ID or generate one
      name: formData.title,
      title: formData.title,
      description: formData.description,
      location: `${formData.address || ""}, ${formData.city || ""}`.trim(),
      price: `${formData.price} MAD`,
      priceValue: formData.price,
      priceType: formData.priceType || "sale",
      type: formData.type || "apartment",
      status: formData.status || "available",
      bedrooms: formData.bedrooms || "1",
      bathrooms: formData.bathrooms || "1",
      area: formData.areaSize || "100",
      areaSize: formData.areaSize || "100",
      sizePostfix: formData.sizePostfix || "sqft",
      features: formData.features || [],
      images: formData.imageUrls.length > 0 ? formData.imageUrls : ["/placeholder.svg?height=600&width=800"],
      image: formData.imageUrls.length > 0 ? formData.imageUrls[0] : "/placeholder.svg?height=600&width=800",
      date: new Date().toISOString(),
      ownerId: formData.ownerId,
      assignedAgents: formData.assignedAgents || [],
      address: formData.address || "",
      city: formData.city || "",
      zipCode: formData.zipCode || "",
      latitude: formData.latitude || "",
      longitude: formData.longitude || "",
      // Add other fields as needed
    }

    // Save to localStorage
    try {
      const savedProjects = localStorage.getItem("projects")
      const projects = savedProjects ? JSON.parse(savedProjects) : []

      // Add the new project
      projects.push(project)

      localStorage.setItem("projects", JSON.stringify(projects))

      toast({
        title: "Success",
        description: "Property added successfully.",
      })

      // Redirect to the projects list
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: "There was an error saving the property. Please try again.",
        variant: "destructive",
      })
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
            <PropertyLocation data={formData} updateData={updateFormData} onSubmit={handleSubmit} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  )
}
