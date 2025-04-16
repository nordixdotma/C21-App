"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const features = [
  "Air Conditioning",
  "Barbeque",
  "Dryer",
  "Gym",
  "Laundry",
  "Lawn",
  "Microwave",
  "Outdoor Shower",
  "Refrigerator",
  "Sauna",
  "Swimming Pool",
  "TV Cable",
  "Washer",
  "WiFi",
  "Window Coverings",
]

interface PropertyFeaturesProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function PropertyFeatures({ data, updateData, onNext, onBack }: PropertyFeaturesProps) {
  const handleFeatureChange = (feature: string) => {
    const currentFeatures = data.features || []
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f: string) => f !== feature)
      : [...currentFeatures, feature]
    updateData({ features: updatedFeatures })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox
              id={feature}
              checked={data.features?.includes(feature)}
              onCheckedChange={() => handleFeatureChange(feature)}
            />
            <Label htmlFor={feature}>{feature}</Label>
          </div>
        ))}
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
