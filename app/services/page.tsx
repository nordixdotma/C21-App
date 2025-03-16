import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services/hero"
import { ServicesGrid } from "@/components/services/grid"
import { ServicesCTA } from "@/components/services/cta"
import { Newsletter } from "@/components/newsletter"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <ServicesHero />
        <ServicesGrid />
        <ServicesCTA />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

