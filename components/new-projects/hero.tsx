import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewProjectsHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/herobackground.jpg"
          alt="New Development Projects"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-30" />
      </div>

      <div className="relative z-10 text-center w-full max-w-4xl px-4">
        <h1 className="font-typold text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
          New Development Projects
        </h1>
        <p className="font-oakes text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Discover the latest and most exclusive new development projects in Marrakech
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by project name or location"
              className="pl-10 h-12 bg-white/95 backdrop-blur-sm border-0 shadow-lg focus-visible:ring-primary"
            />
          </div>
          <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white shadow-lg">Search</Button>
        </div>
      </div>
    </section>
  )
}

