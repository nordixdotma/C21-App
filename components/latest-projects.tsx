"use client"

import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Project } from "@/types"
import { featuredProjects } from "@/lib/constants"

export function LatestProjects({ projects = featuredProjects }: { projects?: Project[] }) {
  const swiperRef = useRef<Swiper | null>(null)

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            Latest Launched Projects in Marrakech
          </h2>
          <div className="flex gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full p-0"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full p-0"
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            width={600}
            height={450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {project.paymentPlan && (
          <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
            {project.paymentPlan}
          </div>
        )}
        {project.status && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
            {project.status}
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {project.name}
        </h3>
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center text-gray-600 font-body">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs sm:text-sm line-clamp-1">{project.location}</span>
          </div>
          <div className="flex items-center text-gray-600 font-body">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-xs sm:text-sm line-clamp-1">{project.developer}</span>
          </div>
          <div className="flex items-center text-gray-600 font-body">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs sm:text-sm">{project.handover}</span>
          </div>
        </div>
        <div className="pt-3 sm:pt-4 border-t">
          <Button variant="secondary" className="w-full rounded-full text-xs sm:text-sm">
            {project.price}
          </Button>
        </div>
      </div>
    </div>
  )
}

