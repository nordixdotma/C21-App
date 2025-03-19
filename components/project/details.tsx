import type React from "react"
import { Bed, Bath, Home, Square, Maximize, Car, CalendarDays, Hash } from "lucide-react"

interface ProjectDetailsProps {
  details: {
    bedrooms: string
    rooms: string
    bathrooms: string
    areaSize: string
    sizePostfix: string
    landArea: string
    landAreaPostfix: string
    garages: string
    garageSize: string
    propertyId: string
    yearBuilt: string
  }
  className?: string
}

export function ProjectDetails({ details, className }: ProjectDetailsProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-6">Property Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DetailItem icon={<Bed className="h-5 w-5 text-primary" />} label="Bedrooms" value={details.bedrooms} />
        <DetailItem icon={<Home className="h-5 w-5 text-primary" />} label="Rooms" value={details.rooms} />
        <DetailItem icon={<Bath className="h-5 w-5 text-primary" />} label="Bathrooms" value={details.bathrooms} />
        <DetailItem
          icon={<Square className="h-5 w-5 text-primary" />}
          label="Area Size"
          value={`${details.areaSize} ${details.sizePostfix}`}
        />
        <DetailItem
          icon={<Maximize className="h-5 w-5 text-primary" />}
          label="Land Area"
          value={`${details.landArea} ${details.landAreaPostfix}`}
        />
        <DetailItem icon={<Car className="h-5 w-5 text-primary" />} label="Garages" value={details.garages} />
        <DetailItem icon={<Square className="h-5 w-5 text-primary" />} label="Garage Size" value={details.garageSize} />
        <DetailItem icon={<Hash className="h-5 w-5 text-primary" />} label="Property ID" value={details.propertyId} />
        <DetailItem
          icon={<CalendarDays className="h-5 w-5 text-primary" />}
          label="Year Built"
          value={details.yearBuilt}
        />
      </div>
    </div>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium">{value}</p>
        </div>
      </div>
    </div>
  )
}

