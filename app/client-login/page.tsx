"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

export default function ClientLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to check credentials
    setTimeout(() => {
      // Get users from localStorage
      const storedUsers = localStorage.getItem("users")
      const users = storedUsers ? JSON.parse(storedUsers) : []

      // Find user with matching credentials
      const user = users.find((u: any) => u.username === formData.username && u.password === formData.password)

      if (user) {
        // Set authentication state
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userRole", user.role)
        localStorage.setItem("username", user.name)
        localStorage.setItem("userId", user.id)
        localStorage.setItem("userEmail", user.email)

        // Redirect based on role
        if (user.role === "agent") {
          router.push("/agent-dashboard")
        } else {
          router.push("/client-dashboard")
        }

        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        })
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex max-w-screen-xl flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={150} height={75} />
            <h1 className="font-typold text-2xl font-bold">Client & Agent Portal</h1>
            <p className="text-sm text-gray-500">Access your personalized real estate dashboard</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="help">Need Help?</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="help">
              <div className="space-y-4 pt-4">
                <p className="text-sm text-gray-600">
                  If you're having trouble logging in, please contact our support team:
                </p>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-medium">Contact Support</p>
                  <p className="text-sm text-gray-500">Email: support@century21.ma</p>
                  <p className="text-sm text-gray-500">Phone: +212 5 24 33 44 55</p>
                </div>
                <p className="text-xs text-gray-500">
                  Our support team is available Monday to Friday, 9:00 AM to 6:00 PM.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Don't have an account?{" "}
              <a href="/contact" className="font-medium text-primary hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
