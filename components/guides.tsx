import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { guides } from "@/lib/constants"

export function Guides() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold">Guides</h2>
          <Button 
            className="bg-white text-primary rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 group flex items-center"
            variant="outline"
          >
            <span>View All Guides</span>
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide, index) => (
            <div key={index} className="group relative bg-black rounded-lg overflow-hidden cursor-pointer aspect-[4/3]">
              <Image
                src={guide.image || "/placeholder.svg"}
                alt={guide.title}
                width={300}
                height={225}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-50 transition-opacity"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-bold mb-1">{guide.title}</h3>
                <p className="text-xs opacity-90">{guide.subtitle}</p>
                <ChevronRight className="absolute bottom-5 right-6 h-6 w-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

