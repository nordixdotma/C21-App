"use client"

import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types"
import { featuredProjects } from "@/lib/constants"
import { ProjectCard } from "@/components/shared/project-card"

export function LatestProjects({ projects = featuredProjects }: { projects?: Project[] }) {
  const swiperRef = useRef<Swiper | null>(null)

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-black overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
          <h2 className="font-heading text-white text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            Latest Launched Projects in Marrakech
          </h2>
          <div className="flex gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="w-8 text-white bg-black border-2 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full p-0"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 text-white bg-black border-2 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full p-0"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Navigation]}
            spaceBetween={12}
            slidesPerView={1.1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

