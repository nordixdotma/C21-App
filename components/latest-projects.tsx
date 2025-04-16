"use client"

import { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/shared/project-card"
import "swiper/css"
import "swiper/css/pagination"
import type { Project } from "@/types"

export function LatestProjects({}: {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/projects/latest?limit=8")

        if (!response.ok) {
          throw new Error("Failed to fetch latest projects")
        }

        const data = await response.json()
        setProjects(data.projects || [])
      } catch (err) {
        console.error("Error fetching latest projects:", err)
        setError("Failed to load latest projects")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestProjects()
  }, [])

  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden">
        <div className="max-w-[1170px] mx-auto px-4 flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-white text-lg">Loading latest projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden">
        <div className="max-w-[1170px] mx-auto px-4 flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-white text-lg">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-white/20 text-black hover:bg-white/10"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Projects</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              No projects available yet. Check back soon for our latest listings.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.png')]"></div>
      </div>

      <div className="max-w-[1170px] mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-12 md:mb-16">
          <div>
            <h2 className="font-heading text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Latest Launched Projects in Marrakech
            </h2>
            <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/5 text-white hover:bg-primary hover:text-white hover:border-primary"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/5 text-white hover:bg-primary hover:text-white hover:border-primary"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.1}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              type: "bullets",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible pb-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard project={project} layout="vertical" showBadge={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
