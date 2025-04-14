"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  onHover?: (id: number | null) => void
  layout?: "vertical" | "horizontal"
}

export function ProjectCard({ project, onHover, layout = "vertical" }: ProjectCardProps) {
  const isHorizontal = layout === "horizontal"

  return (
    <div
      className={`group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        isHorizontal ? "flex flex-col md:flex-row" : ""
      }`}
      onMouseEnter={() => onHover?.(project.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden ${isHorizontal ? "md:w-2/5" : "aspect-[4/3]"}`}>
        <Link href={`/project/${project.id}`}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {project.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
          {project.isFeatured && <Badge className="bg-primary hover:bg-primary/90">Featured</Badge>}
          {project.type === "sale" && <Badge className="bg-blue-500 hover:bg-blue-600">For Sale</Badge>}
          {project.type === "rent" && <Badge className="bg-amber-500 hover:bg-amber-600">For Rent</Badge>}
        </div>

        {/* Favorite button */}
        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur-sm transition-all hover:bg-white hover:text-rose-500">
          <Heart className="h-4 w-4" />
        </button>

        {/* Price tag */}
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
          {project.price}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col p-4 ${isHorizontal ? "md:w-3/5" : ""}`}>
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4 text-gray-400" />
          {project.location}
        </div>

        <h3 className="mb-2 text-lg font-semibold leading-tight">
          <Link href={`/project/${project.id}`} className="hover:text-primary">
            {project.name}
          </Link>
        </h3>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{project.description}</p>

        {/* Property details */}
        <div className="mt-auto flex flex-wrap gap-3 border-t border-gray-100 pt-3">
          <div className="flex items-center text-sm text-gray-500">
            <Bed className="mr-1 h-4 w-4 text-gray-400" />
            {project.bedrooms} {project.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Bath className="mr-1 h-4 w-4 text-gray-400" />
            {project.bathrooms} {project.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Maximize className="mr-1 h-4 w-4 text-gray-400" />
            {project.size} m²
          </div>
        </div>

        {/* View details button - only shown on horizontal layout */}
        {isHorizontal && (
          <div className="mt-4 flex justify-end">
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link href={`/project/${project.id}`}>
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

