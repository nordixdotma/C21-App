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

export default function EditProjectPage({ params }) {
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
    assignedAgents: [],
    images: [],
    imageUrls: [],
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
    features: [],
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
    // Load project data from localStorage
    const loadProject = () => {
      try {
        const savedProjects = localStorage.getItem("projects")
        if (savedProjects) {
          const projects = JSON.parse(savedProjects)
          const projectId = params.id.toString()
          const project = projects.find(
            (p) => p.id?.toString() === projectId || (p.projectId && p.projectId.toString() === projectId),
          )

          if (project) {
            setFormData({
              id: project.id,
              projectId: project.projectId || project.id, // Use projectId if available, otherwise use id
              title: project.title || project.name || "",
              description: project.description || "",
              price: project.priceValue || project.price?.replace(/[^0-9.-]+/g, "") || "",
              priceType: project.priceType || "sale",
              type: project.type || "apartment",
              status: project.status || "available",
              ownerId: project.ownerId || "",
              assignedAgents: project.assignedAgents || [],
              images: [],
              imageUrls: project.imageUrls || project.images || [project.image].filter(Boolean) || [],
              videoUrl: project.videoUrl || "",
              bedrooms: project.bedrooms || project.details?.bedrooms || "",
              rooms: project.rooms || project.details?.rooms || "",
              bathrooms: project.bathrooms || project.details?.bathrooms || "",
              areaSize: project.areaSize || project.details?.areaSize || "",
              sizePostfix: project.sizePostfix || "sqft",
              landArea: project.landArea || "",
              landAreaPostfix: project.landAreaPostfix || "sqft",
              garages: project.garages || "",
              garageSize: project.garageSize || "",
              yearBuilt: project.yearBuilt || "",
              features: project.features || [],
              address: project.address || "",
              city: project.city || "",
              area: project.area || "",
              zipCode: project.zipCode || "",
              latitude: project.latitude || "",
              longitude: project.longitude || "",
              location: project.location || "",
            })
            return true
          }
        }
        return false
      } catch (error) {
        console.error("Error loading project:", error)
        return false
      }
    }

    if (!loadProject()) {
      toast({
        title: "Error",
        description: "Project not found",
        variant: "destructive",
      })
      router.push("/dashboard")
    } else {
      setIsLoading(false)
    }
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

  const handleSubmit = () => {
    try {
      setIsSubmitting(true)

      // Get existing projects
      const projectsStr = localStorage.getItem("projects")
      if (!projectsStr) {
        throw new Error("No projects found in storage")
      }

      const projects = JSON.parse(projectsStr)
      const projectIndex = projects.findIndex(
        (p) =>
          p.id?.toString() === params.id.toString() || (p.projectId && p.projectId.toString() === params.id.toString()),
      )

      if (projectIndex === -1) {
        throw new Error("Project not found")
      }

      // Update the project
      const updatedProject = {
        ...projects[projectIndex],
        name: formData.title,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        status: formData.status,
        priceType: formData.priceType,
        price: formData.price,
        priceValue: formData.price,
        ownerId: formData.ownerId,
        assignedAgents: formData.assignedAgents,
        image: formData.imageUrls[0] || projects[projectIndex].image,
        images: formData.imageUrls,
        imageUrls: formData.imageUrls,
        videoUrl: formData.videoUrl,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        rooms: formData.rooms,
        areaSize: formData.areaSize,
        sizePostfix: formData.sizePostfix,
        landArea: formData.landArea,
        landAreaPostfix: formData.landAreaPostfix,
        garages: formData.garages,
        garageSize: formData.garageSize,
        yearBuilt: formData.yearBuilt,
        features: formData.features,
        location: `${formData.address}, ${formData.city}`,
        address: formData.address,
        city: formData.city,
        area: formData.area,
        zipCode: formData.zipCode,
        latitude: formData.latitude,
        longitude: formData.longitude,
        lastUpdated: new Date().toISOString().split("T")[0],
        // Ensure we keep the original ID and projectId
        id: projects[projectIndex].id,
        projectId: projects[projectIndex].projectId || projects[projectIndex].id,
      }

      projects[projectIndex] = updatedProject
      localStorage.setItem("projects", JSON.stringify(projects))

      toast({
        title: "Project updated",
        description: `${formData.title} has been updated successfully.`,
      })

      // Add a small delay before redirecting to ensure localStorage is updated
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      console.error("Error updating project:", error)
      toast({
        title: "Error",
        description: "Failed to update project: " + error.message,
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const updateFormData = (data) => {
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
