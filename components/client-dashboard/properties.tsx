import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MousePointerClick } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for client properties
const clientProperties = [
  {
    id: 1,
    name: "Hivernage Villa",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Hivernage, Marrakech",
    price: "4,500,000 MAD",
    status: "active",
    views: 124,
    contactClicks: 18,
    lastVisit: "2 days ago",
  },
  {
    id: 2,
    name: "Palm Grove Apartment",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Palm Grove, Marrakech",
    price: "2,200,000 MAD",
    status: "active",
    views: 86,
    contactClicks: 12,
    lastVisit: "1 week ago",
  },
  {
    id: 3,
    name: "Gueliz Apartment",
    image: "https://th.bing.com/th/id/OIP.8cskRuPcOdZkMfkpG6bccAHaEo?rs=1&pid=ImgDetMain",
    location: "Gueliz, Marrakech",
    price: "1,800,000 MAD",
    status: "pending",
    views: 38,
    contactClicks: 6,
    lastVisit: "2 weeks ago",
  },
]

export function ClientProperties() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-typold text-2xl font-semibold">My Properties</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
              <Badge
                className={`absolute top-2 right-2 ${property.status === "active" ? "bg-green-500" : "bg-amber-500"}`}
              >
                {property.status === "active" ? "Active" : "Pending"}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{property.name}</CardTitle>
              <p className="text-sm text-gray-500">{property.location}</p>
              <p className="font-semibold text-primary">{property.price}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-medium">{property.views}</span>
                </div>
                <Progress value={(property.views / 200) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Contact Clicks</span>
                  </div>
                  <span className="font-medium">{property.contactClicks}</span>
                </div>
                <Progress value={(property.contactClicks / 50) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last visit:</span>
                  <span className="text-sm">{property.lastVisit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

