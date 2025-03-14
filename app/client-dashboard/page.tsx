"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { ClientDashboardHeader } from "@/components/client-dashboard/header"
import { ClientDashboardNav } from "@/components/client-dashboard/nav"
import { ClientProperties } from "@/components/client-dashboard/properties"
import { ClientAppointments } from "@/components/client-dashboard/appointments"
import { ClientReports } from "@/components/client-dashboard/reports"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("properties")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || userRole !== "client") {
      router.push("/login")
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
        <ClientDashboardHeader />
        <main className="p-6">
          <Tabs defaultValue="properties" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="reports">Visit Reports</TabsTrigger>
            </TabsList>
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

