import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, DollarSign, GraduationCap, Heart, Users } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Attractive base salary with performance-based commissions and bonuses.",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description: "Ongoing training, mentorship, and opportunities to earn industry certifications.",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Comprehensive health insurance coverage for you and your family.",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Flexible scheduling options and paid time off to help you recharge.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description: "Work with a supportive team that celebrates success together.",
  },
  {
    icon: Award,
    title: "Recognition Programs",
    description: "Regular recognition of achievements and contributions to the team.",
  },
]

export function CareerBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Work With Us</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At CENTURY 21, we believe in creating an environment where our team members can thrive professionally and
            personally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
