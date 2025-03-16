import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NewProjectsHero } from "@/components/new-projects/hero"
import { NewProjectsGrid } from "@/components/new-projects/grid"
import { NewProjectsFilter } from "@/components/new-projects/filter"
import { Newsletter } from "@/components/newsletter"

export default function NewProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <NewProjectsHero />
        <div className="max-w-[1170px] mx-auto px-4 py-8">
          <NewProjectsFilter />
          <NewProjectsGrid />
        </div>
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

