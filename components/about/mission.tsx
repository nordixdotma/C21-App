import Image from "next/image"

export function AboutMission() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission & History</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2005, CENTURY 21 Marrakech has established itself as a leading real estate agency in Morocco,
              specializing in luxury properties, investment opportunities, and comprehensive real estate services.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to provide exceptional real estate services with integrity, expertise, and personalized
              attention to each client. We strive to exceed expectations and create lasting relationships built on trust
              and successful outcomes.
            </p>
            <p className="text-gray-600">
              As part of the global CENTURY 21 network, we combine international standards with deep local knowledge,
              offering our clients the best of both worlds. Our team of experienced professionals is dedicated to
              helping you navigate the Marrakech real estate market with confidence.
            </p>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <Image
              src="https://ix-marketing.imgix.net/autotagging.png?auto=format,compress&w=1946"
              alt="CENTURY 21 Marrakech office"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

