"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AgentDashboardNav } from "@/components/agent-dashboard/nav"
import { AgentDashboardHeader } from "@/components/agent-dashboard/header"
import { AgentDashboardOverview } from "@/components/agent-dashboard/overview"
import { AgentClients } from "@/components/agent-dashboard/clients"
import { AgentAppointments } from "@/components/agent-dashboard/appointments"
import { AgentReportCreator } from "@/components/agent-dashboard/report-creator"
import { AgentViewReports } from "@/components/agent-dashboard/view-reports"
import { Loader2, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function AgentDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    role: "",
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      setActiveSection(section)
    }
  }, [searchParams])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")
    const username = localStorage.getItem("username")
    const userId = localStorage.getItem("userId")
    const userEmail = localStorage.getItem("userEmail")

    if (!isAuthenticated) {
      router.push("/client-login")
      return
    }

    if (userRole === "client") {
      router.push("/client-dashboard")
      return
    }

    setUserData({
      id: userId || "",
      name: username || "",
      username: username || "",
      email: userEmail || "",
      role: userRole || "agent",
    })

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
    switch (activeSection) {
      case "clients":
        return <AgentClients />
      case "appointments":
        return <AgentAppointments />
      case "reports":
        return <AgentReportCreator />
      case "view-reports":
        return <AgentViewReports agentId={userData.id} />
      case "overview":
      default:
        return <AgentDashboardOverview agentName={userData.name} />
    }
  }

  const handleNavigation = (section: string) => {
    setIsMobileMenuOpen(false)
    router.push(`/agent-dashboard?section=${section}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <AgentDashboardNav activeSection={activeSection} />
      </div>

      <div className="flex-1">
        <AgentDashboardHeader username={userData.name}>
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <AgentDashboardNav activeSection={activeSection} isMobile={true} onNavigate={handleNavigation} />
            </SheetContent>
          </Sheet>
        </AgentDashboardHeader>

        <main className="p-4 md:p-6 overflow-auto h-[calc(100vh-64px)]">{renderContent()}</main>
      </div>
    </div>
  )
}
