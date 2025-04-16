"use client"

import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/types"
import { Bed, Bath, Square, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  project: Project
  onHover?: (project: Project | null) => void
  layout?: "vertical" | "horizontal"
  showBadge?: boolean
}

export function ProjectCard({ project, onHover, layout = "vertical", showBadge = true }: ProjectCardProps) {
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

  // Get badge text based on price type
  const getBadgeText = () => {
    if (!project.priceType) return null

    switch (project.priceType) {
      case "sale":
        return "For Sale"
      case "rent":
        return "For Rent"
      case "new_project":
        return "New Project"
      default:
        return project.priceType
    }
  }

  if (layout === "horizontal") {
    return (
      <Link href={`/project/${project.id}`}>
        <div
          className="group flex flex-col sm:flex-row rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md overflow-hidden"
          onMouseEnter={() => onHover?.(project)}
          onMouseLeave={() => onHover?.(null)}
        >
          <div className="relative w-full sm:w-1/3 aspect-[4/3] sm:aspect-square overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
            {showBadge && project.priceType && (
              <Badge className="absolute top-3 left-3 bg-primary text-white border-none">{getBadgeText()}</Badge>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-medium group-hover:text-primary line-clamp-1 h-6">{project.name}</h3>

            <div className="flex items-center mt-1 text-sm text-gray-600 line-clamp-1">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{project.location}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 flex-1">
              {project.bedrooms && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Bed className="h-4 w-4" />
                  <span>
                    {project.bedrooms} {Number.parseInt(project.bedrooms) === 1 ? "Bed" : "Beds"}
                  </span>
                </div>
              )}
              {project.bathrooms && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Bath className="h-4 w-4" />
                  <span>
                    {project.bathrooms} {Number.parseInt(project.bathrooms) === 1 ? "Bath" : "Baths"}
                  </span>
                </div>
              )}
              {project.areaSize && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Square className="h-4 w-4" />
                  <span>
                    {project.areaSize} {project.sizePostfix || "m²"}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-auto pt-3">
              <p className="font-medium text-primary">{getPriceLabel()}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/project/${project.id}`}>
      <div
        className="group rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md h-full flex flex-col"
        onMouseEnter={() => onHover?.(project)}
        onMouseLeave={() => onHover?.(null)}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
          {showBadge && project.priceType && (
            <Badge className="absolute top-3 left-3 bg-primary text-white border-none z-10">{getBadgeText()}</Badge>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium group-hover:text-primary line-clamp-1 h-6">{project.name}</h3>

          <div className="flex items-center mt-1 text-sm text-gray-600 line-clamp-1">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span>{project.location}</span>
          </div>

          <div className="mt-auto pt-2">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500 min-h-[24px]">
              {project.bedrooms && (
                <div className="flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5" />
                  <span>
                    {project.bedrooms} {Number.parseInt(project.bedrooms as string) === 1 ? "Bed" : "Beds"}
                  </span>
                </div>
              )}
              {project.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" />
                  <span>
                    {project.bathrooms} {Number.parseInt(project.bathrooms as string) === 1 ? "Bath" : "Baths"}
                  </span>
                </div>
              )}
              {project.areaSize && (
                <div className="flex items-center gap-1">
                  <Square className="h-3.5 w-3.5" />
                  <span>
                    {project.areaSize} {project.sizePostfix || "m²"}
                  </span>
                </div>
              )}
            </div>

            <p className="mt-2 font-medium text-primary truncate">{getPriceLabel()}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
