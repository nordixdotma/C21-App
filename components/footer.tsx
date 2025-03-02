import type React from "react"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-gray-300 hover:text-primary transition-colors">
        {children}
      </a>
    </li>
  )
}

export function Footer() {
  return (
    <footer className="bg-black text-white pt-12 md:pt-16 pb-8">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <Image
              src="/C21 logo rbz.png"
              alt="CENTURY 21"
              width={120}
              height={60}
              className="mb-6 w-24 sm:w-32"
            />
            <p className="font-body text-gray-100 mb-6 text-sm sm:text-base">
              Your trusted partner in real estate, providing exceptional service and expertise since 2005.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-4 w-4 sm:h-5 sm:w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-4 w-4 sm:h-5 sm:w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-4 w-4 sm:h-5 sm:w-5" />} />
              <SocialLink href="#" icon={<Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />} />
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/properties">Properties</FooterLink>
              <FooterLink href="/agents">Agents</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold mb-4 sm:mb-6">Contact Info</h3>
            <div className="space-y-3 sm:space-y-4">
              <a href="tel:+212664722488" className="flex items-center gap-3 text-gray-300 hover:text-primary">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">06.64.72.24.88</span>
              </a>
              <a href="mailto:Q.huaux@areis.ma" className="flex items-center gap-3 text-gray-300 hover:text-primary">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Q.huaux@areis.ma</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-1" />
                <p className="text-sm sm:text-base">123 Business Avenue, Marrakech, Morocco</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold mb-4 sm:mb-6">Working Hours</h3>
            <div className="font-body space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-300 font-body">
          <p>© {new Date().getFullYear()} CENTURY 21®. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

