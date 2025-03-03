"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, PhoneIcon as WhatsApp } from "lucide-react"
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
import { Button } from "@/components/ui/button"

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
      <main className="flex-grow mt-8">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-grow lg:w-[70%]">
              <div className="space-y-8">
                <ProjectGallery images={project.gallery} />

                <div className="border-t border-gray-200 pt-8">
                  <ProjectDetails details={project.details} />
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <ProjectLocation address={project.address} coordinates={project.coordinates} />
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <ProjectFeatures features={project.features} />
                </div>

                {project.video && (
                  <div className="border-t border-gray-200 pt-8">
                    <ProjectVideo videoUrl={project.video} />
                  </div>
                )}

                <div className="border-t border-gray-200 pt-8">
                  <ProjectMap latitude={project.coordinates.lat} longitude={project.coordinates.lng} />
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <SimilarProjects currentProjectId={project.id} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-[30%]">
              <div className="sticky top-32" style={{ zIndex: 10 }}>
                <ContactSidebar />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed WhatsApp Button (Mobile Only) */}
        <a
          href={`https://wa.me/212664722488?text=Hi, I'm interested in ${project.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 lg:hidden"
        >
          <Button className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
            <WhatsApp className="h-6 w-6 text-white" />
          </Button>
        </a>
      </main>
      <Footer />
    </div>
  )
}

