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
import { verifyToken } from "@/lib/auth"

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
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/client-login")
      return
    }

    try {
      const user = verifyToken(token)

      if (!user) {
        localStorage.removeItem("token")
        router.push("/client-login")
        return
      }

      if (user.role !== "client") {
        router.push("/agent-dashboard")
        return
      }

      setUserData({
        id: user.id,
        name: user.name || user.username,
        username: user.username,
        email: user.email,
        role: user.role,
      })

      setTimeout(() => setIsLoading(false), 500)
    } catch (error) {
      console.error("Error verifying token:", error)
      localStorage.removeItem("token")
      router.push("/client-login")
    }
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
