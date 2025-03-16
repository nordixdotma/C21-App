"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const phrases = ["Marrakech", "Hivernage", "Gueliz", "Palm Grove", "Agdal"]

export function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("buy")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [displayedPhrase, setDisplayedPhrase] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [viewportHeight, setViewportHeight] = useState("100vh")

  // Effect to handle mobile viewport height
  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.visualViewport?.height || window.innerHeight
      setViewportHeight(`${vh}px`)
    }

    updateViewportHeight()
    window.visualViewport?.addEventListener("resize", updateViewportHeight)
    window.visualViewport?.addEventListener("scroll", updateViewportHeight)
    window.addEventListener("resize", updateViewportHeight)

    return () => {
      window.visualViewport?.removeEventListener("resize", updateViewportHeight)
      window.visualViewport?.removeEventListener("scroll", updateViewportHeight)
      window.removeEventListener("resize", updateViewportHeight)
    }
  }, [])

  useEffect(() => {
    setIsLoaded(true)
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
      className="relative flex items-center"
      style={{
        minHeight: viewportHeight,
        height: viewportHeight,
      }}
    >
      <div className="absolute inset-0">
        <Image
          src="/herobackground.jpg"
          alt="Luxury property in Marrakech"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="relative container mx-auto px-3 sm:px-4">
        <div className="max-w-3xl mx-auto text-center pt-16 sm:pt-20 pb-6 sm:pb-8">
          <div className="mb-4 sm:mb-6 space-y-4">
            <h1
              className={`font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight font-barlow transition-all duration-1000 transform text-white ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Find Your Dream Property in{" "}
              <span className="text-primary inline-block min-h-[1.5em]">{displayedPhrase}</span>
            </h1>
          </div>

          <div
            className={`bg-white/10 backdrop-blur-sm p-1 sm:p-1.5 rounded-full mb-4 sm:mb-6 inline-flex transition-all duration-1000 delay-500 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <TabButton active={activeTab === "buy"} onClick={() => setActiveTab("buy")} label="buy">
              Buy
            </TabButton>
            <TabButton active={activeTab === "rent"} onClick={() => setActiveTab("rent")} label="rent">
              Rent
            </TabButton>
            <TabButton active={activeTab === "ferme"} onClick={() => setActiveTab("ferme")} label="ferme">
              Ferme
            </TabButton>
            <TabButton active={activeTab === "bureau"} onClick={() => setActiveTab("bureau")} label="bureau">
              Bureau
            </TabButton>
            <TabButton
              active={activeTab === "commercial"}
              onClick={() => setActiveTab("commercial")}
              label="commercial"
            >
              Locaux Commerciaux
            </TabButton>
            <TabButton active={activeTab === "apart"} onClick={() => setActiveTab("apart")} label="apart">
              Apart
            </TabButton>
            <TabButton active={activeTab === "villas"} onClick={() => setActiveTab("villas")} label="villas">
              Villas
            </TabButton>
          </div>

          <div
            className={`relative max-w-xl mx-auto transition-all duration-1000 delay-700 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by area or project name"
                className="w-full h-10 sm:h-12 pl-4 sm:pl-6 pr-20 sm:pr-24 rounded-full text-sm sm:text-base bg-white/95 backdrop-blur-sm border-0 shadow-lg"
              />
              <Button
                type="submit"
                size="default"
                className="absolute right-1 top-1 h-8 sm:h-10 px-3 sm:px-4 rounded-full bg-primary hover:bg-primary/90 text-xs sm:text-sm"
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 hidden sm:block" />
                <span>Search</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="absolute -bottom-32 sm:-bottom-40 left-1/2 -translate-x-1/2 w-full max-w-xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mx-3 sm:mx-4 flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-around gap-1 sm:gap-4">
              <div className="flex">
                <div className="flex flex-col ml-5">
                  <div className="flex">
                    <img
                      src="https://famproperties.com/assets/famproperties/images/reviews/Review-stars.png?v=1.1"
                      loading="lazy"
                      width="120"
                      height="75"
                      alt="Review stars"
                      className="w-20 sm:w-24"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm md:text-base">
                  It <span className="text-primary">Matters</span> which <span className="text-primary">Agency</span>{" "}
                  you <span className="text-primary">Trust</span>
                </p>
              </div>
            </div>
            <div className="flex">
              <img
                src="https://famproperties.com/assets/famproperties/images/reviews/reviews-new.png?v=1.1"
                loading="lazy"
                width="80"
                height="64"
                alt="Reviews"
                className="w-16 sm:w-20"
              />
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
      className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
        active ? "bg-primary text-white shadow-lg scale-105" : "text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  )
}

