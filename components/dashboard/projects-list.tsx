"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Trash2, Edit } from "lucide-react"
import { featuredProjects } from "@/lib/constants"
import type { Project } from "@/types"

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>(featuredProjects)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-typold text-2xl font-semibold">Projects</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/dashboard/add-project")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50/50">
                <th className="px-4 py-3 text-left font-typold text-sm">Project</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Location</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Price</th>
                <th className="px-4 py-3 text-left font-typold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="font-oakes">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        width={64}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <span className="font-medium">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{project.location}</td>
                  <td className="px-4 py-3 text-gray-600">{project.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => router.push(`/dashboard/edit-project/${project.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

