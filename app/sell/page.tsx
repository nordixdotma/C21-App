import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SellHero } from "@/components/sell/hero"
import { SellForm } from "@/components/sell/form"
import { SellInfo } from "@/components/sell/info"
import { WhyChooseUs } from "@/components/sell/why-choose-us"
import { Newsletter } from "@/components/newsletter"

export default function SellPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <SellHero />
        <div className="max-w-[1170px] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SellForm />
            <SellInfo />
          </div>
        </div>
        <WhyChooseUs />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

