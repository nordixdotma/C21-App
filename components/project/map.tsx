"use client"

import dynamic from "next/dynamic"

// Dynamically import Leaflet with no SSR
const LeafletMap = dynamic(() => import("./leaflet-map"), { ssr: false })

interface ProjectMapProps {
  latitude: number
  longitude: number
  className?: string
}

export function ProjectMap({ latitude, longitude, className }: ProjectMapProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-6">Map Location</h2>
      <div className="h-[400px] border border-gray-200">
        <LeafletMap latitude={latitude} longitude={longitude} />
      </div>
    </div>
  )
}

