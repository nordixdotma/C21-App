"use client"
import dynamic from "next/dynamic"
import type { Project } from "@/types"
import { useProperty } from "./property-context"

// Dynamically import Leaflet with no SSR
const LeafletMap = dynamic(() => import("./leaflet-map"), { ssr: false })

interface PropertyMapProps {
  properties: Project[]
}

export function PropertyMap({ properties }: PropertyMapProps) {
  const { hoveredProperty } = useProperty()

  return (
    <div className="h-full w-full rounded-lg">
      <LeafletMap properties={properties} hoveredProperty={hoveredProperty} />
    </div>
  )
}

