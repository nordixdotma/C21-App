"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Trash2, Edit, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface Project {
  project_id: number
  title: string
  description: string
  price: string
  status: string
  address: string
  city: string
  image: string
  images: string[]
  features: string[]
  owner_first_name: string
  owner_last_name: string
  created_at: string
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/projects")

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      `${project.address} ${project.city}`.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAddProject = () => {
    router.push("/dashboard/add-project")
  }

  const handleEditProject = (id: number) => {
    router.push(`/dashboard/edit-project/${id}`)
  }

  const handleDeleteProject = async (id: number) => {
    const projectToDelete = projects.find((project) => project.project_id === id)
    if (window.confirm(`Are you sure you want to delete "${projectToDelete?.title}"?`)) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete project")
        }

        toast({
          title: "Project deleted",
          description: `"${projectToDelete?.title}" has been removed.`,
        })

        // Refresh the projects list
        fetchProjects()
      } catch (error) {
        console.error("Error deleting project:", error)
        toast({
          title: "Error",
          description: "Failed to delete project. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleViewProject = (id: number) => {
    router.push(`/project/${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "For Sale":
        return <Badge className="bg-green-500">For Sale</Badge>
      case "For Rent":
        return <Badge className="bg-blue-500">For Rent</Badge>
      case "Sold":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Sold
          </Badge>
        )
      case "Rented":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Rented
          </Badge>
        )
      case "Under Contract":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Under Contract
          </Badge>
        )
      default:
        return <Badge variant="outline">Off Market</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-typold text-xl md:text-2xl font-semibold">Property Management</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={handleAddProject}>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="md:hidden space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.project_id} className="rounded-xl border bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        src={project.image || "/placeholder.svg?height=48&width=48"}
                        alt={project.title}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{project.title}</h3>
                      <p className="text-xs text-gray-600">{`${project.address}, ${project.city}`}</p>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <p className="text-gray-500">Owner</p>
                      <p>{`${project.owner_first_name} ${project.owner_last_name}`}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Added</p>
                      <p>{new Date(project.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium">{project.price} MAD</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 border-t pt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewProject(project.project_id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProject(project.project_id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProject(project.project_id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
                No properties found matching your search criteria
              </div>
            )}
          </div>

          {/* Desktop table view */}
          <div className="hidden md:block rounded-xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50/50">
                    <th className="px-4 py-3 text-left font-typold text-sm">Property</th>
                    <th className="px-4 py-3 text-left font-typold text-sm">Location</th>
                    <th className="px-4 py-3 text-left font-typold text-sm">Owner</th>
                    <th className="px-4 py-3 text-left font-typold text-sm">Added</th>
                    <th className="px-4 py-3 text-left font-typold text-sm">Price</th>
                    <th className="px-4 py-3 text-left font-typold text-sm">Status</th>
                    <th className="px-4 py-3 text-left font-typold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-oakes">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <tr key={project.project_id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={project.image || "/placeholder.svg?height=40&width=40"}
                                alt={project.title}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{project.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{`${project.address}, ${project.city}`}</td>
                        <td className="px-4 py-3 text-gray-600">{`${project.owner_first_name} ${project.owner_last_name}`}</td>
                        <td className="px-4 py-3 text-gray-600">{new Date(project.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 font-medium">{project.price} MAD</td>
                        <td className="px-4 py-3">{getStatusBadge(project.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewProject(project.project_id)}
                              className="text-blue-500 hover:text-blue-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditProject(project.project_id)}
                              className="text-blue-500 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProject(project.project_id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No properties found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
