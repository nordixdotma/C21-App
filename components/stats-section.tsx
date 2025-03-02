import { stats } from "@/lib/constants"

export function StatsSection() {
  return (
    <section className="py-10 sm:py-16 md:py-24">
      <div className="max-w-[1170px] mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-1 sm:mb-2">
                {stat.value}
              </h3>
              <p className="font-body text-xs sm:text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

