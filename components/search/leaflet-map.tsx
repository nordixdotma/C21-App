"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Project } from "@/types"

interface LeafletMapProps {
  properties: Project[]
  hoveredProperty: number | null
}

export default function LeafletMap({ properties, hoveredProperty }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [key: number]: L.Marker }>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [31.6295, -7.9811],
      zoom: 13,
      zoomControl: true,
    })

    mapInstanceRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add markers for each property
    properties.forEach((property) => {
      // In a real app, you would use actual coordinates from your property data
      const lat = 31.6295 + (Math.random() - 0.5) * 0.1
      const lng = -7.9811 + (Math.random() - 0.5) * 0.1

      const marker = L.marker([lat, lng], {
        icon: createMarkerIcon(property.id === hoveredProperty),
      }).addTo(map)

      // Create a popup with property information
      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold">${property.name}</h3>
          <p class="text-sm text-gray-600">${property.location}</p>
          <p class="text-sm font-semibold">${property.price}</p>
        </div>
      `
      marker.bindPopup(popupContent)

      // Store marker reference
      markersRef.current[property.id] = marker
    })

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = {}
    }
  }, [isClient, properties, hoveredProperty]) // Added hoveredProperty to dependencies

  // Update markers on hover
  useEffect(() => {
    if (!mapInstanceRef.current) return

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isHovered = Number(id) === hoveredProperty
      marker.setIcon(createMarkerIcon(isHovered))
      marker.setZIndexOffset(isHovered ? 1000 : 0)

      if (isHovered && mapInstanceRef.current) {
        mapInstanceRef.current.panTo(marker.getLatLng())
      }
    })
  }, [hoveredProperty]) // Removed mapInstanceRef.current from dependencies

  function createMarkerIcon(isHovered: boolean) {
    return L.divIcon({
      className: "custom-marker",
      html: `<div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 ${
        isHovered ? "scale-125" : ""
      }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    })
  }

  return <div ref={mapRef} className="w-full h-full min-h-[400px]" style={{ aspectRatio: "16/9" }} />
}

