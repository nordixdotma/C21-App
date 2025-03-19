"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, HelpCircle, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface ClientDashboardHeaderProps {
  username: string
}

export function ClientDashboardHeader({ username }: ClientDashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("username")
    router.push("/client-login")
  }

  // Get first letter of username for avatar fallback
  const avatarInitial = username ? username.charAt(0).toUpperCase() : "U"

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Client Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt={username} />
            <AvatarFallback>{avatarInitial}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{username}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}

