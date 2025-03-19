"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProjectGalleryProps {
  images: string[]
  className?: string
}

export function ProjectGallery({ images, className }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [fullscreenActive, setFullscreenActive] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  const handlePrevious = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      handlePrevious()
    }
  }

  useEffect(() => {
    // Scroll the active thumbnail into view
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.querySelector(`[data-index="${activeImage}"]`)
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeImage])

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[activeImage] || "/placeholder.svg"}
            alt="Project image"
            fill
            className="object-cover transition-all duration-300"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => setFullscreenActive(true)}
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
                  <div className="relative h-[80vh]">
                    <Image
                      src={images[activeImage] || "/placeholder.svg"}
                      alt="Project image fullscreen"
                      fill
                      className="object-contain"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                      onClick={() => setFullscreenActive(false)}
                    >
                      <Maximize2 className="h-5 w-5" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-10 w-10"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-10 w-10"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {activeImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        ref={thumbnailsRef}
      >
        {images.map((image, index) => (
          <button
            key={index}
            data-index={index}
            onClick={() => setActiveImage(index)}
            className={cn(
              "relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-md transition-all snap-start",
              "hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary",
              activeImage === index ? "ring-2 ring-primary" : "ring-1 ring-gray-200",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Project image ${index + 1}`}
              fill
              className={cn("object-cover transition-all duration-300", activeImage !== index && "hover:opacity-75")}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

