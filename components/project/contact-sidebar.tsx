"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Send, Check, Loader2, PhoneIcon as WhatsApp } from "lucide-react"
import { cn } from "@/lib/utils"

// Import the tracking function
import { trackContactClick } from "@/lib/view-tracker"

interface ContactSidebarProps {
  className?: string
  agent?: {
    id: string
    name: string
    email: string
    phone: string
    image: string
  }
  projectId: string
}

export function ContactSidebar({ className, agent, projectId }: ContactSidebarProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Use the provided agent or default to Sadghi Mhamdi
  const displayAgent = agent || {
    id: "1",
    name: "Sadghi Mhamdi",
    email: "contact@example.com",
    phone: "06.64.72.24.88",
    image: "https://th.bing.com/th/id/OIP.ZP-E8ZFH11wb1XSm0dn-5wHaJQ?rs=1&pid=ImgDetMain",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className={cn("rounded-xl border bg-white p-6 shadow-sm", className)}>
      <div className="mb-6 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20">
          <Image src={displayAgent.image || "/placeholder.svg"} alt="Agent" fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{displayAgent.name}</h3>
          <p className="text-sm text-gray-600">Real Estate Agent</p>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
          onClick={() => trackContactClick(projectId)}
        >
          <Phone className="h-4 w-4" />
          Call
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
          onClick={() => trackContactClick(projectId)}
        >
          <Mail className="h-4 w-4" />
          Email
        </Button>
      </div>

      <Button
        className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
        onClick={() => trackContactClick(projectId)}
      >
        <WhatsApp className="h-4 w-4" />
        WhatsApp
      </Button>

      {isSubmitted ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="text-lg font-medium text-green-800">Message Sent!</h4>
          <p className="mt-1 text-sm text-green-600">Thank you for your message. We'll get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isSubmitting}
            className="border-gray-300 focus:border-primary"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isSubmitting}
            className="border-gray-300 focus:border-primary"
          />
          <Input
            type="tel"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            disabled={isSubmitting}
            className="border-gray-300 focus:border-primary"
          />
          <Textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            disabled={isSubmitting}
            className="border-gray-300 focus:border-primary resize-none"
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
