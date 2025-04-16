"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import type { ReactNode } from "react"

interface AgentDashboardHeaderProps {
  username: string
  children?: ReactNode
}

export function AgentDashboardHeader({ username, children }: AgentDashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("userEmail")
    router.push("/client-login")
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {children}
          <h1 className="font-typold text-lg md:text-xl font-semibold">Agent Portal</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-gray-500">Real Estate Agent</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
