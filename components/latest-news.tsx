import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarDays, ChevronRight } from "lucide-react"
import { articles } from "@/lib/constants"

export function LatestNews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold">Latest News & Insights</h2>
          <Button 
            className="bg-white text-primary rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 group flex items-center"
            variant="outline"
          >
            <span>View All Articles</span>
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <CardContent className="pt-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center ml-3 text-gray-500 text-xs">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    {article.date}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
              </CardContent>

              <CardFooter>
                <Button variant="link" className="px-0 text-primary">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

