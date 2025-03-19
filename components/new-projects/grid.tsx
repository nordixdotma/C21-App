"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Calendar, Home, Heart, ArrowRight, Maximize, Share2, Info } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for new development projects
const newProjects = [
  {
    id: 1,
    name: "M Avenue Residences",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Hivernage, Marrakech",
    developer: "M Avenue Development",
    handover: "Q4 2024",
    priceFrom: "2,500,000 MAD",
    status: "Under Construction",
    description:
      "Luxury apartments in the heart of Hivernage with premium amenities including pool, gym, and 24/7 security.",
    bedrooms: "1-3",
    bathrooms: "1-2",
    size: "75-180",
    featured: true,
    category: "apartment",
  },
  {
    id: 2,
    name: "Agdal Gardens",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Agdal, Marrakech",
    developer: "Palmeraie Développement",
    handover: "Q2 2025",
    priceFrom: "1,800,000 MAD",
    status: "Off-Plan",
    description:
      "Modern residential complex with spacious apartments, lush gardens, and proximity to essential amenities.",
    bedrooms: "2-4",
    bathrooms: "2-3",
    size: "90-220",
    featured: false,
    category: "apartment",
  },
  {
    id: 3,
    name: "Palm Grove Villas",
    image: "https://th.bing.com/th/id/OIP.8cskRuPcOdZkMfkpG6bccAHaEo?rs=1&pid=ImgDetMain",
    location: "La Palmeraie, Marrakech",
    developer: "Atlas Hospitality",
    handover: "Q3 2024",
    priceFrom: "4,200,000 MAD",
    status: "Under Construction",
    description:
      "Exclusive villa community in the prestigious Palm Grove area with private pools and expansive gardens.",
    bedrooms: "3-5",
    bathrooms: "3-5",
    size: "250-450",
    featured: true,
    category: "villa",
  },
  {
    id: 4,
    name: "The Pearl Residences",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Gueliz, Marrakech",
    developer: "Majestic Properties",
    handover: "Q1 2026",
    priceFrom: "3,100,000 MAD",
    status: "Off-Plan",
    description:
      "Contemporary apartments in the vibrant Gueliz district with rooftop pool and panoramic views of the city.",
    bedrooms: "1-4",
    bathrooms: "1-3",
    size: "65-210",
    featured: false,
    category: "apartment",
  },
  {
    id: 5,
    name: "Oasis Golf Villas",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Amelkis, Marrakech",
    developer: "Oasis Developments",
    handover: "Q4 2025",
    priceFrom: "5,500,000 MAD",
    status: "Off-Plan",
    description:
      "Luxury golf villas with direct access to the prestigious Amelkis Golf Course and stunning Atlas Mountain views.",
    bedrooms: "4-6",
    bathrooms: "4-6",
    size: "300-500",
    featured: true,
    category: "villa",
  },
  {
    id: 6,
    name: "Royal Heights",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Targa, Marrakech",
    developer: "Royal Estates",
    handover: "Q2 2024",
    priceFrom: "2,200,000 MAD",
    status: "Ready to Move",
    description:
      "Elegant apartments with high-end finishes, communal pool, and landscaped gardens in the quiet Targa neighborhood.",
    bedrooms: "2-3",
    bathrooms: "2-3",
    size: "100-180",
    featured: false,
    category: "apartment",
  },
]

export function NewProjectsGrid() {
  const [activeTab, setActiveTab] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const filteredProjects =
    activeTab === "all" ? newProjects : newProjects.filter((project) => project.category === activeTab)

  const featuredProjects = newProjects.filter((project) => project.featured)

  return (
    <div className="space-y-8">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Developments</h2>
            <Link
              href="/featured-projects"
              className="text-primary text-sm font-medium hover:underline flex items-center"
            >
              View all featured
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.slice(0, 2).map((project) => (
              <div
                key={`featured-${project.id}`}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-primary text-white border-none">Featured</Badge>
                    <Badge className="bg-black/70 text-white border-none backdrop-blur-sm">{project.status}</Badge>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(project.id)
                    }}
                    className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur-sm transition-all hover:bg-white hover:text-rose-500"
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(project.id) ? "fill-rose-500 text-rose-500" : ""}`}
                    />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                      <div className="flex items-center text-sm">
                        <Building2 className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span>{project.developer}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span>Handover: {project.handover}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold">From {project.priceFrom}</div>
                      <Link href={`/project/${project.id}`}>
                        <Button className="bg-primary hover:bg-primary/90 text-white">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">All Development Projects</h2>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-3 h-9">
              <TabsTrigger value="all" className="text-xs">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="apartment" className="text-xs">
                Apartments
              </TabsTrigger>
              <TabsTrigger value="villa" className="text-xs">
                Villas
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <Badge className="absolute top-3 left-3 bg-primary text-white border-none">{project.status}</Badge>

                <div className="absolute top-3 right-3 flex gap-2">

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(project.id)
                          }}
                          className="rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur-sm transition-all hover:bg-white hover:text-rose-500"
                        >
                          <Heart
                            className={`h-4 w-4 ${favorites.includes(project.id) ? "fill-rose-500 text-rose-500" : ""}`}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{favorites.includes(project.id) ? "Remove from favorites" : "Add to favorites"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">
                  <Link href={`/project/${project.id}`} className="hover:text-primary transition-colors">
                    {project.name}
                  </Link>
                </h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-gray-400" />
                  <span className="text-sm">{project.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-4 py-3 border-t border-b border-gray-100 mb-3">
                  <div className="flex items-center text-gray-600">
                    <Home className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-gray-400" />
                    <span className="text-xs">{project.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-gray-400" />
                    <span className="text-xs">{project.handover}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Maximize className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-gray-400" />
                    <span className="text-xs">{project.size} m²</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-primary font-semibold">From {project.priceFrom}</div>
                  <Link href={`/project/${project.id}`}>
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      Details
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Info className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No projects found</h3>
            <p className="text-gray-500">Try adjusting your filters to find what you're looking for</p>
          </div>
        )}

        {filteredProjects.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="gap-2">
              Load More Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

