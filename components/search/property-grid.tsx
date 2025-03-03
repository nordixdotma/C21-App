import { ProjectCard } from "@/components/shared/project-card"
import type { Project } from "@/types"
import { useProperty } from "./property-context"

interface PropertyGridProps {
  properties: Project[]
  viewMode: "grid" | "list"
}

export function PropertyGrid({ properties, viewMode }: PropertyGridProps) {
  const { setHoveredProperty } = useProperty()

  return (
    <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
      {properties.map((property) => (
        <ProjectCard key={property.id} project={property} onHover={setHoveredProperty} />
      ))}
    </div>
  )
}

