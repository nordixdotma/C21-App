"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import("./map"), { ssr: false })

interface PropertyLocationProps {
  data: any
  updateData: (data: any) => void
  onSubmit: () => void
  onBack: () => void
}

export function PropertyLocation({ data, updateData, onSubmit, onBack }: PropertyLocationProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="address">
            Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="Enter your property address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => updateData({ city: e.target.value })}
              placeholder="Enter the city"
            />
          </div>

          <div>
            <Label htmlFor="area">Area</Label>
            <Input
              id="area"
              value={data.area}
              onChange={(e) => updateData({ area: e.target.value })}
              placeholder="Enter the area"
            />
          </div>

          <div>
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input
              id="zipCode"
              value={data.zipCode}
              onChange={(e) => updateData({ zipCode: e.target.value })}
              placeholder="Enter zip/postal code"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Map Location</Label>
          <div className="h-[300px] rounded-lg border">
            <Map
              latitude={data.latitude}
              longitude={data.longitude}
              onLocationChange={(lat, lng) => updateData({ latitude: lat, longitude: lng })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              value={data.latitude}
              onChange={(e) => updateData({ latitude: e.target.value })}
              placeholder="Enter address latitude"
            />
          </div>

          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              value={data.longitude}
              onChange={(e) => updateData({ longitude: e.target.value })}
              placeholder="Enter address longitude"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Submit Project</Button>
      </div>
    </form>
  )
}

