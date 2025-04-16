"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/shared/project-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Info, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Project } from "@/types"

interface PropertyGridProps {
  properties: Project[]
  isLoading: boolean
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function PropertyGrid({ properties, isLoading, viewMode, onViewModeChange }: PropertyGridProps) {
  const [visibleCount, setVisibleCount] = useState(9)

  const handleViewModeChange = (value: string) => {
    if (value && (value === "grid" || value === "list")) {
      onViewModeChange(value as "grid" | "list")
    }
  }

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

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Info className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-700 mb-1">No properties found</h3>
        <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
    )
  }

  const visibleProperties = properties.slice(0, visibleCount)
  const hasMore = visibleCount < properties.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{properties.length} properties found</p>
        <ToggleGroup type="single" value={viewMode} onValueChange={handleViewModeChange}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid grid-cols-1 gap-6"
        }
      >
        {visibleProperties.map((property) => (
          <ProjectCard
            key={property.id}
            project={property}
            layout={viewMode === "grid" ? "vertical" : "horizontal"}
            showBadge={false}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={handleLoadMore}>
            Load More Properties
          </Button>
        </div>
      )}
    </div>
  )
}
