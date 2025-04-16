// Helper functions for Mapbox integration

// Generate a random color for map markers
export function getRandomColor(): string {
  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#8B5CF6", // purple
    "#EC4899", // pink
    "#06B6D4", // cyan
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Generate a random location near a center point
export function getRandomLocation(center: [number, number], radiusKm = 2): [number, number] {
  // Earth's radius in kilometers
  const earthRadius = 6371

  // Convert radius from kilometers to radians
  const radiusInRadians = radiusKm / earthRadius

  // Convert latitude and longitude to radians
  const [lng, lat] = center
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180

  // Generate a random angle and distance
  const randomAngle = Math.random() * 2 * Math.PI
  const randomDistance = Math.random() * radiusInRadians

  // Calculate new position
  const newLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(randomDistance) + Math.cos(latRad) * Math.sin(randomDistance) * Math.cos(randomAngle),
  )

  const newLngRad =
    lngRad +
    Math.atan2(
      Math.sin(randomAngle) * Math.sin(randomDistance) * Math.cos(latRad),
      Math.cos(randomDistance) - Math.sin(latRad) * Math.sin(newLatRad),
    )

  // Convert back to degrees
  const newLat = (newLatRad * 180) / Math.PI
  const newLng = (newLngRad * 180) / Math.PI

  return [newLng, newLat]
}

// Format popup HTML content
export function formatPopupHTML(title: string, subtitle?: string, price?: string, id?: number): string {
  return `
    <div class="p-2">
      <div class="font-bold text-sm">${title}</div>
      ${subtitle ? `<div class="text-xs text-gray-600">${subtitle}</div>` : ""}
      ${price ? `<div class="text-xs font-semibold text-primary mt-1">${price}</div>` : ""}
      ${id ? `<a href="/project/${id}" class="text-xs text-blue-500 hover:underline mt-1 inline-block">View Details</a>` : ""}
    </div>
  `
}
