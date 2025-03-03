import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`}>
      <div className="group rounded-lg border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {project.status && (
            <div className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
              {project.status}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium group-hover:text-primary">{project.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{project.location}</p>
          <p className="mt-2 font-medium text-primary">{project.price}</p>
        </div>
      </div>
    </Link>
  )
}

