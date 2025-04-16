import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { articles } from "@/lib/constants"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Newsletter } from "@/components/newsletter"

export default function BlogPost({ params }: { params: { id: string } }) {
  const articleId = Number.parseInt(params.id)
  const article = articles.find((article) => article.id === articleId)

  if (!article) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-medium rounded mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {article.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />5 min read
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/blog" className="inline-flex items-center text-primary mb-8 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all articles
          </Link>

          <article className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {articles
                .filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link href={`/blog/${relatedArticle.id}`} key={relatedArticle.id} className="group block">
                    <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-3">
                      <Image
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{relatedArticle.title}</h3>
                  </Link>
                ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gray-50 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Looking for your dream property in Marrakech?</h3>
            <p className="text-gray-600 mb-6">
              Browse our exclusive listings or contact our team of experts to help you find the perfect property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-primary hover:bg-primary/90">Browse Properties</Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
