import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Clock, Users } from "lucide-react"

const features = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Fast and Reliable",
    description: "Our services are fast, reliable and efficient, ensuring a smooth experience for all our clients.",
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Secure and Private",
    description: "Your data and transactions are secure and private with our advanced protection systems.",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Easy to Use",
    description: "Our platform and services are designed to be intuitive and user-friendly for all clients.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Affordable Prices",
    description: "We offer competitive pricing without compromising on quality or service excellence.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white/40 backdrop-blur-sm" />

      <div className="relative max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We pride ourselves on delivering exceptional service and value to our clients through our commitment to
            excellence.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardContent className="p-8 relative">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -translate-x-1/2 translate-y-1/2 rotate-45 transform group-hover:bg-primary/10 transition-all duration-500"></div>

                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                  {feature.title}
                </h3>
                <p className="font-body text-gray-600 leading-relaxed relative z-10">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
