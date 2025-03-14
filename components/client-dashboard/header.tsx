"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function ClientDashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <h2 className="font-typold text-lg font-semibold">Client Dashboard</h2>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

