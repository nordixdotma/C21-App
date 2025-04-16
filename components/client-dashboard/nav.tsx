"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, Calendar, FileText, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClientDashboardNavProps {
  activeSection?: string
  className?: string
  isMobile?: boolean
  onNavItemClick?: () => void
}

const navigation = [
  {
    name: "Overview",
    href: "/client-dashboard?section=overview",
    icon: Home,
    section: "overview",
  },
  {
    name: "My Properties",
    href: "/client-dashboard?section=properties",
    icon: Building2,
    section: "properties",
  },
  {
    name: "Appointments",
    href: "/client-dashboard?section=appointments",
    icon: Calendar,
    section: "appointments",
  },
  {
    name: "Property Reports",
    href: "/client-dashboard?section=reports",
    icon: FileText,
    section: "reports",
  },
]

export function ClientDashboardNav({
  activeSection = "overview",
  className,
  isMobile = false,
  onNavItemClick,
}: ClientDashboardNavProps) {
  return (
    <div className={cn("w-64 border-r bg-white h-screen", isMobile ? "w-full border-r-0" : "w-64", className)}>
      <div className="flex h-full flex-col">
        <div className="border-b px-6 py-4">
          <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={120} height={60} className="w-32" />
        </div>

        <div className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavItemClick}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                activeSection === item.section ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-oakes">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
