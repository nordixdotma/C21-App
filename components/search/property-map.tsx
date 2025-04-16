"use client"

import dynamic from "next/dynamic"
import type { Project } from "@/types"
import { useProperty } from "./property-context"
import { formatPopupHTML, getRandomLocation } from "@/lib/mapbox-helpers"

// Dynamically import Mapbox with no SSR
const MapboxMap = dynamic(() => import("@/components/mapbox-map"), { ssr: false })

interface PropertyMapProps {
  properties: Project[]
}

export function PropertyMap({ properties }: PropertyMapProps) {
  const { hoveredProperty } = useProperty()

  // Center map on Marrakech
  const center: [number, number] = [-7.9811, 31.6295]

  // Create markers for each property
  const markers = properties.map((property) => {
    // In a real app, you would use actual coordinates from your property data
    // Here we're generating random locations around Marrakech
    const lngLat = getRandomLocation(center, 3)

    return {
      id: property.id,
      lngLat,
      color: "#3B82F6",
      popupContent: formatPopupHTML(property.name, property.location, property.price, property.id),
    }
  })

  return (
    <div className="h-full w-full rounded-lg">
      <MapboxMap center={center} zoom={12} markers={markers} hoveredMarkerId={hoveredProperty} className="rounded-lg" />
    </div>
  )
}
