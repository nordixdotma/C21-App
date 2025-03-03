"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { Project } from "@/types"

interface PropertyContextType {
  hoveredProperty: number | null
  setHoveredProperty: (id: number | null) => void
  properties: Project[]
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export function PropertyProvider({
  children,
  properties,
}: {
  children: React.ReactNode
  properties: Project[]
}) {
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null)

  return (
    <PropertyContext.Provider
      value={{
        hoveredProperty,
        setHoveredProperty,
        properties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperty() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider")
  }
  return context
}

