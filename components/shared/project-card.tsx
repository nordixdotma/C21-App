import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, MapPin, Building2 } from "lucide-react"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  onHover?: (id: number | null) => void
}

export function ProjectCard({ project, onHover }: ProjectCardProps) {
  return (
    <Link
      href={`/project/${project.id}`}
      onMouseEnter={() => onHover?.(project.id)}
      onMouseLeave={() => onHover?.(null)}
      className="block"
    >
      <div className="group bg-black rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              width={600}
              height={450}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Status badge */}
          {project.status && (
            <Badge className="absolute top-3 left-3 bg-primary hover:bg-primary text-white border-none">
              {project.status}
            </Badge>
          )}

          {/* Payment plan badge */}
          {project.paymentPlan && (
            <Badge variant="outline" className="absolute top-3 right-3 bg-black/80 text-white border-none">
              {project.paymentPlan}
            </Badge>
          )}

          {/* Price badge */}
          <div className="absolute -bottom-4 right-4">
            <Badge className="bg-primary hover:bg-primary text-white text-sm py-2 px-4 shadow-lg">
              {project.price}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-white group-hover:text-primary transition-colors line-clamp-1 mt-2">
            {project.name}
          </h3>

          <div className="flex items-center text-gray-200 mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{project.location}</span>
          </div>

          <div className="flex items-center text-gray-200 mb-4">
            <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{project.developer}</span>
          </div>

          {/* Property features */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center text-gray-200">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-xs">3-4</span>
            </div>
            <div className="flex items-center text-gray-200">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-xs">2-3</span>
            </div>
            <div className="flex items-center text-gray-200">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-xs">120-250m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

