"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface LeafletMapProps {
  latitude: number
  longitude: number
}

export default function LeafletMap({ latitude, longitude }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
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

    L.marker([latitude, longitude]).addTo(map)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isClient, latitude, longitude])

  return <div ref={mapRef} className="w-full h-full min-h-[400px] z-[5]" style={{ aspectRatio: "16/9" }} />
}

