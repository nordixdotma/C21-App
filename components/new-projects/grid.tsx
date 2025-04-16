"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/shared/project-card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Project } from "@/types"

export function NewProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const allProjects = JSON.parse(savedProjects)
      // Filter to only show new development projects
      const newProjects = allProjects.filter(
        (project) => project.priceType === "new_project" && project.status === "available",
      )
      setProjects(newProjects)
    }
    setIsLoading(false)
  }, [])

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Info className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-700 mb-1">No new development projects found</h3>
        <p className="text-gray-500">
          No new development projects are currently available. Check back soon for new listings.
        </p>
      </div>
    )
  }

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} layout="vertical" showBadge={true} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={handleLoadMore}>
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  )
}
