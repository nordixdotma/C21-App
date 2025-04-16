import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarDays, ChevronRight, ArrowRight } from "lucide-react"
import { articles } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function LatestNews() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-12 md:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Latest News & Insights</h2>
            <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
          </div>
          <Link href="/blog">
            <Button
              className="bg-white text-primary rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 group flex items-center"
              variant="outline"
            >
              <span>View All Articles</span>
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <Card
              key={article.id}
              className={cn(
                "overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2",
                "flex flex-col h-full",
              )}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <CardContent className="pt-6 flex-grow">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center ml-3 text-gray-500 text-xs">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    {article.date}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
              </CardContent>

              <CardFooter className="pt-0">
                <Button variant="link" className="px-0 text-primary group">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
