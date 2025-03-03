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
        <DetailItem label="Bedrooms" value={details.bedrooms} />
        <DetailItem label="Rooms" value={details.rooms} />
        <DetailItem label="Bathrooms" value={details.bathrooms} />
        <DetailItem label="Area Size" value={`${details.areaSize} ${details.sizePostfix}`} />
        <DetailItem label="Land Area" value={`${details.landArea} ${details.landAreaPostfix}`} />
        <DetailItem label="Garages" value={details.garages} />
        <DetailItem label="Garage Size" value={details.garageSize} />
        <DetailItem label="Property ID" value={details.propertyId} />
        <DetailItem label="Year Built" value={details.yearBuilt} />
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-gray-200 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  )
}

