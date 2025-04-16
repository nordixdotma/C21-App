"use client"

import dynamic from "next/dynamic"

// Dynamically import Mapbox with no SSR
const MapboxMap = dynamic(() => import("@/components/mapbox-map"), { ssr: false })

interface MapProps {
  latitude?: string
  longitude?: string
  onLocationChange: (lat: string, lng: string) => void
}

export default function Map({ latitude, longitude, onLocationChange }: MapProps) {
  // Default to Marrakech coordinates if none provided
  const lat = Number.parseFloat(latitude || "31.6295")
  const lng = Number.parseFloat(longitude || "-7.9811")

  const handleMarkerDrag = (lngLat: [number, number]) => {
    onLocationChange(lngLat[1].toString(), lngLat[0].toString())
  }

  return (
    <div id="map" className="h-full w-full">
      <MapboxMap
        center={[lng, lat]}
        zoom={13}
        markers={[
          {
            lngLat: [lng, lat],
            draggable: true,
            color: "#10B981",
          },
        ]}
        onMarkerDrag={handleMarkerDrag}
      />
    </div>
  )
}
