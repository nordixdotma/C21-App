"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BasicInfo } from "@/components/dashboard/add-project/basic-info"
import { MediaUpload } from "@/components/dashboard/add-project/media-upload"
import { PropertyDetails } from "@/components/dashboard/add-project/property-details"
import { PropertyFeatures } from "@/components/dashboard/add-project/property-features"
import { PropertyLocation } from "@/components/dashboard/add-project/property-location"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    priceType: "sale",
    price: "",
    ownerId: "",
    assignedAgents: [] as string[],
    images: [] as File[],
    imageUrls: [] as string[],
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
    yearBuilt: "",
    features: [] as string[],
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

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/projects/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }

        const project = await response.json()

        // Map database fields to form fields
        setFormData({
          title: project.title || "",
          description: project.description || "",
          price: project.price?.toString() || "",
          priceType: project.status === "For Rent" ? "rent" : "sale",
          type: project.property_type?.toLowerCase() || "apartment",
          status:
            project.status === "For Sale"
              ? "available"
              : project.status === "For Rent"
                ? "available"
                : project.status?.toLowerCase() || "available",
          ownerId: project.owner_id?.toString() || "",
          assignedAgents: project.assignedAgents?.map((id: number) => id.toString()) || [],
          images: [],
          imageUrls: project.images || [],
          videoUrl: project.youtube_url || "",
          bedrooms: project.bedrooms?.toString() || "",
          rooms: project.rooms?.toString() || "",
          bathrooms: project.bathrooms?.toString() || "",
          areaSize: project.area?.toString() || "",
          sizePostfix: project.area_unit || "sqft",
          landArea: "",
          landAreaPostfix: "sqft",
          garages: "",
          garageSize: "",
          yearBuilt: project.year_built?.toString() || "",
          features: project.features || [],
          address: project.address || "",
          city: project.city || "",
          area: project.neighborhood || "",
          state: project.state || "",
          country: project.country || "Morocco",
          zipCode: project.zip_code || "",
          latitude: project.latitude?.toString() || "",
          longitude: project.longitude?.toString() || "",
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching project:", error)
        toast({
          title: "Error",
          description: "Failed to load project. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    }

    fetchProject()
  }, [params.id, router])

  const handleNext = () => {
    // Basic validation for step 1
    if (currentStep === 1) {
      if (!formData.title) {
        toast({
          title: "Missing information",
          description: "Please enter a property title",
          variant: "destructive",
        })
        return
      }
      if (!formData.ownerId) {
        toast({
          title: "Missing information",
          description: "Please select a property owner",
          variant: "destructive",
        })
        return
      }
      if (!formData.assignedAgents || formData.assignedAgents.length === 0) {
        toast({
          title: "Missing information",
          description: "Please assign at least one agent",
          variant: "destructive",
        })
        return
      }
    }

    // Media validation for step 2
    if (currentStep === 2 && formData.imageUrls.length === 0 && formData.images.length === 0) {
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

      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update project")
      }

      toast({
        title: "Success",
        description: "Property updated successfully.",
      })

      // Redirect to the projects list
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error updating project:", error)
      toast({
        title: "Error",
        description: error.message || "There was an error updating the property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
