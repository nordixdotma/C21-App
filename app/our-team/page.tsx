import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamHero } from "@/components/team/hero"
import { TeamGrid } from "@/components/team/grid"
import { TeamLeadership } from "@/components/team/leadership"
import { TeamJoin } from "@/components/team/join"
import { Newsletter } from "@/components/newsletter"

export default function OurTeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <TeamHero />
        <TeamLeadership />
        <TeamGrid />
        <TeamJoin />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
