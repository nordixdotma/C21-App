import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, StarHalf, Building2, Award, ThumbsUp, Trophy } from "lucide-react"

// Enhanced mock data for developers with ratings
const developers = [
  {
    id: 1,
    name: "M Avenue Development",
    logo: "https://th.bing.com/th/id/OIP.1wbWdnHgyLr0rfU8d772WQHaE8?rs=1&pid=ImgDetMain",
    description:
      "A leading developer specializing in luxury mixed-use developments that combine residential, retail, and hospitality components.",
    projects: 12,
    established: 2005,
    rating: 4.8,
    specialties: ["Luxury Residences", "Mixed-Use Developments", "Urban Projects"],
    featuredProject: "M Avenue Residences",
    rank: 1,
    completedOnTime: "98%",
    customerSatisfaction: "96%",
  },
  {
    id: 2,
    name: "Palmeraie Développement",
    logo: "https://th.bing.com/th/id/OIP.uRV90AwL0dYWhCT3tfJE9AHaD2?rs=1&pid=ImgDetMain",
    description:
      "Renowned for creating iconic residential communities that blend traditional Moroccan architecture with modern amenities.",
    projects: 25,
    established: 1987,
    rating: 4.5,
    specialties: ["Residential Communities", "Golf Resorts", "Luxury Villas"],
    featuredProject: "Agdal Gardens",
    rank: 2,
    completedOnTime: "95%",
    customerSatisfaction: "92%",
  },
  {
    id: 3,
    name: "Atlas Hospitality",
    logo: "https://th.bing.com/th/id/OIP.uvN6Wj_BHa5WTCESqvnjigHaDt?rs=1&pid=ImgDetMain",
    description:
      "Specializing in high-end residential and hospitality projects that offer exceptional living experiences in prime locations.",
    projects: 18,
    established: 1995,
    rating: 4.3,
    specialties: ["Luxury Hotels", "Serviced Apartments", "Resort Villas"],
    featuredProject: "Palm Grove Villas",
    rank: 3,
    completedOnTime: "92%",
    customerSatisfaction: "90%",
  },
  {
    id: 4,
    name: "Majestic Properties",
    logo: "https://th.bing.com/th/id/R.675fe0988229c421b089b6f861ee7342?rik=Jf4WBTBM90jniQ&pid=ImgRaw&r=0&sres=1&sresct=1",
    description:
      "An innovative developer focused on creating contemporary urban living spaces with cutting-edge design and technology.",
    projects: 9,
    established: 2010,
    rating: 4.2,
    specialties: ["Smart Homes", "Urban Apartments", "Sustainable Design"],
    featuredProject: "The Pearl Residences",
    rank: 4,
    completedOnTime: "90%",
    customerSatisfaction: "88%",
  },
]

// Helper function to render star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

export function DevelopersGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top-Rated Developer Partners</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We collaborate with the most reputable developers in Marrakech, ranked by performance, quality, and customer
            satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((developer) => (
            <div
              key={developer.id}
              className="flex flex-col h-full relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              {/* Rank badge */}
              <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 rounded-br-lg z-10 flex items-center">
                <Trophy className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs font-bold">Rank #{developer.rank}</span>
              </div>

              {/* Logo container */}
              <div className="flex justify-center items-center p-6 bg-white h-40">
                <div className="relative h-24 w-full">
                  <Image
                    src={developer.logo || "/placeholder.svg"}
                    alt={developer.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{developer.name}</h3>
                  <Badge className="bg-gray-100 text-gray-700 whitespace-nowrap">Est. {developer.established}</Badge>
                </div>

                {/* Star rating */}
                <div className="mb-3">
                  <StarRating rating={developer.rating} />
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{developer.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center justify-center">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Building2 className="h-3 w-3 mr-1" />
                      <span>Projects</span>
                    </div>
                    <span className="font-bold">{developer.projects}+</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center justify-center">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Award className="h-3 w-3 mr-1" />
                      <span>On Time</span>
                    </div>
                    <span className="font-bold">{developer.completedOnTime}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center justify-center">
                    <div className="flex items-center text-gray-500 mb-1">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span>Satisfied</span>
                    </div>
                    <span className="font-bold">{developer.customerSatisfaction}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4 mt-auto">
                  <div className="text-xs text-gray-500 mb-1">Specialties:</div>
                  <div className="flex flex-wrap gap-1">
                    {developer.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-[10px] px-1.5 py-0">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-xs h-9">View Projects</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

