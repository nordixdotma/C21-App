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

const locations = ["Chicago", "Chivilcoy", "Los Angeles", "Miami", "New York", "Uyo"]

const neighborhoods = [
  "Albany Park",
  "Altgeld Gardens",
  "Andersonville",
  "Beverly",
  "Brickel",
  "Brooklyn",
  "Brookside",
  "Central City",
  "Coconut Grove",
  "Hyde Park",
  "Manhattan",
  "Midtown",
  "Northeast Los Angeles",
  "Uupo",
  "West Flagger",
  "Wynwood",
]

const propertyTypes = {
  Commercial: ["Office", "Shop"],
  Residential: ["Apartment", "Condo", "Multi Family Home", "Single Family Home", "Studio", "Villa"],
}

const listingTypes = [
  "For Rent",
  "For Sale",
  "Foreclosures",
  "New Construction",
  "New Listing",
  "Open House",
  "Reduced Price",
  "Resale",
]

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([200, 2500000])
  const [radius, setRadius] = useState([36])

  return (
    <div className="rounded-lg border bg-white p-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cities</SelectLabel>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Neighborhoods</SelectLabel>
                    {neighborhoods.map((neighborhood) => (
                      <SelectItem key={neighborhood} value={neighborhood.toLowerCase()}>
                        {neighborhood}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Label>Radius: {radius}km</Label>
                <Slider value={radius} onValueChange={setRadius} max={100} step={1} className="py-4" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="property-type">
          <AccordionTrigger>Property Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {Object.entries(propertyTypes).map(([category, types]) => (
                <div key={category} className="space-y-2">
                  <Label className="font-semibold">{category}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type.toLowerCase()} />
                        <Label htmlFor={type.toLowerCase()}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="listing-type">
          <AccordionTrigger>Listing Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {listingTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type.toLowerCase()} />
                  <Label htmlFor={type.toLowerCase()}>{type}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label>Min Price</Label>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    min={0}
                  />
                </div>
                <div className="flex-1">
                  <Label>Max Price</Label>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    min={0}
                  />
                </div>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={5000000}
                step={1000}
                className="py-4"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="area">
          <AccordionTrigger>Area</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label>Min Area (m²)</Label>
                <Input type="number" min={0} />
              </div>
              <div className="flex-1">
                <Label>Max Area (m²)</Label>
                <Input type="number" min={0} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="property-id">
          <AccordionTrigger>Property ID</AccordionTrigger>
          <AccordionContent>
            <Input placeholder="Enter Property ID" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex gap-4">
        <Button className="flex-1">Apply Filters</Button>
        <Button variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  )
}

