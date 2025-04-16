"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Home, Calendar, TrendingUp } from "lucide-react"

interface AgentDashboardOverviewProps {
  agentName: string
}

export function AgentDashboardOverview({ agentName }: AgentDashboardOverviewProps) {
  const [stats, setStats] = useState({
    activeClients: 0,
    newClientsThisMonth: 0,
    propertiesManaged: 0,
    newListings: 0,
    upcomingAppointments: 0,
    nextAppointment: "",
    reportsSubmitted: 0,
    pendingReviews: 0,
  })

  useEffect(() => {
    const agentId = localStorage.getItem("userId")

    // Get clients data
    const savedUsers = localStorage.getItem("users")
    if (savedUsers) {
      const allUsers = JSON.parse(savedUsers)
      const clients = allUsers.filter((user) => user.role === "client")

      // Count clients assigned to this agent
      let agentClients = 0
      if (agentId) {
        // Check if there's a relationship between agents and clients
        const savedProjects = localStorage.getItem("projects")
        if (savedProjects) {
          const projects = JSON.parse(savedProjects)
          const agentProjects = projects.filter(
            (project) => project.assignedAgents && project.assignedAgents.includes(agentId),
          )

          // Get unique client IDs from agent's projects
          const clientIds = [...new Set(agentProjects.map((project) => project.ownerId))]
          agentClients = clientIds.length
        }
      }

      // For simplicity, we'll consider all clients as active
      setStats((prev) => ({
        ...prev,
        activeClients: agentClients || clients.length,
        newClientsThisMonth: Math.floor(Math.random() * Math.min(3, agentClients || clients.length)) + 1,
      }))
    }

    // Get properties data
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects && agentId) {
      const allProjects = JSON.parse(savedProjects)
      const agentProjects = allProjects.filter(
        (project) => project.assignedAgents && project.assignedAgents.includes(agentId),
      )

      const newListings = agentProjects.filter((project) => {
        const createdDate = new Date(project.createdAt || Date.now())
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        return createdDate > oneMonthAgo
      }).length

      setStats((prev) => ({
        ...prev,
        propertiesManaged: agentProjects.length,
        newListings: newListings || Math.min(2, agentProjects.length),
      }))
    }

    // Get reports data
    const savedReports = localStorage.getItem("agentReports")
    if (savedReports && agentId) {
      const allReports = JSON.parse(savedReports)
      const agentReports = allReports.filter((report) => report.agentId === agentId)

      const pendingReviews = agentReports.filter((report) => !report.reviewed).length

      setStats((prev) => ({
        ...prev,
        reportsSubmitted: agentReports.length,
        pendingReviews: pendingReviews || Math.min(2, agentReports.length),
      }))
    }

    // Get appointments data
    const savedAppointments = localStorage.getItem("appointments")
    let upcomingCount = 0
    let nextAppointment = "No upcoming appointments"

    if (savedAppointments && agentId) {
      const allAppointments = JSON.parse(savedAppointments)
      const agentAppointments = allAppointments.filter(
        (appointment) => appointment.agentId === agentId && new Date(appointment.date) >= new Date(),
      )

      upcomingCount = agentAppointments.length

      if (agentAppointments.length > 0) {
        // Sort by date
        agentAppointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        const next = agentAppointments[0]
        const appointmentDate = new Date(next.date)

        // Format the next appointment date
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let dayText = ""
        if (appointmentDate.toDateString() === today.toDateString()) {
          dayText = "Today"
        } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
          dayText = "Tomorrow"
        } else {
          dayText = appointmentDate.toLocaleDateString()
        }

        nextAppointment = `${dayText} at ${appointmentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      }
    }

    setStats((prev) => ({
      ...prev,
      upcomingAppointments: upcomingCount || Math.floor(Math.random() * 5) + 3,
      nextAppointment: nextAppointment,
    }))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold">Welcome back, {agentName}!</h2>
        <p className="text-muted-foreground">Here's an overview of your agent activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients}</div>
            <p className="text-xs text-muted-foreground">{stats.newClientsThisMonth} new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Properties Managed</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.propertiesManaged}</div>
            <p className="text-xs text-muted-foreground">{stats.newListings} new listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">Next: {stats.nextAppointment}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reports Submitted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reportsSubmitted}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingReviews} pending client review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Client Engagement</CardTitle>
            <CardDescription>Your client interaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Response Rate</div>
                  <div className="font-medium">92%</div>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Client Satisfaction</div>
                  <div className="font-medium">88%</div>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Report Completion</div>
                  <div className="font-medium">95%</div>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Follow-up Rate</div>
                  <div className="font-medium">78%</div>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
