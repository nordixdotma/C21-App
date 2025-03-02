"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribe:", email)
  }

  return (
    <section className="py-10 sm:py-16 md:py-24">
      <div className="max-w-[1170px] mx-auto px-3 sm:px-4">
        <div className="bg-black rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3 sm:mb-4 md:mb-6">
              Stay Updated with Market Insights
            </h2>
            <p className="font-body text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 md:mb-10">
              Subscribe to our newsletter for exclusive property listings and market updates
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow h-10 sm:h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full text-sm sm:text-base"
                required
              />
              <Button
                type="submit"
                className="h-10 sm:h-12 bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 md:px-8 rounded-full text-sm sm:text-base"
              >
                <span>Subscribe</span>
                <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

