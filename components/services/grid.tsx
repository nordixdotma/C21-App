import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, PencilRuler, Building, BarChart4, CreditCard } from "lucide-react"

const services = [
  {
    id: "consulting",
    title: "Real Estate Consulting",
    description:
      "Expert advice on property investments, market trends, and strategic decision-making for buyers, sellers, and investors.",
    icon: Briefcase,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Investment strategy development",
      "Market analysis and research",
      "Portfolio optimization",
      "Risk assessment and management",
    ],
  },
  {
    id: "amenagement",
    title: "Property Development",
    description:
      "Comprehensive development services from land acquisition to project completion, ensuring maximum value and quality.",
    icon: Building,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Land acquisition assistance",
      "Development planning",
      "Project management",
      "Quality control and monitoring",
    ],
  },
  {
    id: "architecture",
    title: "Architectural Services",
    description:
      "Creative and functional architectural solutions for residential and commercial properties, tailored to your vision.",
    icon: PencilRuler,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Conceptual design", "Detailed planning", "3D visualization", "Construction documentation"],
  },
  {
    id: "banking",
    title: "Banking Assistance",
    description:
      "Streamlined financing solutions and banking support to help you secure the best mortgage terms and conditions.",
    icon: CreditCard,
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Mortgage application support",
      "Financing options comparison",
      "Documentation preparation",
      "Negotiation with financial institutions",
    ],
  },
  {
    id: "valuation",
    title: "Property Valuation",
    description:
      "Accurate and comprehensive property valuations based on market analysis, property condition, and location factors.",
    icon: BarChart4,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "Market-based valuation",
      "Detailed property assessment",
      "Comparative market analysis",
      "Investment potential evaluation",
    ],
  },
]

export function ServicesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Real Estate Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At CENTURY 21, we offer a wide range of professional services to meet all your real estate needs, from
            consulting and development to architecture and financing.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center`}
            >
              <div className="lg:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="bg-primary hover:bg-primary/90">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

