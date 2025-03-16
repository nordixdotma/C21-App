"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function NewProjectsFilter() {
  const [priceRange, setPriceRange] = useState([500000, 5000000])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedBedrooms, setSelectedBedrooms] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Find Your Perfect New Development</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hivernage">Hivernage</SelectItem>
              <SelectItem value="gueliz">Gueliz</SelectItem>
              <SelectItem value="palmgrove">Palm Grove</SelectItem>
              <SelectItem value="agdal">Agdal</SelectItem>
              <SelectItem value="amelkis">Amelkis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Property Type</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5+">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offplan">Off-Plan</SelectItem>
              <SelectItem value="underconstruction">Under Construction</SelectItem>
              <SelectItem value="readytomove">Ready to Move</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <div className="flex justify-between mb-2">
            <Label>Price Range</Label>
            <span className="text-sm text-gray-500">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={500000}
            max={10000000}
            step={100000}
            className="py-4"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">Search Projects</Button>
      </div>
    </div>
  )
}

