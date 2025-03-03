"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <h2 className="font-typold text-lg font-semibold">Projects Dashboard</h2>
        <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}

