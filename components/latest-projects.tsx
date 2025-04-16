"use client"

import { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/shared/project-card"
import "swiper/css"
import "swiper/css/pagination"

export function LatestProjects({}: {}) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const allProjects = JSON.parse(savedProjects)
      // Get the most recent projects (sort by date if available, or just take the last 8)
      const sortedProjects = allProjects
        .filter((project) => project.status === "available") // Only show available projects
        .sort((a, b) => {
          // Sort by created date if available
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          }
          return 0
        })
        .slice(0, 8) // Take the most recent 8 projects

      setProjects(sortedProjects)
    }
  }, [])

  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

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
