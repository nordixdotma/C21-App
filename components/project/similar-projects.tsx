import { ProjectCard } from "@/components/shared/project-card"
import { featuredProjects } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface SimilarProjectsProps {
  currentProjectId: number
  className?: string
}

export function SimilarProjects({ currentProjectId, className }: SimilarProjectsProps) {
  const similarProjects = featuredProjects.filter((project) => project.id !== currentProjectId).slice(0, 3)

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Similar Projects</h2>
        <Link href="/search">
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Link href="/search">
          <Button className="w-full">View All Properties</Button>
        </Link>
      </div>
    </div>
  )
}

