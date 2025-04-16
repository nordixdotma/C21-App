import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/types"
import { Bed, Bath, Square } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Determine price label based on price type
  const getPriceLabel = () => {
    if (!project.priceType || project.priceType === "sale") {
      return project.price
    } else if (project.priceType === "rent") {
      return `${project.price}/month`
    } else if (project.priceType === "new_project") {
      return `From ${project.price}`
    }
    return project.price
  }

  // Determine status badge color
  const getStatusColor = () => {
    if (!project.status) return "bg-primary"

    switch (project.status.toLowerCase()) {
      case "available":
        return "bg-green-500"
      case "sold":
        return "bg-red-500"
      case "rented":
        return "bg-orange-500"
      case "under construction":
        return "bg-blue-500"
      case "off-plan":
        return "bg-purple-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <Link href={`/project/${project.id}`}>
      <div className="group rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
          {project.status && (
            <div
              className={`absolute top-3 left-3 rounded-full ${getStatusColor()} px-3 py-1 text-xs font-medium text-white`}
            >
              {project.status}
            </div>
          )}
          {/* Property type badge */}
          {project.priceType && (
            <Badge
              className="absolute top-3 right-3 text-white border-none"
              style={{
                backgroundColor:
                  project.priceType === "sale"
                    ? "#10b981"
                    : project.priceType === "rent"
                      ? "#3b82f6"
                      : project.priceType === "new_project"
                        ? "#f59e0b"
                        : "#6366f1",
              }}
            >
              {project.priceType === "sale"
                ? "For Sale"
                : project.priceType === "rent"
                  ? "For Rent"
                  : project.priceType === "new_project"
                    ? "New Project"
                    : "Property"}
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium group-hover:text-primary">{project.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{project.location}</p>

          {/* Property details */}
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
            {project.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                <span>
                  {project.bedrooms} {Number.parseInt(project.bedrooms) === 1 ? "Bed" : "Beds"}
                </span>
              </div>
            )}
            {project.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                <span>
                  {project.bathrooms} {Number.parseInt(project.bathrooms) === 1 ? "Bath" : "Baths"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 flex justify-between items-center">
            <p className="font-medium text-primary">{getPriceLabel()}</p>
            {project.areaSize && (
              <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                <Square className="h-3.5 w-3.5" />
                <span className="font-medium">
                  {project.areaSize} {project.sizePostfix || "m²"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
