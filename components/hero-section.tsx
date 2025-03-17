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

  // Effect to handle mobile viewport height
  useEffect(() => {
    // Function to set the height of the hero section
    const setHeroHeight = () => {
      if (!heroRef.current) return

      // Get the actual viewport height
      const windowHeight = window.innerHeight

      // Set the height directly on the element
      heroRef.current.style.height = `${windowHeight}px`

      // For debugging
      console.log(`Setting hero height to: ${windowHeight}px`)
    }

    // Set initial height
    setHeroHeight()

    // Set loaded state after a short delay to ensure proper rendering
    setTimeout(() => setIsLoaded(true), 100)

    // Add event listeners for resize and orientation change
    window.addEventListener("resize", setHeroHeight)
    window.addEventListener("orientationchange", () => {
      // Add a small delay after orientation change to get the correct height
      setTimeout(setHeroHeight, 100)
    })

    // On some mobile browsers, we need to handle scroll events too
    // as the address bar can appear/disappear
    window.addEventListener("scroll", setHeroHeight)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setHeroHeight)
      window.removeEventListener("orientationchange", setHeroHeight)
      window.removeEventListener("scroll", setHeroHeight)
    }
  }, [])

  // Add a resize observer for more reliable height updates
  useEffect(() => {
    if (!heroRef.current) return

    // Create a ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(() => {
      if (heroRef.current) {
        const windowHeight = window.innerHeight
        heroRef.current.style.height = `${windowHeight}px`
      }
    })

    // Start observing the hero element
    resizeObserver.observe(heroRef.current)

    // Cleanup
    return () => {
      if (heroRef.current) {
        resizeObserver.unobserve(heroRef.current)
      }
      resizeObserver.disconnect()
    }
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
      className="relative flex items-center overflow-hidden"
      style={{ height: "100vh" }} // Fallback height
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
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <div
            className={cn(
              "mb-6 md:mb-8 transition-all duration-1000 transform",
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
          >
            <h1 className="font-noto text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
              Find Your Dream Property in{" "}
              <span className="text-primary relative inline-block min-h-[1.5em]">{displayedPhrase}</span>
            </h1>
          </div>

          {/* Tab Buttons */}
          <div
            className={cn(
              "bg-white/10 backdrop-blur-sm p-1 rounded-full mb-6 md:mb-8 inline-flex transition-all duration-1000 delay-300 transform",
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

      {/* Trust Indicators - Fixed positioning */}
      <div
        className={cn(
          "absolute w-full max-w-xl left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 transform",
          isLoaded ? "opacity-100" : "opacity-0",
          "bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-14 px-4",
        )}
      >
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <img
                src="https://famproperties.com/assets/famproperties/images/reviews/Review-stars.png?v=1.1"
                loading="lazy"
                width="120"
                height="75"
                alt="Review stars"
                className="w-16 sm:w-24"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm md:text-base font-medium">
                It <span className="text-primary font-semibold">Matters</span> which{" "}
                <span className="text-primary font-semibold">Agency</span> you{" "}
                <span className="text-primary font-semibold">Trust</span>
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src="https://famproperties.com/assets/famproperties/images/reviews/reviews-new.png?v=1.1"
              loading="lazy"
              width="80"
              height="64"
              alt="Reviews"
              className="w-14 sm:w-20"
            />
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

