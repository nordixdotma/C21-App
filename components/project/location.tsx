import { MapPin } from "lucide-react"

interface ProjectLocationProps {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  className?: string
}

export function ProjectLocation({ address, coordinates, className }: ProjectLocationProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-6">Location</h2>
      <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-5 hover:border-primary/50 hover:shadow-sm transition-all duration-200">
        <div className="bg-primary/10 p-2 rounded-full mt-0.5">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-lg">Address</p>
          <p className="mt-1 text-gray-600">{address}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

