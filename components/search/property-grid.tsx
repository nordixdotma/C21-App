"use client"

import { ProjectCard } from "@/components/shared/project-card"
import type { Project } from "@/types"
import { useProperty } from "./property-context"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface PropertyGridProps {
  properties: Project[]
  viewMode: "grid" | "list"
}

export function PropertyGrid({ properties, viewMode }: PropertyGridProps) {
  const { setHoveredProperty } = useProperty()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Properties</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Button variant="outline" size="sm" className="border-gray-300">
            Featured
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No properties found</h3>
          <p className="text-gray-500 max-w-md">
            We couldn't find any properties matching your search criteria. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "space-y-6"}>
          {properties.map((property) => (
            <ProjectCard key={property.id} project={property} onHover={setHoveredProperty} />
          ))}
        </div>
      )}
    </div>
  )
}

