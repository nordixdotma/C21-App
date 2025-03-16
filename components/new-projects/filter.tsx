"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { MapPin, Home, Bed, Clock, Search, SlidersHorizontal, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function NewProjectsFilter() {
  const [priceRange, setPriceRange] = useState([500000, 5000000])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedBedrooms, setSelectedBedrooms] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded)
  }

  const clearFilters = () => {
    setSelectedLocation("")
    setSelectedType("")
    setSelectedBedrooms("")
    setSelectedStatus("")
    setPriceRange([500000, 5000000])
  }

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={toggleFilter}
          variant="outline"
          className="w-full flex items-center justify-between border border-gray-200"
        >
          <span className="flex items-center">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter Properties
          </span>
          <span className="text-xs bg-primary text-white rounded-full px-2 py-1">
            {(selectedLocation ? 1 : 0) +
              (selectedType ? 1 : 0) +
              (selectedBedrooms ? 1 : 0) +
              (selectedStatus ? 1 : 0)}
          </span>
        </Button>
      </div>

      {/* Desktop and Expanded Mobile Filter */}
      <div className={`${isFilterExpanded || "hidden lg:block"}`}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Find Your Perfect New Development
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm flex items-center text-gray-500 hover:text-primary"
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </Button>
              <Button size="sm" className="lg:hidden" variant="outline" onClick={toggleFilter}>
                Close
              </Button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center text-sm font-medium">
                  <MapPin className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  Location
                </Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location" className="border-gray-200 focus:ring-primary">
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
                <Label htmlFor="type" className="flex items-center text-sm font-medium">
                  <Home className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  Property Type
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type" className="border-gray-200 focus:ring-primary">
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
                <Label htmlFor="bedrooms" className="flex items-center text-sm font-medium">
                  <Bed className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  Bedrooms
                </Label>
                <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                  <SelectTrigger id="bedrooms" className="border-gray-200 focus:ring-primary">
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
                <Label htmlFor="status" className="flex items-center text-sm font-medium">
                  <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  Status
                </Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger id="status" className="border-gray-200 focus:ring-primary">
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

            {/* Advanced Filters Accordion */}
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="advanced-filters" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm font-medium text-primary hover:no-underline">
                  Advanced Filters
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="flex items-center text-sm font-medium">Price Range</Label>
                        <span className="text-sm text-primary font-medium">
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
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatPrice(500000)}</span>
                        <span>{formatPrice(10000000)}</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Search Button */}
            <div className="mt-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                <Search className="mr-2 h-4 w-4" />
                Search Projects
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedLocation || selectedType || selectedBedrooms || selectedStatus) && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 mr-1 pt-1">Active filters:</span>

              {selectedLocation && (
                <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation("")} className="ml-1 hover:text-primary/70">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {selectedType && (
                <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
                  <Home className="mr-1 h-3 w-3" />
                  {selectedType}
                  <button onClick={() => setSelectedType("")} className="ml-1 hover:text-primary/70">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {selectedBedrooms && (
                <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
                  <Bed className="mr-1 h-3 w-3" />
                  {selectedBedrooms} {Number.parseInt(selectedBedrooms) === 1 ? "Bedroom" : "Bedrooms"}
                  <button onClick={() => setSelectedBedrooms("")} className="ml-1 hover:text-primary/70">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {selectedStatus && (
                <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {selectedStatus}
                  <button onClick={() => setSelectedStatus("")} className="ml-1 hover:text-primary/70">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

