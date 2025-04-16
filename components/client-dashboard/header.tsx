"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

interface ClientDashboardHeaderProps {
  username: string
  onMenuClick?: () => void
}

export function ClientDashboardHeader({ username, onMenuClick }: ClientDashboardHeaderProps) {
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
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg md:text-xl font-semibold">Client Dashboard</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={username} />
            <AvatarFallback>{avatarInitial}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{username}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 md:p-3"
          size="icon"
        >
          <LogOut className="h-4 w-4 md:mr-2" />
          <span className="sr-only md:not-sr-only md:inline-block">Logout</span>
        </Button>
      </div>
    </header>
  )
}
