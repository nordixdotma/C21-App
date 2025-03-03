"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { featuredProjects } from "@/lib/constants"
import {
  Loader2,
  MapPin,
  Car,
  Calendar,
  Phone,
  Mail,
  BedDouble,
  Bath,
  Square,
  CheckCircle2,
  PhoneIcon as WhatsappIcon,
} from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, FreeMode, Thumbs } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { ProductHeader } from "@/components/product-header"
import { useRouter } from "next/navigation"

// Dummy images array for demonstration
const dummyImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
]

const features = [
  "Air Conditioning",
  "Barbeque",
  "Dryer",
  "Gym",
  "Laundry",
  "Swimming Pool",
  "WiFi",
  "Window Coverings",
  "Parking",
  "Security System",
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const projectData = featuredProjects.find((p) => p.id === Number.parseInt(params.id))
    if (projectData) {
      setProject({
        ...projectData,
        images: dummyImages,
        description:
          "This luxurious property offers the perfect blend of comfort and sophistication. Featuring modern amenities and stunning views, it's an ideal choice for those seeking an exceptional living experience in the heart of Marrakech. The property has been designed with attention to detail, incorporating both traditional Moroccan elements and contemporary luxury features.",
        details: {
          bedrooms: "4",
          bathrooms: "3",
          rooms: "6",
          area: "250",
          landArea: "300",
          garage: "2",
          garageSize: "40",
          propertyId: "PRO-001",
          yearBuilt: "2023",
        },
        address: {
          street: "123 Palm Grove Avenue",
          district: "Palmeraie",
          city: "Marrakech",
          country: "Morocco",
        },
        features: features,
        video: "https://www.youtube.com/embed/your-video-id",
        agent: {
          name: "Ines ghak",
          phone: "06.64.72.24.88",
          email: "Q.huaux@areis.ma",
          whatsapp: "+212664722488",
        },
      })
    }
    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    router.push("/404")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <ProductHeader />

      <main className="flex-grow pt-16 sm:pt-24 md:pt-[calc(36px+64px)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-8">
              {/* Title Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="font-oakes">{project.location}</span>
                </div>
                <h1 className="font-typold text-3xl font-bold">{project.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-semibold text-primary">{project.price}</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">{project.handover}</span>
                </div>
              </div>

              {/* Gallery Section */}
              <div className="space-y-2 sm:space-y-4">
                <Swiper
                  spaceBetween={8}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Navigation, Thumbs]}
                  className="aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden"
                >
                  {project.images.map((image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={8}
                  slidesPerView={3.5}
                  breakpoints={{
                    640: {
                      slidesPerView: 4.5,
                    },
                  }}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="h-16 sm:h-24"
                >
                  {project.images.map((image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.name} - Thumbnail ${index + 1}`}
                          fill
                          className="object-cover hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Details Section */}
              <div id="details" className="space-y-6">
                <h2 className="font-typold text-xl sm:text-2xl font-semibold">Property Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <BedDouble className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-medium">{project.details.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bath className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-medium">{project.details.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium">{project.details.area} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Land Area</p>
                      <p className="font-medium">{project.details.landArea} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Garage</p>
                      <p className="font-medium">{project.details.garage} Cars</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-medium">{project.details.yearBuilt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div id="description" className="space-y-4">
                <h2 className="font-typold text-xl sm:text-2xl font-semibold">Description</h2>
                <p className="font-oakes text-gray-600 leading-relaxed">{project.description}</p>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h2 className="font-typold text-xl sm:text-2xl font-semibold">Address</h2>
                <div className="space-y-2">
                  <p className="font-oakes text-gray-600">{project.address.street}</p>
                  <p className="font-oakes text-gray-600">{project.address.district}</p>
                  <p className="font-oakes text-gray-600">
                    {project.address.city}, {project.address.country}
                  </p>
                </div>
              </div>

              {/* Features Section */}
              <div id="features" className="space-y-6">
                <h2 className="font-typold text-xl sm:text-2xl font-semibold">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {project.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="font-oakes text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Section */}
              <div id="video" className="space-y-6">
                <h2 className="font-typold text-xl sm:text-2xl font-semibold">Property Video</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <iframe src={project.video} className="w-full h-full" allowFullScreen />
                </div>
              </div>

              {/* Map Section */}
              <div id="location" className="space-y-6">
                <h2 className="font-typold text-xl sm:text-2xl font-semibold">Location</h2>
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                  {/* Map component would go here */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">Map placeholder</div>
                </div>
              </div>

              {/* Similar Projects */}
              <div className="space-y-6">
                <h2 className="font-typold text-xl sm:text-2xl font-semibold">Similar Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {featuredProjects.slice(0, 2).map((similarProject) => (
                    <Link
                      key={similarProject.id}
                      href={similarProject.id ? `/projects/${similarProject.id}` : "#"}
                      className="group block bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden">
                          <Image
                            src={similarProject.image || "/placeholder.svg"}
                            alt={similarProject.name}
                            width={600}
                            height={450}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        {similarProject.paymentPlan && (
                          <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
                            {similarProject.paymentPlan}
                          </div>
                        )}
                        {similarProject.status && (
                          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                            {similarProject.status}
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4 md:p-6">
                        <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {similarProject.name}
                        </h3>
                        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                          <div className="flex items-center text-gray-600 font-body">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                            <span className="text-xs sm:text-sm line-clamp-1">{similarProject.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600 font-body">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{similarProject.handover}</span>
                          </div>
                        </div>
                        <div className="pt-3 sm:pt-4 border-t">
                          <div className="w-full rounded-full bg-secondary text-white hover:bg-secondary/90 px-4 py-2 text-xs sm:text-sm transition-colors">
                            {similarProject.price}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-typold text-xl sm:text-2xl font-semibold">Contact Agent</h3>
                    <div className="space-y-2">
                      <p className="font-oakes font-medium text-lg">{project.agent.name}</p>
                      <a
                        href={`tel:${project.agent.phone}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="font-oakes">{project.agent.phone}</span>
                      </a>
                      <a
                        href={`mailto:${project.agent.email}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="font-oakes">{project.agent.email}</span>
                      </a>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${project.agent.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <WhatsappIcon className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href={`https://wa.me/${project.agent.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors md:hidden"
        >
          <WhatsappIcon className="h-6 w-6" />
        </a>
      </main>
      <Footer />
    </div>
  )
}

