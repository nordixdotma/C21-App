"use client"
import dynamic from "next/dynamic"

// Dynamically import Leaflet with no SSR
const LeafletMap = dynamic(() => import("./leaflet-map"), { ssr: false })

export function ContactMap() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <h2 className="font-typold text-2xl md:text-3xl font-bold mb-8 text-center">Find Us</h2>
        <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <LeafletMap
            latitude={31.6295}
            longitude={-7.9811}
            popupContent="<strong>CENTURY 21</strong><br>123 Business Avenue<br>Hivernage, Marrakech"
          />
        </div>
      </div>
    </section>
  )
}

