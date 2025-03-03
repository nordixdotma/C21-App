import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogHero } from "@/components/blog/hero"
import { BlogGrid } from "@/components/blog/grid"
import { BlogCategories } from "@/components/blog/categories"
import { Newsletter } from "@/components/newsletter"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <BlogHero />
        <BlogCategories />
        <BlogGrid />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

