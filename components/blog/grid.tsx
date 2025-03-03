import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const featuredPost = {
  id: 1,
  title: "The Ultimate Guide to Buying Property in Marrakech in 2024",
  excerpt:
    "Everything you need to know about purchasing property in Marrakech, from legal requirements to the best neighborhoods for investment.",
  image: "https://th.bing.com/th/id/OIP.kINwqVgvCEYzGUOcI2RKCgHaE8?rs=1&pid=ImgDetMain",
  category: "Buying Guide",
  date: "January 15, 2024",
  readTime: "10 min read",
}

const recentPosts = [
  {
    id: 2,
    title: "Marrakech Real Estate Market Trends 2024",
    excerpt:
      "Discover the latest trends and insights in Marrakech's dynamic property market, including emerging neighborhoods and investment opportunities.",
    image:
      "https://th.bing.com/th/id/OIP.kINwqVgvCEYzGUOcI2RKCgHaE8?rs=1&pid=ImgDetMain",
    category: "Market Insights",
    date: "January 10, 2024",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Top 5 Luxury Villa Communities in Marrakech",
    excerpt:
      "Explore the most exclusive villa communities in Marrakech, featuring world-class amenities and stunning architecture.",
    image:
      "https://th.bing.com/th/id/OIP.cf6HOzgq46VAYAMoV4LIugHaEt?w=966&h=614&rs=1&pid=ImgDetMain",
    category: "Lifestyle",
    date: "January 5, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Investment Opportunities in Marrakech's New Development Projects",
    excerpt: "Learn about the latest development projects in Marrakech and the investment potential they offer.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Investment",
    date: "January 1, 2024",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Living in Marrakech: A Guide for Expats",
    excerpt: "Everything you need to know about living in Marrakech, from daily life to cultural experiences.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    date: "December 28, 2023",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Understanding Moroccan Property Law",
    excerpt: "A comprehensive guide to property laws and regulations in Morocco for international buyers.",
    image:
      "https://th.bing.com/th/id/OIP.kINwqVgvCEYzGUOcI2RKCgHaE8?rs=1&pid=ImgDetMain",
    category: "Buying Guide",
    date: "December 25, 2023",
    readTime: "11 min read",
  },
]

export function BlogGrid() {
  return (
    <section className="py-16">
      <div className="max-w-[1170px] mx-auto px-4">
        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="font-typold text-2xl font-bold mb-8">Featured Post</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-xl overflow-hidden">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                  {featuredPost.category}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {featuredPost.readTime}
                </div>
              </div>
              <h3 className="font-typold text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <Button className="bg-primary hover:bg-primary/90">
                Read More
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="font-typold text-2xl font-bold mb-8">Recent Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="font-typold text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    Read More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="rounded-full px-8 border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Load More Posts
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

