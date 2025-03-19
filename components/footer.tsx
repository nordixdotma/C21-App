import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About & Contact */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={120} height={60} className="w-32" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in real estate, providing exceptional service and expertise in Marrakech since 2005.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+212664722488"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">06.64.72.24.88</span>
              </a>
              <a
                href="mailto:Q.huaux@areis.ma"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">Q.huaux@areis.ma</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <p className="text-sm">123 Business Avenue, Hivernage, Marrakech, Morocco</p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-primary after:-mb-2">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <FooterLink href="/new-projects">New Projects</FooterLink>
              <FooterLink href="/buy/houses">Buy</FooterLink>
              <FooterLink href="/rent/apartments">Rent</FooterLink>
              <FooterLink href="/sell">Sell</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/developers">Developers</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/our-team">Our Team</FooterLink>
              <FooterLink href="/career">Career</FooterLink>
            </div>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-primary after:-mb-2">
              Property Types
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/buy/apartments">Apartments</FooterLink>
              <FooterLink href="/buy/villas">Villas</FooterLink>
              <FooterLink href="/buy/houses">Houses</FooterLink>
              <FooterLink href="/buy/commercial">Commercial</FooterLink>
              <FooterLink href="/buy/land">Land</FooterLink>
              <FooterLink href="/buy/off-plan">Off-Plan Projects</FooterLink>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-primary after:-mb-2">
              Newsletter
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for exclusive property listings and market updates.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Subscribe
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} />
                <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} />
                <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} />
                <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs md:text-sm">
              © {new Date().getFullYear()} CENTURY 21®. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-primary text-xs md:text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-primary text-xs md:text-sm">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-primary text-xs md:text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm flex items-center"
    >
      <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-primary" />
      {children}
    </Link>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="bg-white/10 hover:bg-primary p-2 rounded-full transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}

