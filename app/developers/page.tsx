import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DevelopersHero } from "@/components/developers/hero"
import { DevelopersGrid } from "@/components/developers/grid"
import { DevelopersPartnership } from "@/components/developers/partnership"
import { Newsletter } from "@/components/newsletter"

export default function DevelopersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <DevelopersHero />
        <DevelopersGrid />
        <DevelopersPartnership />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
