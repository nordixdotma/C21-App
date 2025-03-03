"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BasicInfo } from "@/components/dashboard/add-project/basic-info"
import { MediaUpload } from "@/components/dashboard/add-project/media-upload"
import { PropertyDetails } from "@/components/dashboard/add-project/property-details"
import { PropertyFeatures } from "@/components/dashboard/add-project/property-features"
import { PropertyLocation } from "@/components/dashboard/add-project/property-location"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Media" },
  { id: 3, name: "Details" },
  { id: 4, name: "Features" },
  { id: 5, name: "Location" },
]

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

    // Media
    images: [] as File[],
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
    console.log("Form submitted:", formData)
    router.push("/dashboard")
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {" "}
      {/* Changed background class */}
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
          {" "}
          {/* Changed form container class */}
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

