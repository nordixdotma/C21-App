"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/shared/project-card"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types"

export function NewProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleProjects, setVisibleProjects] = useState(8)

  useEffect(() => {
    const fetchNewProjects = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/projects?type=new_project&limit=24")

        if (!response.ok) {
          throw new Error("Failed to fetch new projects")
        }

        const data = await response.json()
        setProjects(data.projects || [])
      } catch (err) {
        console.error("Error fetching new projects:", err)
        setError("Failed to load new projects")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewProjects()
  }, [])

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 8, projects.length))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-gray-500 text-lg">Loading new projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-gray-500 text-lg">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold mb-2">No New Projects Available</h3>
        <p className="text-gray-500">Check back soon for new property listings.</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {projects.slice(0, visibleProjects).map((project) => (
          <ProjectCard key={project.id} project={project} layout="vertical" />
        ))}
      </div>

      {visibleProjects < projects.length && (
        <div className="flex justify-center mt-10">
          <Button onClick={loadMore} className="px-8">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
