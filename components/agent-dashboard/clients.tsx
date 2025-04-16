"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Phone, Mail, Home, FileText, Users } from "lucide-react"
import Link from "next/link"

export function AgentClients() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clientsData, setClientsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const agentId = localStorage.getItem("userId")

    // Get users data
    const savedUsers = localStorage.getItem("users")
    const savedProjects = localStorage.getItem("projects")

    if (savedUsers && savedProjects && agentId) {
      const allUsers = JSON.parse(savedUsers)
      const allProjects = JSON.parse(savedProjects)

      // Get projects assigned to this agent
      const agentProjects = allProjects.filter(
        (project) => project.assignedAgents && project.assignedAgents.includes(agentId),
      )

      // Get unique client IDs from these projects
      const clientIds = [...new Set(agentProjects.map((project) => project.ownerId))]

      // Get client details
      const clients = allUsers
        .filter((user) => user.role === "client" && clientIds.includes(user.id))
        .map((client) => {
          // Count properties for this client that are assigned to this agent
          const clientProperties = agentProjects.filter((project) => project.ownerId === client.id)

          return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone || "+212 6XX XXX XXX",
            properties: clientProperties.length,
            lastContact: ["Today", "Yesterday", "2 days ago", "1 week ago"][Math.floor(Math.random() * 4)],
            status: "active",
          }
        })

      setClientsData(clients)
    }

    setIsLoading(false)
  }, [])

  const filteredClients = clientsData.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (clientsData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No clients found</h3>
          <p className="text-gray-500">You don't have any clients assigned to you yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{client.name}</h3>
                  <Badge className={client.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                    {client.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Home className="h-4 w-4" />
                  <span>{client.properties} properties</span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Last contact: {client.lastContact}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                    <Link href={`/agent-dashboard?section=reports&clientId=${client.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Create Report
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
