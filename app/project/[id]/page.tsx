"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, PhoneIcon as WhatsApp, ArrowLeft } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the tracking functions
import { trackPropertyView, trackContactClick } from "@/lib/view-tracker"

export default function ProjectPage({ params }) {
  const [project, setProject] = useState(null)
  const [agent, setAgent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const mainContentRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true)

        // Fetch project data
        const projectResponse = await fetch(`/api/projects/${params.id}`)

        if (!projectResponse.ok) {
          if (projectResponse.status === 404) {
            throw new Error("Project not found")
          }
          throw new Error("Failed to fetch project data")
        }

        const projectData = await projectResponse.json()

        // Track the view when the project is loaded
        trackPropertyView(params.id)

        // Format the project data
        const formattedProject = {
          ...projectData,
          name: projectData.name || projectData.title || "Untitled Property",
          description: projectData.description || "No description available.",
          details: {
            bedrooms: projectData.bedrooms || "N/A",
            rooms: projectData.rooms || "N/A",
            bathrooms: projectData.bathrooms || "N/A",
            areaSize: projectData.area_size || projectData.areaSize || "N/A",
            sizePostfix: projectData.size_postfix || projectData.sizePostfix || "m²",
            landArea: projectData.land_area || projectData.landArea || "N/A",
            landAreaPostfix: projectData.land_area_postfix || projectData.landAreaPostfix || "m²",
            garages: projectData.garages || "N/A",
            garageSize: projectData.garage_size || projectData.garageSize || "N/A",
            propertyId: projectData.project_id || projectData.projectId || params.id,
            yearBuilt: projectData.year_built || projectData.yearBuilt || "N/A",
          },
          features: projectData.features || [],
          video: projectData.video || projectData.videoUrl || "",
          address: projectData.address || projectData.location || "No address provided",
          coordinates: {
            lat: Number.parseFloat(projectData.latitude) || 31.6295,
            lng: Number.parseFloat(projectData.longitude) || -7.9811,
          },
          gallery: projectData.imageUrls || projectData.images || ["/placeholder.svg?height=600&width=800"],
        }

        setProject(formattedProject)

        // Fetch agent data if available
        if (projectData.assigned_agents && projectData.assigned_agents.length > 0) {
          const agentId = projectData.assigned_agents[0]
          const agentResponse = await fetch(`/api/agents/${agentId}`)

          if (agentResponse.ok) {
            const agentData = await agentResponse.json()
            setAgent({
              id: agentData.id,
              name: agentData.name,
              email: agentData.email,
              phone: agentData.phone || "N/A",
              image: agentData.image || "/placeholder.svg?height=200&width=200",
            })
          } else {
            // Use default agent if API call fails
            setAgent({
              id: "1",
              name: "Sadghi Mhamdi",
              email: "sadghi@example.com",
              phone: "06.64.72.24.88",
              image: "https://th.bing.com/th/id/OIP.ZP-E8ZFH11wb1XSm0dn-5wHaJQ?rs=1&pid=ImgDetMain",
            })
          }
        } else {
          // Use default agent if no assigned agent
          setAgent({
            id: "1",
            name: "Sadghi Mhamdi",
            email: "sadghi@example.com",
            phone: "06.64.72.24.88",
            image: "https://th.bing.com/th/id/OIP.ZP-E8ZFH11wb1XSm0dn-5wHaJQ?rs=1&pid=ImgDetMain",
          })
        }
      } catch (err) {
        console.error("Error loading project:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectData()
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

  if (error || !project) {
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
          <p className="text-gray-500 mb-6">
            {error || "The property you're looking for doesn't exist or has been removed."}
          </p>
          <Button onClick={() => router.push("/")} className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  // Ensure project.name exists
  const projectName = project.name || project.title || "Untitled Property"

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
                <ProjectGallery images={project.gallery || ["/placeholder.svg?height=600&width=800"]} />

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
                        {(project.description || "No description available.").split("\n\n").map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="details" className="mt-6">
                      <ProjectDetails details={project.details || {}} />
                    </TabsContent>
                    <TabsContent value="features" className="mt-6">
                      <ProjectFeatures features={project.features || []} />
                    </TabsContent>
                    <TabsContent value="location" className="mt-6">
                      <ProjectLocation
                        address={project.address || "No address provided"}
                        coordinates={project.coordinates || { lat: 31.6295, lng: -7.9811 }}
                      />
                      <div className="mt-8">
                        <ProjectMap
                          latitude={project.coordinates?.lat || 31.6295}
                          longitude={project.coordinates?.lng || -7.9811}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Desktop Content */}
                <div className="hidden lg:block space-y-10">
                  <div className="border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Description</h2>
                    <div className="text-gray-600 leading-relaxed space-y-4">
                      {(project.description || "No description available.").split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectDetails details={project.details || {}} />
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectFeatures features={project.features || []} />
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectLocation
                      address={project.address || "No address provided"}
                      coordinates={project.coordinates || { lat: 31.6295, lng: -7.9811 }}
                    />
                  </div>

                  {project.video && (
                    <div className="border-t border-gray-200 pt-8">
                      <ProjectVideo videoUrl={project.video} />
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-8">
                    <ProjectMap
                      latitude={project.coordinates?.lat || 31.6295}
                      longitude={project.coordinates?.lng || -7.9811}
                    />
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
                <ContactSidebar className="lg:sticky lg:top-24" agent={agent} />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed WhatsApp Button (Mobile Only) */}
        <a
          href={`https://wa.me/${agent?.phone?.replace(/\D/g, "")}?text=Hi, I'm interested in ${projectName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 lg:hidden"
          onClick={() => trackContactClick(params.id)}
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
