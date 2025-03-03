"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const locations = ["Hivernage", "Gueliz", "Palm Grove", "Agdal", "Amelkis", "Targa"]

const propertyTypes = {
  Residential: ["Apartment", "Villa", "House", "Studio", "Penthouse", "Duplex"],
  Commercial: ["Office", "Shop", "Restaurant", "Hotel", "Land"],
}

const amenities = [
  "Air Conditioning",
  "Swimming Pool",
  "Garden",
  "Balcony",
  "Parking",
  "Gym",
  "Security",
  "Elevator",
  "Furnished",
  "Terrace",
  "Sea View",
  "Mountain View",
]

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([500000, 5000000])
  const [areaRange, setAreaRange] = useState([50, 500])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setPriceRange([500000, 5000000])
    setAreaRange([50, 500])
  }

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search by keyword..." className="pl-10 border-gray-300 focus:border-primary" />
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-auto p-0 text-xs text-gray-500 hover:text-gray-900"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="rounded-full px-3 py-1 bg-gray-100">
                {filter}
                <button onClick={() => removeFilter(filter)} className="ml-2 text-gray-500 hover:text-gray-900">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={[]} className="w-full">
        <AccordionItem value="price" className="border-b border-gray-200">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Price Range</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={10000000}
                step={100000}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <div className="w-[45%]">
                  <Label htmlFor="min-price" className="text-xs text-gray-500 mb-1">
                    Min Price
                  </Label>
                  <Input
                    id="min-price"
                    type="text"
                    value={priceRange[0].toLocaleString()}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value.replace(/,/g, ""))
                      if (!isNaN(value)) {
                        setPriceRange([value, priceRange[1]])
                      }
                    }}
                    className="border-gray-300"
                  />
                </div>
                <div className="w-[45%]">
                  <Label htmlFor="max-price" className="text-xs text-gray-500 mb-1">
                    Max Price
                  </Label>
                  <Input
                    id="max-price"
                    type="text"
                    value={priceRange[1].toLocaleString()}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value.replace(/,/g, ""))
                      if (!isNaN(value)) {
                        setPriceRange([priceRange[0], value])
                      }
                    }}
                    className="border-gray-300"
                  />
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() =>
                  addFilter(`Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} MAD`)
                }
              >
                Apply Price Range
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="property-type" className="border-b border-gray-200">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Property Type</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-4">
              {Object.entries(propertyTypes).map(([category, types]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">{category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type.toLowerCase()}`}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addFilter(type)
                            } else {
                              removeFilter(type)
                            }
                          }}
                          checked={activeFilters.includes(type)}
                        />
                        <Label htmlFor={`type-${type.toLowerCase()}`} className="text-sm cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-b border-gray-200">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Location</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-4">
              <Select onValueChange={(value) => addFilter(`Location: ${value}`)}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Areas</SelectLabel>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bedrooms" className="border-b border-gray-200">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Bedrooms</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, "6+"].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="sm"
                  className={`rounded-full px-4 ${
                    activeFilters.includes(`${num} Bedroom${num !== 1 ? "s" : ""}`)
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    const filter = `${num} Bedroom${num !== 1 ? "s" : ""}`
                    if (activeFilters.includes(filter)) {
                      removeFilter(filter)
                    } else {
                      addFilter(filter)
                    }
                  }}
                >
                  {num}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bathrooms" className="border-b border-gray-200">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Bathrooms</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, "5+"].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="sm"
                  className={`rounded-full px-4 ${
                    activeFilters.includes(`${num} Bathroom${num !== 1 ? "s" : ""}`)
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    const filter = `${num} Bathroom${num !== 1 ? "s" : ""}`
                    if (activeFilters.includes(filter)) {
                      removeFilter(filter)
                    } else {
                      addFilter(filter)
                    }
                  }}
                >
                  {num}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="area" className="border-b border-gray-200">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Area Size</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-4">
              <Slider value={areaRange} onValueChange={setAreaRange} min={0} max={1000} step={10} className="py-4" />
              <div className="flex items-center justify-between">
                <div className="w-[45%]">
                  <Label htmlFor="min-area" className="text-xs text-gray-500 mb-1">
                    Min Area (m²)
                  </Label>
                  <Input
                    id="min-area"
                    type="number"
                    value={areaRange[0]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (!isNaN(value)) {
                        setAreaRange([value, areaRange[1]])
                      }
                    }}
                    className="border-gray-300"
                  />
                </div>
                <div className="w-[45%]">
                  <Label htmlFor="max-area" className="text-xs text-gray-500 mb-1">
                    Max Area (m²)
                  </Label>
                  <Input
                    id="max-area"
                    type="number"
                    value={areaRange[1]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (!isNaN(value)) {
                        setAreaRange([areaRange[0], value])
                      }
                    }}
                    className="border-gray-300"
                  />
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => addFilter(`Area: ${areaRange[0]} - ${areaRange[1]} m²`)}
              >
                Apply Area Range
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amenities" className="border-b border-gray-200">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Amenities</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        addFilter(amenity)
                      } else {
                        removeFilter(amenity)
                      }
                    }}
                    checked={activeFilters.includes(amenity)}
                  />
                  <Label
                    htmlFor={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full bg-primary hover:bg-primary/90">Apply Filters</Button>
    </div>
  )
}

