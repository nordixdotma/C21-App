import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Globe, Award, Heart, Lightbulb } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We conduct our business with the highest ethical standards, transparency, and honesty in every interaction.",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description:
      "Our clients' needs and goals are at the center of everything we do, ensuring personalized service and satisfaction.",
  },
  {
    icon: Globe,
    title: "Local Expertise",
    description:
      "Deep knowledge of Marrakech's neighborhoods, market trends, and cultural nuances to guide your decisions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in all aspects of our service, from property marketing to client communication.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our team is passionate about real estate and dedicated to helping clients find their perfect property.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace innovative technologies and approaches to provide the best possible service and results.",
  },
]

export function AboutValues() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            These principles guide our approach to business and ensure we deliver exceptional service to every client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

