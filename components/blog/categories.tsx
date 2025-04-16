"use client"

import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", name: "All Posts" },
  { id: "market-insights", name: "Market Insights" },
  { id: "investment", name: "Investment" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "news", name: "News" },
]

interface BlogCategoriesProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export function BlogCategories({ activeCategory, setActiveCategory }: BlogCategoriesProps) {
  return (
    <section className="py-8 bg-gray-50 border-b">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === category.id ? "bg-primary hover:bg-primary/90 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
