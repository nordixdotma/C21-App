"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyFilters } from "@/components/search/property-filters"
import { PropertyMap } from "@/components/search/property-map"
import { PropertyGrid } from "@/components/search/property-grid"
import { PropertyProvider } from "@/components/search/property-context"
import { featuredProjects } from "@/lib/constants"
import { Layout, List, MapPin, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <PropertyProvider properties={featuredProjects}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-gradient-to-b from-black to-black/90 pt-32 pb-12">
            <div className="container mx-auto px-4">
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Properties in Marrakech</h1>
                  <p className="text-white/70">Showing {featuredProjects.length} properties</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`h-8 w-8 p-0 ${viewMode === "grid" ? "" : "text-white hover:text-white/80"}`}
                    >
                      <Layout className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`h-8 w-8 p-0 ${viewMode === "list" ? "" : "text-white hover:text-white/80"}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMap(!showMap)}
                    className="hidden md:inline-flex text-white border border-white/20 bg-white/10 backdrop-blur-sm"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {showMap ? "Hide Map" : "Show Map"}
                  </Button>

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

              {/* Property type tabs */}
              <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
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
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div className="space-y-8">
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <PropertyFilters />
                </div>

                {/* Properties Grid */}
                <PropertyGrid viewMode={viewMode} properties={featuredProjects} />
              </div>

              {/* Map */}
              {showMap && (
                <div className="hidden lg:block">
                  <div className="sticky top-[120px] h-[calc(100vh-140px)] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <PropertyMap properties={featuredProjects} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PropertyProvider>
  )
}

