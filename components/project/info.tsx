import { Building2, MapPin } from "lucide-react"
import type { Project } from "@/types"

interface ProjectInfoProps {
  project: Project
  className?: string
}

export function ProjectInfo({ project, className }: ProjectInfoProps) {
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

  return (
    <div className={className}>
      <h1 className="text-3xl font-semibold text-white">{project.name}</h1>
      <div className="flex flex-wrap items-center gap-4 text-gray-300 mt-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
        {project.developer && (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>{project.developer}</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2 mt-4">
        <span className="text-2xl font-semibold text-primary">{getPriceLabel()}</span>
        <div className="flex flex-wrap gap-2">
          {project.status && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {project.status}
            </span>
          )}
          {project.priceType === "new_project" && (
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-500">
              New Project
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
