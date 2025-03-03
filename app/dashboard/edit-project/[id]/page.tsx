"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BasicInfo } from "@/components/dashboard/add-project/basic-info"
import { MediaUpload } from "@/components/dashboard/add-project/media-upload"
import { PropertyDetails } from "@/components/dashboard/add-project/property-details"
import { PropertyFeatures } from "@/components/dashboard/add-project/property-features"
import { PropertyLocation } from "@/components/dashboard/add-project/property-location"
import { Progress } from "@/components/ui/progress"
import { featuredProjects } from "@/lib/constants"
import { Loader2 } from "lucide-react"

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Media" },
  { id: 3, name: "Details" },
  { id: 4, name: "Features" },
  { id: 5, name: "Location" },
]

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    priceType: "sale",
    price: "",
    images: [] as File[],
    videoUrl: "",
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
    features: [] as string[],
    address: "",
    city: "",
    area: "",
    zipCode: "",
    latitude: "",
    longitude: "",
  })

  const router = useRouter()

  // Fetch project data
  useEffect(() => {
    // In a real app, this would be an API call
    const project = featuredProjects.find((p) => p.id === Number.parseInt(params.id))
    if (project) {
      setFormData((prevData) => ({
        ...prevData,
        title: project.name,
        description: "Sample description", // You would get this from your API
        price: project.price,
        address: project.location,
        // ... populate other fields
      }))
    }
    setIsLoading(false)
  }, [params.id])

  const handleNext = () => {
    if (currentStep === 2 && formData.images.length === 0) {
      alert("Please upload at least one image")
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    // Here you would update the project via API
    console.log("Project updated:", formData)
    router.push("/dashboard")
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="font-typold text-3xl font-semibold">Edit Project</h1>
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
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
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

