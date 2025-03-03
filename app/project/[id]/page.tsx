"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { ProjectGallery } from "@/components/project/gallery"
import { ProjectInfo } from "@/components/project/info"
import { ProjectDetails } from "@/components/project/details"
import { ProjectFeatures } from "@/components/project/features"
import { ProjectLocation } from "@/components/project/location"
import { ProjectVideo } from "@/components/project/video"
import { ProjectMap } from "@/components/project/map"
import { SimilarProjects } from "@/components/project/similar-projects"
import { ContactSidebar } from "@/components/project/contact-sidebar"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { featuredProjects } from "@/lib/constants"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would be an API call
    const projectData = featuredProjects.find((p) => p.id === Number(params.id))
    if (projectData) {
      setProject({
        ...projectData,
        description:
          "This luxurious property offers stunning views and modern amenities in the heart of Marrakech. Perfect for those seeking a blend of traditional Moroccan architecture and contemporary comfort.",
        details: {
          bedrooms: "4",
          rooms: "6",
          bathrooms: "3",
          areaSize: "350",
          sizePostfix: "m²",
          landArea: "500",
          landAreaPostfix: "m²",
          garages: "2",
          garageSize: "40m²",
          propertyId: "MRK" + params.id,
          yearBuilt: "2023",
        },
        features: ["Air Conditioning", "Swimming Pool", "Garden", "Security System", "Parking", "High Speed Internet"],
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        address: "Avenue Mohammed VI, Marrakech",
        coordinates: {
          lat: 31.6295,
          lng: -7.9811,
        },
        gallery: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ],
      })
    }
    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Project not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-black pt-32 pb-12">
        <div className="max-w-[1170px] mx-auto px-4">
          <ProjectInfo project={project} />
        </div>
      </div>
      <main className="flex-grow py-16">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-grow lg:w-[70%]">
              <ProjectGallery images={project.gallery} className="mt-8" />
              <ProjectDetails details={project.details} className="mt-12" />
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
              <ProjectLocation address={project.address} coordinates={project.coordinates} className="mt-12" />
              <ProjectFeatures features={project.features} className="mt-12" />
              <ProjectVideo videoUrl={project.video} className="mt-12" />
              <ProjectMap latitude={project.coordinates.lat} longitude={project.coordinates.lng} className="mt-12" />
              <SimilarProjects currentProjectId={project.id} className="mt-16" />
            </div>

            {/* Sidebar */}
            <div className="lg:w-[30%]">
              <ContactSidebar className="sticky top-32" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

