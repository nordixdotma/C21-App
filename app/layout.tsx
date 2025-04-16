import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Display, Outfit } from "next/font/google"
import "./globals.css"

const notoSansDisplay = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans-display",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Century 21 | Real Estate",
  description: "Find your dream property in Marrakech with our expert real estate services.",
  icons: {
    icon: "/C21 logo rbz.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSansDisplay.variable} ${outfit.variable}`}>
      <body>
        {children}

        {/* Fixed WhatsApp Button with improved styling */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          <div className="group relative">
            {/* Tooltip that appears on hover */}
            <div className="absolute bottom-full right-0 mb-2 w-auto min-w-max origin-bottom-right scale-0 rounded-lg bg-white p-2 text-sm font-medium text-gray-900 shadow-lg transition-all duration-200 group-hover:scale-100">
              <div className="flex items-center gap-2 whitespace-nowrap px-2">
                <span>Chat with us on WhatsApp</span>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 bg-white"></div>
            </div>

            {/* WhatsApp button with pulse effect */}
            <a
              href="https://wa.me/212664722488?text=Hello%20Century%2021%2C%20I'm%20interested%20in%20your%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-105 hover:shadow-xl"
              aria-label="Contact us on WhatsApp"
            >
              {/* Pulse animation */}
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></span>

              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative h-8 w-8 z-10"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
