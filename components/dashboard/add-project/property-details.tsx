"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PropertyDetailsProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function PropertyDetails({ data, updateData, onNext, onBack }: PropertyDetailsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={data.bedrooms}
            onChange={(e) => updateData({ bedrooms: e.target.value })}
            placeholder="Enter number of bedrooms"
          />
        </div>

        <div>
          <Label htmlFor="rooms">Rooms</Label>
          <Input
            id="rooms"
            type="number"
            value={data.rooms}
            onChange={(e) => updateData({ rooms: e.target.value })}
            placeholder="Enter number of rooms"
          />
        </div>

        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            value={data.bathrooms}
            onChange={(e) => updateData({ bathrooms: e.target.value })}
            placeholder="Enter number of bathrooms"
          />
        </div>

        <div>
          <Label htmlFor="areaSize">
            Area Size <span className="text-red-500">*</span>
          </Label>
          <div className="flex space-x-2">
            <Input
              id="areaSize"
              type="number"
              value={data.areaSize}
              onChange={(e) => updateData({ areaSize: e.target.value })}
              placeholder="Enter property area size"
              required
            />
            <Input
              value={data.sizePostfix}
              onChange={(e) => updateData({ sizePostfix: e.target.value })}
              placeholder="sqft"
              className="w-24"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="landArea">Land Area</Label>
          <div className="flex space-x-2">
            <Input
              id="landArea"
              type="number"
              value={data.landArea}
              onChange={(e) => updateData({ landArea: e.target.value })}
              placeholder="Enter property Land Area"
            />
            <Input
              value={data.landAreaPostfix}
              onChange={(e) => updateData({ landAreaPostfix: e.target.value })}
              placeholder="sqft"
              className="w-24"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="garages">Garages</Label>
          <Input
            id="garages"
            type="number"
            value={data.garages}
            onChange={(e) => updateData({ garages: e.target.value })}
            placeholder="Enter number of garages"
          />
        </div>

        <div>
          <Label htmlFor="garageSize">Garage Size</Label>
          <Input
            id="garageSize"
            value={data.garageSize}
            onChange={(e) => updateData({ garageSize: e.target.value })}
            placeholder="Enter the garage size"
          />
        </div>

        <div>
          <Label htmlFor="propertyId">Property ID</Label>
          <Input
            id="propertyId"
            value={data.propertyId}
            onChange={(e) => updateData({ propertyId: e.target.value })}
            placeholder="Enter property ID"
          />
        </div>

        <div>
          <Label htmlFor="yearBuilt">Year Built</Label>
          <Input
            id="yearBuilt"
            type="number"
            value={data.yearBuilt}
            onChange={(e) => updateData({ yearBuilt: e.target.value })}
            placeholder="Enter year built"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  )
}
