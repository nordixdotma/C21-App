"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavLink, NavDropdown, MobileNavSection } from "@/components/navbar-components"

const buyMenuItems = [
  { href: "/buy/houses", label: "Houses" },
  { href: "/buy/apartments", label: "Apartments" },
  { href: "/buy/villas", label: "Villas" },
  { href: "/buy/commercial", label: "Commercial" },
]

const rentMenuItems = [
  { href: "/rent/houses", label: "Houses" },
  { href: "/rent/apartments", label: "Apartments" },
  { href: "/rent/villas", label: "Villas" },
]

const moreMenuItems = [
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/careers", label: "Careers" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Upper Section */}
      <div className="max-w-[1170px] mx-auto px-3 lg:px-8">
        <div className="h-14 md:h-16 flex items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center z-50 relative">
            <Image
              src="/C21 logo rbz.png"
              alt="CENTURY 21"
              width={50}
              height={50}
              className="h-7 w-auto md:h-10"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
              alt="Morocco Flag"
              width={24}
              height={16}
              className="h-4 w-auto"
            />
            <Button
              variant={isScrolled ? "default" : "outline"}
              size="sm"
              className={`rounded-full transition-all duration-300 ${
                !isScrolled
                  ? "text-white border-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              Sign in
            </Button>
          </div>

          <button
            className="md:hidden z-50 relative p-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-5 w-5 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            ) : (
              <Menu className={`h-5 w-5 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Lower Section - Navigation */}
      <div className="max-w-[1170px] mx-auto px-4 lg:px-8">
        <nav className="h-12 md:h-14 hidden lg:flex items-center justify-center">
          <div className="flex items-center space-x-8 font-body">
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
            <NavLink href="/Blog" label="Blog" isScrolled={isScrolled} />
            <NavLink href="/about" label="About" isScrolled={isScrolled} />
            <NavLink href="/contact" label="Contact" isScrolled={isScrolled} />
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 w-[280px] bg-white transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 overflow-y-auto h-full">
            <div className="flex flex-col space-y-5 font-body">
              <MobileNavSection title="Buy" items={buyMenuItems} />
              <MobileNavSection title="Rent" items={rentMenuItems} />
              <Link href="/sell" className="text-gray-900 hover:text-primary py-1.5 text-base">
                Sell
              </Link>
              <MobileNavSection title="Blog" items={moreMenuItems} />
              <Link href="/about" className="text-gray-900 hover:text-primary py-1.5 text-base">
                About
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-primary py-1.5 text-base">
                Contact
              </Link>

              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="space-y-3">
                  <a href="tel:+212664722488" className="flex items-center text-gray-600 hover:text-primary p-1.5">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">06.64.72.24.88</span>
                  </a>
                  <a
                    href="mailto:Q.huaux@areis.ma"
                    className="flex items-center text-gray-600 hover:text-primary p-1.5"
                  >
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">Q.huaux@areis.ma</span>
                  </a>
                </div>
              </div>

              {/* Mobile Sign In */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Button className="w-full" size="default">
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

