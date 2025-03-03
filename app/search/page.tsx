"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyFilters } from "@/components/search/property-filters"
import { PropertyMap } from "@/components/search/property-map"
import { PropertyGrid } from "@/components/search/property-grid"
import { PropertyProvider } from "@/components/search/property-context"
import { featuredProjects } from "@/lib/constants"
import { Layout, List } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = useState(true)

  return (
    <PropertyProvider properties={featuredProjects}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-black pt-32 pb-12">
            <div className="container mx-auto px-4">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Search Results</h1>
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
                    {showMap ? "Hide Map" : "Show Map"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-16">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div className="space-y-6">
                <PropertyFilters />
                <PropertyGrid viewMode={viewMode} properties={featuredProjects} />
              </div>
              {showMap && (
                <div className="sticky top-[120px] hidden h-[calc(100vh-140px)] w-[400px] lg:block">
                  <PropertyMap properties={featuredProjects} />
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

