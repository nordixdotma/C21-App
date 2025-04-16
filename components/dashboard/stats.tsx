"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, FileText, Activity } from "lucide-react"

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalSubscribers: 0,
    totalViews: 0,
  })

  useEffect(() => {
    // Get users data
    const savedUsers = localStorage.getItem("users")
    let userCount = 0
    if (savedUsers) {
      const users = JSON.parse(savedUsers)
      userCount = users.length
    }

    // Get properties data
    const savedProjects = localStorage.getItem("projects")
    let projectCount = 0
    if (savedProjects) {
      const projects = JSON.parse(savedProjects)
      projectCount = projects.length
    }

    // Get subscribers data
    const savedSubscribers = localStorage.getItem("subscribers")
    let subscriberCount = 0
    if (savedSubscribers) {
      const subscribers = JSON.parse(savedSubscribers)
      subscriberCount = subscribers.length
    }

    // Get view data
    const savedViews = localStorage.getItem("propertyViews")
    let viewCount = 0
    if (savedViews) {
      const views = JSON.parse(savedViews)
      // Sum all views
      viewCount = Object.values(views).reduce((sum, projectViews) => {
        return sum + Object.values(projectViews).reduce((total, count) => total + count, 0)
      }, 0)
    }

    setStats({
      totalUsers: userCount,
      totalProperties: projectCount,
      totalSubscribers: subscriberCount,
      totalViews: viewCount,
    })
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">Registered users in the system</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProperties}</div>
          <p className="text-xs text-muted-foreground">Properties listed on the platform</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
          <p className="text-xs text-muted-foreground">Subscribers to the newsletter</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Property Views</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalViews}</div>
          <p className="text-xs text-muted-foreground">Property page views</p>
        </CardContent>
      </Card>
    </div>
  )
}
