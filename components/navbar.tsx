"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavLink, NavDropdown } from "@/components/navbar-components"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const buyMenuItems = [
  { href: "/buy/houses", label: "Houses & Villas" },
  { href: "/buy/apartments", label: "Apartments & Penthouses" },
  { href: "/buy/commercial", label: "Commercial Properties" },
  { href: "/buy/land", label: "Land & Plots" },
  { href: "/buy/off-plan", label: "Off-Plan Projects" },
]

const rentMenuItems = [
  { href: "/rent/short-term", label: "Short-Term Rentals" },
  { href: "/rent/long-term", label: "Long-Term Rentals" },
  { href: "/rent/vacation", label: "Vacation Homes" },
  { href: "/rent/commercial", label: "Commercial Spaces" },
]

const moreMenuItems = [
  { href: "/faqs", label: "FAQs" },
  { href: "/careers", label: "Careers" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null)
  const router = useRouter()

  // Handle scroll event with throttling for better performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection((prev) => (prev === section ? null : section))
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setExpandedMobileSection(null)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "bg-white shadow-md" : "bg-transparent",
      )}
    >
      {/* Upper Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div
          className={cn(
            "h-16 md:h-16 flex items-center justify-between transition-all duration-300",
            isScrolled ? "border-b border-gray-200" : "",
          )}
        >
          <Link href="/" className="flex items-center z-40 relative">
            <Image
              src="/C21 logo rbz.png"
              alt="CENTURY 21"
              width={50}
              height={50}
              className="h-8 w-auto md:h-10 transition-all"
              priority
            />
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
              alt="Morocco Flag"
              width={24}
              height={16}
              className="h-5 w-auto transition-all"
            />
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full transition-all duration-300 text-sm font-medium",
                !isScrolled
                  ? "text-white border-white/80 hover:bg-primary backdrop-blur-sm bg-transparent"
                  : "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white",
              )}
              onClick={() => router.push("/client-login")}
            >
              Espace client
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 relative p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={cn("h-6 w-6 transition-all", isScrolled ? "text-gray-900" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6 transition-all", isScrolled ? "text-gray-900" : "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Lower Section - Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <nav className="h-12 md:h-12 hidden lg:flex items-center justify-center">
          <div className="flex items-center space-x-6 font-medium">
            <NavLink href="/new-projects" label="New Projects" isScrolled={isScrolled} />
            <NavDropdown
              label="Buy"
              items={buyMenuItems}
              isScrolled={isScrolled}
              isActive={activeDropdown === "buy"}
              onMouseEnter={() => setActiveDropdown("buy")}
              onMouseLeave={() => setActiveDropdown(null)}
            />
            <NavDropdown
              label="Rent"
              items={rentMenuItems}
              isScrolled={isScrolled}
              isActive={activeDropdown === "rent"}
              onMouseEnter={() => setActiveDropdown("rent")}
              onMouseLeave={() => setActiveDropdown(null)}
            />
            <NavLink href="/sell" label="Sell" isScrolled={isScrolled} />
            <NavLink href="/blog" label="Blog" isScrolled={isScrolled} />
            <NavLink href="/about" label="About" isScrolled={isScrolled} />
            <NavLink href="/contact" label="Contact" isScrolled={isScrolled} />
            <NavLink href="/developers" label="Developers" isScrolled={isScrolled} />
            <NavLink href="/services" label="Services" isScrolled={isScrolled} />
            <NavLink href="/our-team" label="Our Team" isScrolled={isScrolled} />
            <NavLink href="/career" label="Career" isScrolled={isScrolled} />
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
              <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={40} height={40} className="h-8 w-auto" />
            </Link>
            <button
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-2 px-4">
            <div className="space-y-1">
              <Link
                href="/new-projects"
                className="block py-3 text-gray-900 hover:text-primary border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                New Projects
              </Link>

              {/* Buy Section */}
              <div className="border-b border-gray-100">
                <button
                  className="w-full py-3 flex items-center justify-between text-gray-900 hover:text-primary"
                  onClick={() => toggleMobileSection("buy")}
                >
                  <span>Buy</span>
                  <ChevronRight
                    className={cn("h-4 w-4 transition-transform", expandedMobileSection === "buy" ? "rotate-90" : "")}
                  />
                </button>
                {expandedMobileSection === "buy" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {buyMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-gray-700 hover:text-primary text-sm"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Rent Section */}
              <div className="border-b border-gray-100">
                <button
                  className="w-full py-3 flex items-center justify-between text-gray-900 hover:text-primary"
                  onClick={() => toggleMobileSection("rent")}
                >
                  <span>Rent</span>
                  <ChevronRight
                    className={cn("h-4 w-4 transition-transform", expandedMobileSection === "rent" ? "rotate-90" : "")}
                  />
                </button>
                {expandedMobileSection === "rent" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {rentMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-gray-700 hover:text-primary text-sm"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Links */}
              {[
                { href: "/sell", label: "Sell" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/developers", label: "Developers" },
                { href: "/services", label: "Services" },
                { href: "/our-team", label: "Our Team" },
                { href: "/career", label: "Career" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-gray-900 hover:text-primary border-b border-gray-100"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            {/* Contact Info */}
            <div className="mb-4 space-y-2">
              <a href="tel:+212664722488" className="flex items-center text-gray-600 hover:text-primary">
                <Phone className="h-4 w-4 mr-3" />
                <span className="text-sm">06.64.72.24.88</span>
              </a>
              <a href="mailto:Q.huaux@areis.ma" className="flex items-center text-gray-600 hover:text-primary">
                <Mail className="h-4 w-4 mr-3" />
                <span className="text-sm">Q.huaux@areis.ma</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="w-full"
                variant="default"
                onClick={() => {
                  closeMobileMenu()
                  router.push("/client-login")
                }}
              >
                Espace client
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  closeMobileMenu()
                  router.push("/login")
                }}
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

