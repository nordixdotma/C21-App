"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, User, Search, Check, X } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function AgentAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [appointmentsData, setAppointmentsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load agent ID
    const agentId = localStorage.getItem("userId")

    // Load projects and users from localStorage
    const savedProjects = localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : []
    const savedUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []

    // Generate appointments based on projects assigned to this agent
    if (agentId && savedProjects.length > 0 && savedUsers.length > 0) {
      const agentProjects = savedProjects.filter((project) => project.agentId === agentId)

      // Find client users
      const clientUsers = savedUsers.filter((user) => user.role === "client")

      // Generate appointments if we have projects and clients
      if (agentProjects.length > 0 && clientUsers.length > 0) {
        const generatedAppointments = agentProjects.map((project, index) => {
          // Get a client for this project
          const client = clientUsers[index % clientUsers.length]

          // Generate a date in the near future
          const appointmentDate = new Date()
          appointmentDate.setDate(appointmentDate.getDate() + (index + 1) * 2) // Every 2 days
          appointmentDate.setHours(9 + (index % 8), 0, 0) // Between 9 AM and 5 PM

          return {
            id: `app-${index + 1}`,
            clientName: client.name || client.username,
            propertyName: project.name || project.title,
            propertyAddress: `${project.address || ""}, ${project.city || "Marrakech"}`,
            date: appointmentDate,
            status: index % 3 === 0 ? "completed" : "upcoming",
          }
        })

        setAppointmentsData(generatedAppointments)
      }
    }

    setIsLoading(false)
  }, [])

  // Filter appointments by date and search query
  const filteredAppointments = appointmentsData.filter((appointment) => {
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.propertyName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDate = date
      ? appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear()
      : true

    return matchesSearch && matchesDate
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (appointmentsData.length === 0) {
    return (
      <div>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No appointments found</h3>
            <p className="text-gray-500">You don't have any appointments scheduled</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No appointments found for the selected date.</p>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base md:text-lg">{appointment.propertyName}</CardTitle>
                    <Badge
                      className={
                        appointment.status === "upcoming"
                          ? "bg-blue-500"
                          : appointment.status === "completed"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Client: {appointment.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{appointment.propertyAddress}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{format(appointment.date, "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{format(appointment.date, "h:mm a")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-end gap-2">
                    {appointment.status === "upcoming" && (
                      <>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button size="sm" className="w-full sm:w-auto">
                          <Check className="mr-2 h-4 w-4" />
                          Complete
                        </Button>
                      </>
                    )}
                    {appointment.status === "completed" && (
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Create Report
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
