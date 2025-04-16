"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Set your Mapbox access token from environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || ""

interface MapboxMapProps {
  center: [number, number]
  zoom?: number
  markers?: Array<{
    id?: number
    lngLat: [number, number]
    color?: string
    popupContent?: string
    draggable?: boolean
  }>
  interactive?: boolean
  onMarkerDrag?: (lngLat: [number, number]) => void
  style?: React.CSSProperties
  className?: string
  hoveredMarkerId?: number | null
}

export default function MapboxMap({
  center,
  zoom = 13,
  markers = [],
  interactive = true,
  onMarkerDrag,
  style,
  className = "",
  hoveredMarkerId = null,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const mapMarkers = useRef<{ [key: string]: mapboxgl.Marker }>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isClient || !mapContainer.current || map.current) return

    // Check if Mapbox API key is available
    if (!mapboxgl.accessToken) {
      console.error("Mapbox API key is missing. Please set NEXT_PUBLIC_MAPBOX_API_KEY in your environment variables.")
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom,
      interactive,
    })

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right")

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [isClient, center, zoom, interactive])

  // Handle markers
  useEffect(() => {
    if (!map.current || !markers.length) return

    // Clear existing markers
    Object.values(mapMarkers.current).forEach((marker) => marker.remove())
    mapMarkers.current = {}

    // Add new markers
    markers.forEach((markerData, index) => {
      const { lngLat, color = "#3B82F6", popupContent, draggable = false, id } = markerData
      const markerId = id !== undefined ? `marker-${id}` : `marker-${index}`

      // Create marker element
      const el = document.createElement("div")
      el.className = "flex items-center justify-center"
      el.style.width = "30px"
      el.style.height = "30px"

      // Create SVG for marker
      const isHovered = id === hoveredMarkerId
      const scale = isHovered ? 1.2 : 1

      el.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-200" 
             style="transform: scale(${scale}); background-color: ${color};">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
      `

      // Create and add the marker
      const marker = new mapboxgl.Marker({ element: el, draggable }).setLngLat(lngLat).addTo(map.current)

      // Add popup if content provided
      if (popupContent) {
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(popupContent)

        marker.setPopup(popup)

        // Open popup if marker is hovered
        if (isHovered) {
          marker.togglePopup()
        }
      }

      // Handle drag events
      if (draggable && onMarkerDrag) {
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat()
          onMarkerDrag([lngLat.lng, lngLat.lat])
        })
      }

      // Store marker reference
      mapMarkers.current[markerId] = marker
    })
  }, [markers, hoveredMarkerId, onMarkerDrag])

  // Update map center when it changes
  useEffect(() => {
    if (!map.current) return
    map.current.setCenter(center)
  }, [center])

  return <div ref={mapContainer} className={`w-full h-full min-h-[400px] ${className}`} style={{ ...style }} />
}
