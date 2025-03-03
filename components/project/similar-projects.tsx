import { ProjectCard } from "@/components/shared/project-card"
import { featuredProjects } from "@/lib/constants"

interface SimilarProjectsProps {
  currentProjectId: number
  className?: string
}

export function SimilarProjects({ currentProjectId, className }: SimilarProjectsProps) {
  const similarProjects = featuredProjects.filter((project) => project.id !== currentProjectId).slice(0, 3)

  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-6">Similar Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

