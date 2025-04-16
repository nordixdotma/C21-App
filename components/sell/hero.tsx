"use client"

import Image from "next/image"

const gradientAnimation = `
@keyframes gradient {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}

.animate-gradient {
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
}
`

export function SellHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
      <style jsx>{gradientAnimation}</style>
      <div className="absolute inset-0">
        <Image src="/herobackground.jpg" alt="Sell Your Property" fill priority className="object-cover" quality={90} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 animate-gradient" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-30" />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="font-typold text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
          Sell Your Property with Confidence
        </h1>
        <p className="font-oakes text-white/80 text-lg md:text-xl max-w-2xl mx-auto px-4">
          Get a free property valuation and expert guidance from Marrakech's leading real estate agency
        </p>
      </div>
    </section>
  )
}
