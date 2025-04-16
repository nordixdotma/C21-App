"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarDays, ArrowRight } from "lucide-react"
import { articles } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Link from "next/link"

interface BlogGridProps {
  activeCategory: string
}

export function BlogGrid({ activeCategory }: BlogGridProps) {
  const [visibleArticles, setVisibleArticles] = useState(6)

  // Reset visible articles when category changes
  useEffect(() => {
    setVisibleArticles(6)
  }, [activeCategory])

  // Filter articles by category
  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((article) => {
          // Convert category names to IDs for comparison
          const categoryId = article.category.toLowerCase().replace(/\s+/g, "-")
          return categoryId === activeCategory
        })

  const displayedArticles = filteredArticles.slice(0, visibleArticles)
  const hasMoreArticles = visibleArticles < filteredArticles.length

  const loadMoreArticles = () => {
    setVisibleArticles((prev) => Math.min(prev + 3, filteredArticles.length))
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-gray-500">There are no articles in this category yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedArticles.map((article, index) => (
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
                  <Link href={`/blog/${article.id}`} className="block">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>

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
                    <Link href={`/blog/${article.id}`} className="block group">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Link href={`/blog/${article.id}`} className="inline-block">
                      <Button variant="link" className="px-0 text-primary group">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {hasMoreArticles && (
              <div className="mt-12 text-center">
                <Button
                  onClick={loadMoreArticles}
                  className="bg-white text-primary rounded-full px-8 py-6 text-sm font-semibold uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300"
                  variant="outline"
                >
                  Load More Articles
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
