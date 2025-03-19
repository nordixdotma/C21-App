"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ClientDashboardNav } from "@/components/client-dashboard/nav"
import { ClientDashboardHeader } from "@/components/client-dashboard/header"
import { ClientDashboardOverview } from "@/components/client-dashboard/overview"
import { ClientProperties } from "@/components/client-dashboard/properties"
import { ClientAppointments } from "@/components/client-dashboard/appointments"
import { ClientReports } from "@/components/client-dashboard/reports"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function ClientDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [username, setUsername] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")
    const storedUsername = localStorage.getItem("username")

    if (!isAuthenticated || (userRole !== "client" && userRole !== "agent")) {
      router.push("/client-login")
    } else {
      setUsername(storedUsername || "")
    }

    setTimeout(() => setIsLoading(false), 500)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientDashboardNav />
      <div className="flex-1">
        <ClientDashboardHeader username={username} />
        <main className="p-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <ClientDashboardOverview username={username} />
            </TabsContent>
            <TabsContent value="properties" className="mt-6">
              <ClientProperties />
            </TabsContent>
            <TabsContent value="appointments" className="mt-6">
              <ClientAppointments />
            </TabsContent>
            <TabsContent value="reports" className="mt-6">
              <ClientReports />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

