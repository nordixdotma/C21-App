"use client"

import dynamic from "next/dynamic"

// Dynamically import Leaflet with no SSR
const LeafletMap = dynamic(() => import("./leaflet-map"), { ssr: false })

interface MapProps {
  latitude?: string
  longitude?: string
  onLocationChange: (lat: string, lng: string) => void
}

export default function Map({ latitude, longitude, onLocationChange }: MapProps) {
  // Default to Marrakech coordinates if none provided
  const lat = Number.parseFloat(latitude || "31.6295")
  const lng = Number.parseFloat(longitude || "-7.9811")

  return (
    <div id="map" className="h-full w-full">
      <LeafletMap latitude={lat} longitude={lng} onLocationChange={onLocationChange} />
    </div>
  )
}

