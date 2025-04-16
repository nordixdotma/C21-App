import { HeroSection } from "@/components/hero-section"
import { LatestProjects } from "@/components/latest-projects"
import { Guides } from "@/components/guides"
import { TeamSection } from "@/components/team-section"
import { Newsletter } from "@/components/newsletter"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhyChooseUs } from "@/components/why-choose-us"
import { LatestNews } from "@/components/latest-news"
import { StatsSection } from "@/components/stats-section"
import { TrustedPartners } from "@/components/trusted-partners"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <LatestProjects />
        <WhyChooseUs />
        <Guides />
        <TeamSection />
        <LatestNews />
        <Newsletter />
        <TrustedPartners />
      </main>
      <Footer />
    </div>
  )
}
