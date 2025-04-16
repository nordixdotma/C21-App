"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Trash2, Edit, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

// Mock data for projects
const initialProjects = []

export function ProjectsList() {
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem("projects")
      return savedProjects ? JSON.parse(savedProjects) : initialProjects
    } catch (error) {
      console.error("Error loading projects from localStorage:", error)
      return initialProjects
    }
  })
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    try {
      localStorage.setItem("projects", JSON.stringify(projects))
    } catch (error) {
      console.error("Error saving projects to localStorage:", error)
    }
  }, [projects])

  console.log("Projects loaded:", projects)

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAddProject = () => {
    router.push("/dashboard/add-project")
  }

  const handleEditProject = (id: number) => {
    router.push(`/dashboard/edit-project/${id}`)
  }

  const handleDeleteProject = (id: number) => {
    const projectToDelete = projects.find((project) => project.id === id)
    if (window.confirm(`Are you sure you want to delete "${projectToDelete?.name}"?`)) {
      const updatedProjects = projects.filter((project) => project.id !== id)
      setProjects(updatedProjects)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
      toast({
        title: "Project deleted",
        description: `"${projectToDelete?.name}" has been removed.`,
        variant: "destructive",
      })
    }
  }

  const handleViewProject = (id: number) => {
    router.push(`/project/${id}`)
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

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{project.name}</h3>
                  <p className="text-xs text-gray-600">{project.location}</p>
                </div>
                <Badge
                  variant={project.status === "active" ? "default" : "outline"}
                  className={project.status === "active" ? "bg-green-500" : ""}
                >
                  {project.status === "active" ? "Active" : "Pending"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <p className="text-gray-500">Developer</p>
                  <p>{project.developer}</p>
                </div>
                <div>
                  <p className="text-gray-500">Handover</p>
                  <p>{project.handover}</p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium">{project.price}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewProject(project.id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditProject(project.id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
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
                <th className="px-4 py-3 text-left font-typold text-sm">Developer</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Handover</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Price</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Status</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="font-oakes">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{project.location}</td>
                    <td className="px-4 py-3 text-gray-600">{project.developer}</td>
                    <td className="px-4 py-3 text-gray-600">{project.handover}</td>
                    <td className="px-4 py-3 font-medium">{project.price}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={project.status === "active" ? "default" : "outline"}
                        className={project.status === "active" ? "bg-green-500" : ""}
                      >
                        {project.status === "active" ? "Active" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProject(project.id)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project.id)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
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
    </div>
  )
}
