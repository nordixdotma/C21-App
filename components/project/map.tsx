"use client"

import dynamic from "next/dynamic"

// Dynamically import Mapbox with no SSR
const MapboxMap = dynamic(() => import("@/components/mapbox-map"), { ssr: false })

interface ProjectMapProps {
  latitude: number
  longitude: number
  className?: string
}

export function ProjectMap({ latitude, longitude, className }: ProjectMapProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-6">Map Location</h2>
      <div className="h-[400px] border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-sm transition-all duration-200">
        <MapboxMap
          center={[longitude, latitude]}
          zoom={14}
          markers={[
            {
              lngLat: [longitude, latitude],
              color: "#3B82F6",
              popupContent: "<strong>Property Location</strong>",
            },
          ]}
          className="rounded-lg"
        />
      </div>
    </div>
  )
}
