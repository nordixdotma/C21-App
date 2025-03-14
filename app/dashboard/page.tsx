"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardNav } from "@/components/dashboard/nav"
import { DashboardStats } from "@/components/dashboard/stats"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsList } from "@/components/dashboard/projects-list"
import { UsersList } from "@/components/dashboard/users-list"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("projects")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || userRole !== "admin") {
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
          <DashboardStats />

          <div className="mt-8">
            <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="projects">Properties</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
              </TabsList>
              <TabsContent value="projects" className="mt-6">
                <ProjectsList />
              </TabsContent>
              <TabsContent value="users" className="mt-6">
                <UsersList />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

