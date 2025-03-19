"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, PhoneIcon as WhatsApp, Heart, Share, ArrowLeft, MapPin, Bed, Bath, Square, Car } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would be an API call
    const projectData = featuredProjects.find((p) => p.id === Number(params.id))
    if (projectData) {
      setProject({
        ...projectData,
        description:
          "This luxurious property offers stunning views and modern amenities in the heart of Marrakech. Perfect for those seeking a blend of traditional Moroccan architecture and contemporary comfort.\n\nThe property features spacious living areas with high ceilings and large windows that allow natural light to flood in. The kitchen is fully equipped with modern appliances and custom cabinetry. The master bedroom includes a walk-in closet and an en-suite bathroom with a soaking tub and separate shower.\n\nOutdoor spaces include a private garden, swimming pool, and covered terrace perfect for entertaining. The property is located in a secure, gated community with 24-hour security.",
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
        features: [
          "Air Conditioning",
          "Swimming Pool",
          "Garden",
          "Security System",
          "Parking",
          "High Speed Internet",
          "Balcony",
          "Fireplace",
          "Gym",
          "Storage Room",
          "Elevator",
          "Smart Home System",
        ],
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
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ],
      })
    }
    setIsLoading(false)
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return
      const scrollPosition = window.scrollY
      const headerHeight = 300 // Approximate height of the header
      setShowStickyHeader(scrollPosition > headerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-gray-500">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center px-4">
          <div className="mb-6 text-gray-400">
            <svg className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Property Not Found</h2>
          <p className="text-gray-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/")} className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-black pt-64 pb-12">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <ProjectInfo project={project} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-8" ref={mainContentRef}>
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-grow lg:w-[70%]">
              <div className="space-y-10">
                <ProjectGallery images={project.gallery} />

                {/* Mobile Tabs */}
                <div className="lg:hidden">
                  <Tabs defaultValue="description">
                    <TabsList className="w-full grid grid-cols-4">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-6">
                      <h2 className="text-2xl font-semibold mb-4">Description</h2>
                      <div className="text-gray-600 leading-relaxed space-y-4">
                        {project.description.split("\n\n").map((paragraph: string, i: number) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="details" className="mt-6">
                      <ProjectDetails details={project.details} />
                    </TabsContent>
                    <TabsContent value="features" className="mt-6">
                      <ProjectFeatures features={project.features} />
                    </TabsContent>
                    <TabsContent value="location" className="mt-6">
                      <ProjectLocation address={project.address} coordinates={project.coordinates} />
                      <div className="mt-8">
                        <ProjectMap latitude={project.coordinates.lat} longitude={project.coordinates.lng} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Desktop Content */}
                <div className="hidden lg:block space-y-10">
                  <div className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Description</h2>
                    <div className="text-gray-600 leading-relaxed space-y-4">
                      {project.description.split("\n\n").map((paragraph: string, i: number) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectDetails details={project.details} />
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectFeatures features={project.features} />
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectLocation address={project.address} coordinates={project.coordinates} />
                  </div>

                  {project.video && (
                    <div className="border-t border-gray-200 pt-8">
                      <ProjectVideo videoUrl={project.video} />
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectMap latitude={project.coordinates.lat} longitude={project.coordinates.lng} />
                  </div>
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

