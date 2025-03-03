"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardNav } from "@/components/dashboard/nav"
import { ProjectsList } from "@/components/dashboard/projects-list"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
    setTimeout(() => setIsLoading(false), 500)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <ProjectsList />
        </main>
      </div>
    </div>
  )
}

