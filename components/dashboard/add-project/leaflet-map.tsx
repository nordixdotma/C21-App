"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface LeafletMapProps {
  latitude: number
  longitude: number
  onLocationChange: (lat: string, lng: string) => void
}

export default function LeafletMap({ latitude, longitude, onLocationChange }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: 13,
      zoomControl: true,
    })

    mapInstanceRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    markerRef.current = L.marker([latitude, longitude], {
      draggable: true,
    })
      .addTo(map)
      .on("dragend", () => {
        const position = markerRef.current?.getLatLng()
        if (position) {
          onLocationChange(position.lat.toString(), position.lng.toString())
        }
      })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isClient, latitude, longitude, onLocationChange])

  return <div ref={mapRef} className="w-full h-full min-h-[400px]" style={{ aspectRatio: "16/9" }} />
}

