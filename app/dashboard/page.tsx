"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardNav } from "@/components/dashboard/nav"
import { DashboardStats } from "@/components/dashboard/stats"
import { Loader2 } from "lucide-react"
import { ProjectsList } from "@/components/dashboard/projects-list"
import { UsersList } from "@/components/dashboard/users-list"
import { DashboardCharts } from "@/components/dashboard/charts"
import { ContractGenerator } from "@/components/dashboard/contract-generator"
import { SubscribersList } from "@/components/dashboard/subscribers-list"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      setActiveSection(section)
    }
  }, [searchParams])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || userRole !== "admin") {
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

  const renderContent = () => {
    try {
      switch (activeSection) {
        case "projects":
          return <ProjectsList />
        case "users":
          return <UsersList />
        case "subscribers":
          return <SubscribersList />
        case "contracts":
          return <ContractGenerator />
        case "overview":
        default:
          return <DashboardCharts />
      }
    } catch (error) {
      console.error(`Error rendering section ${activeSection}:`, error)
      return (
        <div className="p-6 text-center">
          <p className="text-red-500">There was an error loading this section. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reload Page
          </Button>
        </div>
      )
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNav activeSection={activeSection} />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-4 md:p-6 overflow-auto h-[calc(100vh-64px)]">
          <DashboardStats />
          <div className="mt-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
