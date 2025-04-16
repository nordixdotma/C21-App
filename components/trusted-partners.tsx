import Image from "next/image"
import { partners } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function TrustedPartners() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50" />

      <div className="relative max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Trusted Partner of the Most Prominent Companies
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={cn(
                "h-24 sm:h-32 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center group hover:shadow-lg transition-all duration-500",
                "transform hover:scale-105",
                "border border-gray-100",
              )}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                width={150}
                height={50}
                className="w-24 sm:w-32 h-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
