import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { guides } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Guides() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-12 md:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Guides</h2>
            <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
          </div>
          <Button
            className="bg-white text-primary rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 group flex items-center"
            variant="outline"
          >
            <span>View All Guides</span>
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide, index) => (
            <div
              key={index}
              className={cn(
                "group relative bg-black rounded-lg overflow-hidden cursor-pointer aspect-[4/3]",
                "transform transition-all duration-500 hover:-translate-y-2",
              )}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <Image
                src={guide.image || "/placeholder.svg"}
                alt={guide.title}
                width={300}
                height={225}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{guide.title}</h3>
                  <p className="text-xs opacity-0 group-hover:opacity-90 transition-opacity duration-500">
                    {guide.subtitle}
                  </p>
                </div>
                <ChevronRight className="absolute bottom-5 right-6 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

