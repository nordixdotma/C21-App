import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/hero"
import { AboutMission } from "@/components/about/mission"
import { AboutValues } from "@/components/about/values"
import { AboutAchievements } from "@/components/about/achievements"
import { AboutTeamPreview } from "@/components/about/team-preview"
import { AboutTestimonials } from "@/components/about/testimonials"
import { AboutCTA } from "@/components/about/cta"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutAchievements />
        <AboutTeamPreview />
        <AboutTestimonials />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  )
}
