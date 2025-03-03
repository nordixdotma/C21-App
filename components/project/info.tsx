import { Building2, MapPin } from "lucide-react"

interface ProjectInfoProps {
  project: any
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-white">{project.name}</h1>
      <div className="flex flex-wrap items-center gap-4 text-gray-300">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>{project.developer}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-primary">{project.price}</span>
        {project.status && (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {project.status}
          </span>
        )}
      </div>
    </div>
  )
}

