"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectGalleryProps {
  images: string[]
  className?: string
}

export function ProjectGallery({ images, className }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={images[activeImage] || "/placeholder.svg"}
          alt="Project image"
          fill
          className="object-cover transition-all duration-300"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden transition-all",
              "hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary",
              activeImage === index && "ring-2 ring-primary",
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

