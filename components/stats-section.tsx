"use client"

import { useEffect, useRef, useState } from "react"
import { stats } from "@/lib/constants"

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

function StatItem({ value, label }: { value: string; label: string }) {
  // Extract the number from the string (e.g., "100+" -> 100)
  const numberValue = Number.parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")

  const { count, ref } = useCountAnimation(numberValue)

  return (
    <div className="text-center" ref={ref}>
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-1 sm:mb-2">
        {count}
        {suffix}
      </h3>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-10 sm:py-16 md:py-24">
      <div className="max-w-[1170px] mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

