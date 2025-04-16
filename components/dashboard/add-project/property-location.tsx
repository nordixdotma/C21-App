"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import Map with no SSR
const Map = dynamic(() => import("./map"), { ssr: false })

interface PropertyLocationProps {
  data: any
  updateData: (data: any) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting?: boolean
}

export function PropertyLocation({ data, updateData, onSubmit, onBack, isSubmitting = false }: PropertyLocationProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const handleLocationChange = (lat: string, lng: string) => {
    updateData({ latitude: lat, longitude: lng })
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
            value={data.address || ""}
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
              value={data.city || ""}
              onChange={(e) => updateData({ city: e.target.value })}
              placeholder="Enter the city"
            />
          </div>

          <div>
            <Label htmlFor="area">Area</Label>
            <Input
              id="area"
              value={data.area || ""}
              onChange={(e) => updateData({ area: e.target.value })}
              placeholder="Enter the area"
            />
          </div>

          <div>
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input
              id="zipCode"
              value={data.zipCode || ""}
              onChange={(e) => updateData({ zipCode: e.target.value })}
              placeholder="Enter zip/postal code"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              value={data.latitude || ""}
              onChange={(e) => updateData({ latitude: e.target.value })}
              placeholder="Enter address latitude"
            />
          </div>

          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              value={data.longitude || ""}
              onChange={(e) => updateData({ longitude: e.target.value })}
              placeholder="Enter address longitude"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Map Location</Label>
          <div className="h-[300px] rounded-lg border">
            <Map latitude={data.latitude} longitude={data.longitude} onLocationChange={handleLocationChange} />
          </div>
          <p className="text-sm text-gray-500">
            Click on the map to set the property location or enter coordinates manually above.
          </p>
        </div>
      </div>

      {/* Add extra padding at the bottom to ensure buttons are visible */}
      <div className="pb-20"></div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Project"
          )}
        </Button>
      </div>
    </form>
  )
}
