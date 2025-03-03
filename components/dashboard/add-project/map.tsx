"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapProps {
  latitude?: string
  longitude?: string
  onLocationChange: (lat: string, lng: string) => void
}

export default function Map({ latitude, longitude, onLocationChange }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    // Default to Marrakech coordinates if none provided
    const lat = Number.parseFloat(latitude || "31.6295")
    const lng = Number.parseFloat(longitude || "-7.9811")

    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([lat, lng], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      markerRef.current = L.marker([lat, lng], { draggable: true })
        .addTo(mapRef.current)
        .on("dragend", () => {
          const position = markerRef.current?.getLatLng()
          if (position) {
            onLocationChange(position.lat.toString(), position.lng.toString())
          }
        })
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [latitude, longitude, onLocationChange])

  return <div id="map" className="h-full w-full" />
}

