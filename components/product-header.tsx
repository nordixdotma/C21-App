"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavLink, NavDropdown, MobileNavSection } from "@/components/navbar-components"
import { buyMenuItems, rentMenuItems, moreMenuItems } from "@/lib/constants"

export function ProductHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      {/* Upper Section */}
      <div className="max-w-[1170px] mx-auto px-3 lg:px-8">
        <div className="h-14 md:h-16 flex items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center z-50 relative">
            <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={50} height={50} className="h-7 w-auto md:h-10" />
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
              variant="outline"
              size="sm"
              className="rounded-full text-white border-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
            >
              Login
            </Button>
          </div>

          <button
            className="md:hidden z-50 relative p-1.5 text-white" // Added text-white for better visibility
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
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
              isScrolled={false}
              isActive={activeDropdown === "buy"}
              onMouseEnter={() => setActiveDropdown("buy")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-2 text-sm text-white hover:text-primary py-1.5`}>Buy</button>
            </NavDropdown>
            <NavDropdown
              label="Rent"
              items={rentMenuItems}
              isScrolled={false}
              isActive={activeDropdown === "rent"}
              onMouseEnter={() => setActiveDropdown("rent")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-2 text-sm text-white hover:text-primary py-1.5`}>Rent</button>
            </NavDropdown>
            <NavLink href="/sell" label="Sell" isScrolled={false} />
            <NavLink href="/Blog" label="Blog" isScrolled={false} />
            <NavLink href="/about" label="About" isScrolled={false} />
            <NavLink href="/contact" label="Contact" isScrolled={false} />
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-50 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 w-[280px] bg-white transform transition-transform duration-300 ease-out z-[51] ${
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
              <MobileNavSection title="More" items={moreMenuItems} />
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

