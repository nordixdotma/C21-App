import Image from "next/image"

export function DevelopersHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/herobackground.jpg"
          alt="Our Developer Partners"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-30" />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="font-typold text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
          Our Developer Partners
        </h1>
        <p className="font-oakes text-white/80 text-lg md:text-xl max-w-2xl mx-auto px-4">
          Collaborating with the most prestigious developers to bring you exceptional properties
        </p>
      </div>
    </section>
  )
}
