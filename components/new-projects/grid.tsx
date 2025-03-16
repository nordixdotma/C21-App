import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Calendar, Home } from "lucide-react"

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
  },
]

export function NewProjectsGrid() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Latest Development Projects</h2>
        <p className="text-gray-500">Showing {newProjects.length} projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {newProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
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
            </div>

            <div className="p-3">
              <h3 className="text-base font-bold mb-1">{project.name}</h3>

              <div className="space-y-1 mb-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building2 className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="text-sm">{project.developer}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="text-sm">Handover in {project.handover}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Home className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="text-sm font-medium">From {project.priceFrom}</span>
                </div>
              </div>

              <p className="text-gray-600 text-xs mb-2 line-clamp-1">{project.description}</p>

              <Link href={`/project/${project.id}`}>
                <Button className="w-full bg-primary hover:bg-primary/90">View Project</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

