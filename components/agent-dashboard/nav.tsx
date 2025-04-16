"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Calendar, FileText, Home, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AgentDashboardNavProps {
  activeSection?: string
  isMobile?: boolean
  onNavigate?: (section: string) => void
}

const navigation = [
  {
    name: "Overview",
    href: "/agent-dashboard?section=overview",
    icon: Home,
    section: "overview",
  },
  {
    name: "My Clients",
    href: "/agent-dashboard?section=clients",
    icon: Users,
    section: "clients",
  },
  {
    name: "Appointments",
    href: "/agent-dashboard?section=appointments",
    icon: Calendar,
    section: "appointments",
  },
  {
    name: "Create Reports",
    href: "/agent-dashboard?section=reports",
    icon: FileText,
    section: "reports",
  },
  {
    name: "View Reports",
    href: "/agent-dashboard?section=view-reports",
    icon: ClipboardList,
    section: "view-reports",
  },
]

export function AgentDashboardNav({
  activeSection = "overview",
  isMobile = false,
  onNavigate,
}: AgentDashboardNavProps) {
  return (
    <div className={cn("w-64 border-r bg-white", isMobile ? "h-full" : "h-screen")}>
      <div className="flex h-full flex-col">
        <div className="border-b px-6 py-4">
          <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={120} height={60} className="w-32" />
        </div>

        <div className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            if (isMobile && onNavigate) {
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                    activeSection === item.section ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => onNavigate(item.section)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-oakes">{item.name}</span>
                </Button>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  activeSection === item.section ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-oakes">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
