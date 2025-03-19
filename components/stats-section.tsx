"use client"

import { useEffect, useRef, useState } from "react"
import { stats } from "@/lib/constants"
import { cn } from "@/lib/utils"

function useCountAnimation(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const currentRef = countRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  useEffect(() => {
    if (!isIntersecting) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [end, duration, isIntersecting])

  return { count, ref: countRef }
}

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  // Extract the number from the string (e.g., "100+" -> 100)
  const numberValue = Number.parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")

  const { count, ref } = useCountAnimation(numberValue)

  return (
    <div
      className={cn("text-center transform transition-all duration-700", "hover:scale-105")}
      ref={ref}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative">
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-2">
          {count}
          {suffix}
        </h3>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary/30 rounded-full"></div>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mt-4">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

