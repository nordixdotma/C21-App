import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
    >
      <div className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
          {project.paymentPlan && (
            <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
              {project.paymentPlan}
            </div>
          )}
          {project.status && (
            <div className="absolute top-3 left-3 bg-primary text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
              {project.status}
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4 md:p-6">
          <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {project.name}
          </h3>
          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            <div className="flex items-center text-gray-600 font-body">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs sm:text-sm line-clamp-1">{project.location}</span>
            </div>
            <div className="flex items-center text-gray-600 font-body">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-xs sm:text-sm line-clamp-1">{project.developer}</span>
            </div>
            <div className="flex items-center text-gray-600 font-body">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs sm:text-sm">{project.handover}</span>
            </div>
          </div>
          <div className="pt-3 sm:pt-4 border-t">
            <Button variant="secondary" className="w-full rounded-full text-xs sm:text-sm">
              {project.price}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

