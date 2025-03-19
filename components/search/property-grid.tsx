"use client"

import { ProjectCard } from "@/components/shared/project-card"
import type { Project } from "@/types"
import { useProperty } from "./property-context"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchX } from "lucide-react"

interface PropertyGridProps {
  properties: Project[]
  viewMode: "grid" | "list"
  isLoading?: boolean
}

export function PropertyGrid({ properties, viewMode, isLoading = false }: PropertyGridProps) {
  const { setHoveredProperty } = useProperty()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-lg border border-gray-200 overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <SearchX className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">No properties found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "space-y-6"}>
        {properties.map((property) => (
          <ProjectCard
            key={property.id}
            project={property}
            onHover={setHoveredProperty}
            layout={viewMode === "list" ? "horizontal" : "vertical"}
          />
        ))}
      </div>
    </div>
  )
}

