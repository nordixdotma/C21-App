"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, FileText, Home, LogOut, Mail, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"

interface DashboardNavProps {
  activeSection?: string
  isMobile?: boolean
}

export function DashboardNav({ activeSection = "overview", isMobile = false }: DashboardNavProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  const navItems = [
    {
      name: "Overview",
      href: "/dashboard?section=overview",
      icon: BarChart3,
      section: "overview",
    },
    {
      name: "Properties",
      href: "/dashboard?section=projects",
      icon: Home,
      section: "projects",
    },
    {
      name: "Users",
      href: "/dashboard?section=users",
      icon: Users,
      section: "users",
    },
    {
      name: "Subscribers",
      href: "/dashboard?section=subscribers",
      icon: Mail,
      section: "subscribers",
    },
    {
      name: "Contracts",
      href: "/dashboard?section=contracts",
      icon: FileText,
      section: "contracts",
    },
  ]

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => {
    const LinkComponent = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium",
          activeSection === item.section
            ? "bg-primary text-white"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        )}
      >
        <item.icon className="mr-3 h-5 w-5" />
        {item.name}
      </Link>
    )

    return isMobile ? <SheetClose asChild>{LinkComponent}</SheetClose> : LinkComponent
  }

  return (
    <div
      className={cn("flex flex-col bg-white", isMobile ? "h-full w-full" : "hidden w-64 h-screen shadow-sm md:flex")}
    >
      <div className="flex h-16 items-center border-b px-6">
        {isMobile ? (
          <div className="flex w-full items-center justify-between">
            <span className="font-typold text-xl font-bold text-primary">CENTURY 21</span>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-typold text-xl font-bold text-primary">CENTURY 21</span>
          </Link>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between py-6">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
        <div className="mt-auto px-3">
          {isMobile ? (
            <SheetClose asChild>
              <button
                onClick={handleLogout}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </SheetClose>
          ) : (
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
