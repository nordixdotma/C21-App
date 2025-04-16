"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface User {
  user_id: string
  first_name: string
  last_name: string
  email: string
  role: string
  profile_image?: string
  phone?: string
}

interface BasicInfoProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
}

export function BasicInfo({ data, updateData, onNext }: BasicInfoProps) {
  const router = useRouter()
  const [clients, setClients] = useState<User[]>([])
  const [agents, setAgents] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)

        // Fetch clients
        const clientsResponse = await fetch("/api/users?role=client")
        if (!clientsResponse.ok) {
          throw new Error("Failed to fetch clients")
        }
        const clientsData = await clientsResponse.json()
        setClients(clientsData)

        // Fetch agents
        const agentsResponse = await fetch("/api/users?role=agent")
        if (!agentsResponse.ok) {
          throw new Error("Failed to fetch agents")
        }
        const agentsData = await agentsResponse.json()
        setAgents(agentsData)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!data.title) {
      return
    }

    if (!data.ownerId) {
      return
    }

    if (!data.assignedAgents || data.assignedAgents.length === 0) {
      return
    }

    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="">
            Property Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            required
            className="border border-gray-300"
          />
        </div>

        <div>
          <Label htmlFor="description" className="">
            Description
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            rows={4}
            className="border border-gray-300"
          />
        </div>

        <div>
          <Label htmlFor="owner" className="">
            Property Owner <span className="text-red-500">*</span>
          </Label>
          {isLoading ? (
            <div className="flex items-center space-x-2 mt-2">
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
              <span className="text-sm text-gray-500">Loading clients...</span>
            </div>
          ) : clients.length === 0 ? (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No clients found. Please add clients in the User Management section first.
              </AlertDescription>
            </Alert>
          ) : (
            <Select value={data.ownerId} onValueChange={(value) => updateData({ ownerId: value })} required>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Select property owner" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                {clients.map((client) => (
                  <SelectItem key={client.user_id} value={client.user_id.toString()}>
                    {client.first_name} {client.last_name} ({client.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <Label htmlFor="agents" className="">
            Assign Agents <span className="text-red-500">*</span>
          </Label>
          {isLoading ? (
            <div className="flex items-center space-x-2 mt-2">
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
              <span className="text-sm text-gray-500">Loading agents...</span>
            </div>
          ) : agents.length === 0 ? (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No agents found. Please add agents in the User Management section first.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3 mt-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-3">
              {agents.map((agent) => (
                <div key={agent.user_id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                  <input
                    type="checkbox"
                    id={`agent-${agent.user_id}`}
                    checked={data.assignedAgents?.includes(agent.user_id.toString())}
                    onChange={(e) => {
                      const currentAgents = data.assignedAgents || []
                      const updatedAgents = e.target.checked
                        ? [...currentAgents, agent.user_id.toString()]
                        : currentAgents.filter((id: string) => id !== agent.user_id.toString())
                      updateData({ assignedAgents: updatedAgents })
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`agent-${agent.user_id}`} className="flex flex-1 cursor-pointer items-center">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full mr-3">
                      <img
                        src={agent.profile_image || "/placeholder.svg?height=40&width=40"}
                        alt={`${agent.first_name} ${agent.last_name}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        {agent.first_name} {agent.last_name}
                      </p>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
          {data.assignedAgents?.length === 0 && agents.length > 0 && (
            <p className="text-sm text-red-500 mt-1">Please select at least one agent</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type" className="">
              Type
            </Label>
            <Select value={data.type} onValueChange={(value) => updateData({ type: value })}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="">
              Status
            </Label>
            <Select value={data.status} onValueChange={(value) => updateData({ status: value })}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300">
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="">Price Type</Label>
          <RadioGroup
            value={data.priceType}
            onValueChange={(value) => updateData({ priceType: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="sale" />
              <Label htmlFor="sale" className="">
                Sale
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rent" id="rent" />
              <Label htmlFor="rent" className="">
                Rent
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new_project" id="new_project" />
              <Label htmlFor="new_project" className="">
                New Project
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="price" className="">
            {data.priceType === "sale" ? "Sale Price" : data.priceType === "rent" ? "Rent Price" : "Starting Price"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            value={data.price}
            onChange={(e) => updateData({ price: e.target.value })}
            placeholder={`Enter ${data.priceType === "new_project" ? "starting" : data.priceType} price`}
            required
            className="border border-gray-300"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.back()}
          className="border-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Next
        </Button>
      </div>
    </form>
  )
}
