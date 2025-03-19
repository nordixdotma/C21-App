"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Subscribe:", email)
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }, 1000)
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="bg-black rounded-xl sm:rounded-2xl md:rounded-3xl p-8 sm:p-10 md:p-16 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('/grid.png')]"></div>
          </div>

          {/* Content */}
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">
              Stay Updated with Market Insights
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 sm:mb-10">
              Subscribe to our newsletter for exclusive property listings and market updates
            </p>

            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <Send className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p>Your subscription has been confirmed. You've been added to our list and will hear from us soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow h-12 sm:h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full text-sm sm:text-base"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 sm:h-14 bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 rounded-full text-sm sm:text-base flex items-center justify-center min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

