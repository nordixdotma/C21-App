import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerHero } from "@/components/career/hero"
import { CareerBenefits } from "@/components/career/benefits"
import { CareerTestimonials } from "@/components/career/testimonials"
import { Newsletter } from "@/components/newsletter"

export default function CareerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <CareerHero />
        <CareerBenefits />
        <CareerTestimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
