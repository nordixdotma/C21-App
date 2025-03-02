import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { guides } from "@/lib/constants"

export function Guides() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold">Guides</h2>
          <Button variant="outline" className="rounded-full">
            VIEW ALL GUIDES
            <ChevronRight className="ml-2 h-4 w-4" />
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
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <p className="text-sm opacity-90">{guide.subtitle}</p>
                <ChevronRight className="absolute bottom-6 right-6 h-6 w-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

