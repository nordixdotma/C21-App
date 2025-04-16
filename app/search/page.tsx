"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyFilters } from "@/components/search/property-filters"
import { PropertyMap } from "@/components/search/property-map"
import { PropertyGrid } from "@/components/search/property-grid"
import { SlidersHorizontal, Search, ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { Project } from "@/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState("featured")
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get initial search parameters
  useEffect(() => {
    const query = searchParams.get("query") || ""
    const tab = searchParams.get("type") || "all"

    setSearchQuery(query)
    setActiveTab(tab)
  }, [searchParams])

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)

        // Build query parameters
        const queryParams = new URLSearchParams()

        if (searchQuery) {
          queryParams.append("query", searchQuery)
        }

        if (activeTab !== "all") {
          queryParams.append("type", activeTab)
        }

        // Fetch projects from API
        const response = await fetch(`/api/projects?${queryParams.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data = await response.json()
        setProjects(data.projects || [])

        // Apply initial filtering and sorting
        applyFiltersAndSort(data.projects || [])
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err instanceof Error ? err.message : "Failed to load projects")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [activeTab])

  // Apply filters and sorting
  const applyFiltersAndSort = useCallback(
    (projectsToFilter: Project[]) => {
      let results = [...projectsToFilter]

      // Apply search query
      if (searchQuery) {
        results = results.filter(
          (project) =>
            (project.name && project.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.location && project.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      }

      // Apply tab filtering
      if (activeTab !== "all") {
        results = results.filter((project) => {
          if (activeTab === "sale") return project.priceType === "sale" || project.type === "sale"
          if (activeTab === "rent") return project.priceType === "rent" || project.type === "rent"
          if (activeTab === "new") return project.priceType === "new_project" || project.isNew
          return true
        })
      }

      // Apply sorting
      if (sortOption === "price-asc") {
        results.sort((a, b) => {
          const priceA = Number.parseFloat((a.price || "0").toString().replace(/[^0-9.-]+/g, ""))
          const priceB = Number.parseFloat((b.price || "0").toString().replace(/[^0-9.-]+/g, ""))
          return priceA - priceB
        })
      } else if (sortOption === "price-desc") {
        results.sort((a, b) => {
          const priceA = Number.parseFloat((a.price || "0").toString().replace(/[^0-9.-]+/g, ""))
          const priceB = Number.parseFloat((b.price || "0").toString().replace(/[^0-9.-]+/g, ""))
          return priceB - priceA
        })
      } else if (sortOption === "newest") {
        results.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
      }

      setFilteredProjects(results)
    },
    [searchQuery, activeTab, sortOption],
  )

  // Update filtered projects when projects, search query, active tab, or sort option changes
  useEffect(() => {
    applyFiltersAndSort(projects)
  }, [projects, searchQuery, activeTab, sortOption, applyFiltersAndSort])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    applyFiltersAndSort(projects)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Handle sort option change
  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  // Handle view mode change
  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode)
  }

  // Toggle advanced filters
  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-b from-black to-black/90 pt-64 pb-12">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Properties in Marrakech</h1>
                <p className="text-white/70">
                  {isLoading ? "Loading properties..." : `Showing ${filteredProjects.length} properties`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile filters button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden text-white border border-white/20 bg-white/10 backdrop-blur-sm"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                    <div className="py-6">
                      <h2 className="text-xl font-bold mb-6">Search Filters</h2>
                      <PropertyFilters />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by location, property name, or keyword..."
                className="pl-12 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl backdrop-blur-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>

            {/* Property type tabs */}
            <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="bg-white/10 border border-white/20 backdrop-blur-sm">
                <TabsTrigger
                  value="all"
                  className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  All Properties
                </TabsTrigger>
                <TabsTrigger
                  value="sale"
                  className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  For Sale
                </TabsTrigger>
                <TabsTrigger
                  value="rent"
                  className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  For Rent
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  New Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-gray-500 text-lg">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div className="space-y-8">
                {/* Sort controls */}
                <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="text-sm text-gray-500">
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading...
                      </div>
                    ) : (
                      `${filteredProjects.length} properties found`
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <Select value={sortOption} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[180px] border-gray-300">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="price-asc">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Compact Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-medium">Search Filters</h3>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Quick search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Keyword search..."
                        className="pl-10 border-gray-300 focus:border-primary"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>

                    {/* Price range */}
                    <Select>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Price Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Price</SelectItem>
                        <SelectItem value="0-1000000">Up to 1,000,000 MAD</SelectItem>
                        <SelectItem value="1000000-3000000">1,000,000 - 3,000,000 MAD</SelectItem>
                        <SelectItem value="3000000-5000000">3,000,000 - 5,000,000 MAD</SelectItem>
                        <SelectItem value="5000000-10000000">5,000,000 - 10,000,000 MAD</SelectItem>
                        <SelectItem value="10000000+">10,000,000+ MAD</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Property type */}
                    <Select>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Type</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Expandable filter section */}
                  <div className="px-4 pb-4">
                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={toggleAdvancedFilters}>
                      {showAdvancedFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
                      <ChevronDown
                        className={`h-4 w-4 ml-1 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </div>

                  {/* Advanced filters */}
                  {showAdvancedFilters && (
                    <div className="p-4 pt-0 border-t border-gray-100">
                      <PropertyFilters />
                    </div>
                  )}
                </div>

                {/* Properties Grid */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <PropertyGrid
                    viewMode={viewMode}
                    properties={filteredProjects}
                    isLoading={isLoading}
                    onViewModeChange={handleViewModeChange}
                  />
                </div>
              </div>

              {/* Map */}
              {showMap && (
                <div className="hidden lg:block">
                  <div className="sticky top-[120px] h-[calc(100vh-140px)] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <PropertyMap properties={filteredProjects} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Map on mobile */}
          {showMap && !error && (
            <div className="mt-8 lg:hidden">
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <PropertyMap properties={filteredProjects} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
