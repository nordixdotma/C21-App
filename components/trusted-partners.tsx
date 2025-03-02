import Image from "next/image"
import { partners } from "@/lib/constants"

export function TrustedPartners() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50" />
      <div className="relative max-w-[1170px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8 sm:mb-16">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Trusted Partner of the Most Prominent Companies
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="h-24 sm:h-32 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center group hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                width={150}
                height={50}
                className="w-24 sm:w-32 h-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

