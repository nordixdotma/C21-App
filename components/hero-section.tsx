"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const phrases = ["Marrakech", "Hivernage", "Gueliz", "Palm Grove", "Agdal"]

export function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("buy")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [displayedPhrase, setDisplayedPhrase] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  // Set initial loaded state
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[activeIndex]
    let typingTimer: NodeJS.Timeout
    let deletingTimer: NodeJS.Timeout

    if (isTyping) {
      if (displayedPhrase.length < currentPhrase.length) {
        typingTimer = setTimeout(() => {
          setDisplayedPhrase(currentPhrase.substring(0, displayedPhrase.length + 1))
        }, 100)
      } else {
        typingTimer = setTimeout(() => {
          setIsTyping(false)
        }, 1500)
      }
    } else {
      if (displayedPhrase.length > 0) {
        deletingTimer = setTimeout(() => {
          setDisplayedPhrase(displayedPhrase.substring(0, displayedPhrase.length - 1))
        }, 50)
      } else {
        const nextIndex = (activeIndex + 1) % phrases.length
        setActiveIndex(nextIndex)
        setIsTyping(true)
      }
    }

    return () => {
      clearTimeout(typingTimer)
      clearTimeout(deletingTimer)
    }
  }, [activeIndex, displayedPhrase, isTyping])

  // Handle mobile browser viewport height issues
  useEffect(() => {
    const handleResize = () => {
      // Set a custom property for viewport height that accounts for mobile browser UI
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Initial call
    handleResize()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", () => {
      // Small delay to ensure correct height after orientation change
      setTimeout(handleResize, 100)
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    searchParams.set("q", searchQuery)
    searchParams.set("type", activeTab)
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }} // Using svh (small viewport height) for better mobile support
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/herobackground.jpg"
          alt="Luxury property in Marrakech"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <div
            className={cn(
              "mb-8 transition-all duration-1000 transform",
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
          >
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
              Find Your Dream Property in{" "}
              <span className="text-primary relative inline-block min-h-[1.5em]">{displayedPhrase}</span>
            </h1>
          </div>

          {/* Tab Buttons */}
          <div
            className={cn(
              "bg-white/10 backdrop-blur-sm p-1 rounded-full mb-8 inline-flex transition-all duration-1000 delay-300 transform",
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
          >
            <TabButton active={activeTab === "buy"} onClick={() => setActiveTab("buy")} label="buy">
              Buy
            </TabButton>
            <TabButton active={activeTab === "rent"} onClick={() => setActiveTab("rent")} label="rent">
              Rent
            </TabButton>
          </div>

          {/* Search Form */}
          <div
            className={cn(
              "relative max-w-xl mx-auto transition-all duration-1000 delay-500 transform",
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area or project name"
                  className="w-full h-12 sm:h-14 pl-5 pr-24 rounded-full text-sm sm:text-base bg-white/95 backdrop-blur-sm border-0 shadow-lg focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="submit"
                  size="default"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-4 sm:px-6 rounded-full bg-primary hover:bg-primary/90 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2 hidden sm:block" />
                  <span>Search</span>
                </Button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-white/80">
              <span>Popular:</span>
              {phrases.map((phrase, index) => (
                <button
                  key={phrase}
                  onClick={() => {
                    setSearchQuery(phrase)
                    setActiveTab("buy")
                  }}
                  className="hover:text-primary transition-colors duration-300 flex items-center"
                >
                  {phrase}
                  {index < phrases.length - 1 && <span className="mx-1">•</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div
        className={cn(
          "absolute w-full max-w-xl left-1/2 -translate-x-1/2 transition-all duration-1000 delay-800",
          isLoaded ? "opacity-100" : "opacity-0",
          "bottom-8 px-4",
        )}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-white mt-1">500+ Reviews</p>
              </div>
              <div className="text-center text-white">
                <p className="text-sm font-medium">
                  It <span className="text-primary font-semibold">Matters</span> which{" "}
                  <span className="text-primary font-semibold">Agency</span> you{" "}
                  <span className="text-primary font-semibold">Trust</span>
                </p>
              </div>
            </div>
            <div className="hidden sm:block">
              <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={60} height={30} className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TabButton({
  children,
  active,
  onClick,
  label,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      aria-label={`Select ${label} tab`}
      onClick={onClick}
      className={cn(
        "px-4 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base font-medium",
        active ? "bg-primary text-white shadow-lg scale-105" : "text-white hover:bg-white/20",
      )}
    >
      {children}
    </button>
  )
}

