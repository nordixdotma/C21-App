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
      <div className="flex items-start gap-3 rounded-lg border p-4">
        <MapPin className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <p className="font-medium">Address</p>
          <p className="mt-1 text-gray-600">{address}</p>
          <p className="mt-1 text-sm text-gray-500">
            Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  )
}

