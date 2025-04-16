"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MousePointerClick } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

export function ClientProperties() {
  const [clientProperties, setClientProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const savedProjects = localStorage.getItem("projects")

    if (savedProjects && userId) {
      const allProjects = JSON.parse(savedProjects)
      // Filter projects where the current user is the owner
      const userProperties = allProjects.filter((project) => project.ownerId === userId)

      // Generate realistic metrics for each property
      const formattedProperties = userProperties.map((project) => {
        // Generate view count based on when the property was added (assume newer properties have fewer views)
        const daysSinceAdded = project.createdAt
          ? Math.floor((new Date() - new Date(project.createdAt)) / (1000 * 60 * 60 * 24))
          : Math.floor(Math.random() * 30) + 1

        // More days = more views, with some randomness
        const views = Math.floor(daysSinceAdded * 5 + Math.random() * 20)

        // Contact clicks are typically 10-20% of views
        const contactClicks = Math.floor(views * (0.1 + Math.random() * 0.1))

        // Generate a realistic "last visit" timestamp
        const lastVisitDays = Math.floor(Math.random() * 14) + 1
        const lastVisit =
          lastVisitDays === 1
            ? "1 day ago"
            : lastVisitDays <= 7
              ? `${lastVisitDays} days ago`
              : `${Math.floor(lastVisitDays / 7)} week${Math.floor(lastVisitDays / 7) > 1 ? "s" : ""} ago`

        return {
          id: project.id,
          name: project.name || project.title,
          image: project.image || project.images?.[0] || "/placeholder.svg?height=300&width=400",
          location: project.location || `${project.address || ""}, ${project.city || ""}`,
          price: `${project.price || 0} MAD`,
          status: project.status === "available" ? "active" : "pending",
          views,
          contactClicks,
          lastVisit,
        }
      })

      setClientProperties(formattedProperties)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (clientProperties.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="font-typold text-xl md:text-2xl font-semibold mb-4 md:mb-6">My Properties</h2>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="h-12 w-12 text-gray-300 mx-auto mb-3">🏠</div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No properties found</h3>
          <p className="text-gray-500">You don't have any properties assigned to you yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-typold text-xl md:text-2xl font-semibold mb-4 md:mb-6">My Properties</h2>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
              <Badge
                className={`absolute top-2 right-2 ${property.status === "active" ? "bg-green-500" : "bg-amber-500"}`}
              >
                {property.status === "active" ? "Active" : "Pending"}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">{property.name}</CardTitle>
              <p className="text-xs md:text-sm text-gray-500">{property.location}</p>
              <p className="font-semibold text-primary text-sm md:text-base">{property.price}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-xs md:text-sm">Views</span>
                  </div>
                  <span className="text-xs md:text-sm font-medium">{property.views}</span>
                </div>
                <Progress value={(property.views / 200) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="h-4 w-4 text-gray-400" />
                    <span className="text-xs md:text-sm">Contact Clicks</span>
                  </div>
                  <span className="text-xs md:text-sm font-medium">{property.contactClicks}</span>
                </div>
                <Progress value={(property.contactClicks / 50) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-500">Last visit:</span>
                  <span className="text-xs md:text-sm">{property.lastVisit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
