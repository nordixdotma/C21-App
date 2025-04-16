"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ClientDashboardNav } from "@/components/client-dashboard/nav"
import { ClientDashboardHeader } from "@/components/client-dashboard/header"
import { ClientDashboardOverview } from "@/components/client-dashboard/overview"
import { ClientProperties } from "@/components/client-dashboard/properties"
import { ClientAppointments } from "@/components/client-dashboard/appointments"
import { ClientReports } from "@/components/client-dashboard/reports"
import { Loader2 } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function ClientDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    role: "",
  })

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

    if (userRole === "agent") {
      router.push("/agent-dashboard")
      return
    }

    setUserData({
      id: userId || "",
      name: username || "",
      username: username || "",
      email: userEmail || "",
      role: userRole || "client",
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
      case "properties":
        return <ClientProperties />
      case "appointments":
        return <ClientAppointments />
      case "reports":
        return <ClientReports />
      case "overview":
      default:
        return <ClientDashboardOverview username={userData.name} />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <ClientDashboardNav activeSection={activeSection} className="hidden lg:block" />

      {/* Mobile sidebar */}
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent side="left" className="p-0 w-[240px]">
          <ClientDashboardNav
            activeSection={activeSection}
            isMobile={true}
            onNavItemClick={() => setIsMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1">
        <ClientDashboardHeader username={userData.name} onMenuClick={() => setIsMobileNavOpen(true)} />
        <main className="p-4 md:p-6 overflow-auto h-[calc(100vh-64px)]">{renderContent()}</main>
      </div>
    </div>
  )
}
