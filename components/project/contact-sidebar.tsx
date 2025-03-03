"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactSidebarProps {
  className?: string
}

export function ContactSidebar({ className }: ContactSidebarProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <div className={cn("rounded-xl border bg-white p-6 shadow-sm", className)}>
      <div className="mb-6 flex items-center gap-4">
        <Image src="https://th.bing.com/th/id/OIP.ZP-E8ZFH11wb1XSm0dn-5wHaJQ?rs=1&pid=ImgDetMain" alt="Agent" width={60} height={60} className="rounded-full" />
        <div>
          <h3 className="font-semibold">sadghi mhamdi</h3>
          <p className="text-sm text-gray-600">Real Estate Agent</p>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <a
          href="tel:+212664722488"
          className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50"
        >
          <Phone className="h-5 w-5 text-primary" />
          <span>06.64.72.24.88</span>
        </a>
        <a
          href="mailto:contact@example.com"
          className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50"
        >
          <Mail className="h-5 w-5 text-primary" />
          <span>contact@example.com</span>
        </a>
      </div>

      <a
        href="https://wa.me/212664722488"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-green-500 p-3 text-white transition-colors hover:bg-green-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Contact on WhatsApp
      </a>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="tel"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <Textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
        />
        <Button type="submit" className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </form>
    </div>
  )
}

