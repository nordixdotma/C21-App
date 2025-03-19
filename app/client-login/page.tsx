"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

// In a real app, this would come from your backend
const CLIENT_CREDENTIALS = [
  { username: "johnsmith", password: "password123", role: "client" },
  { username: "sarahj", password: "password123", role: "client" },
  { username: "mohammedf", password: "password123", role: "client" },
  { username: "fatimaz", password: "password123", role: "client" },
  { username: "robertc", password: "password123", role: "agent" },
]

export default function ClientLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const user = CLIENT_CREDENTIALS.find((user) => user.username === username && user.password === password)

    if (user) {
      // In a real application, you would:
      // 1. Make an API call to verify credentials
      // 2. Receive and store a JWT token
      // 3. Set up proper session management
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userRole", user.role)
      localStorage.setItem("username", username)
      router.push("/client-dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
          <div className="absolute inset-0">
            <Image src="/herobackground.jpg" alt="Authentication background" fill className="object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={120} height={60} className="w-32" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg font-typold text-white">"The best investment on Earth is earth."</p>
              <footer className="text-sm font-oakes text-white/80">Louis Glickman</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-typold font-semibold tracking-tight text-white">Client Login</h1>
              <p className="text-sm font-oakes text-muted-foreground">Sign in to access your client dashboard</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-400">
              <p>Demo client credentials:</p>
              <p>Username: johnsmith / Password: password123</p>
            </div>
            <div className="text-center text-sm text-gray-400">
              <a href="/login" className="text-primary hover:underline">
                Admin access
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

