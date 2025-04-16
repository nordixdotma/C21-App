import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Home, Users, Star } from "lucide-react"

const achievements = [
  {
    icon: Trophy,
    value: "15+",
    label: "Years of Excellence",
    description: "Serving the Marrakech real estate market since 2005",
  },
  {
    icon: Home,
    value: "1,500+",
    label: "Properties Sold",
    description: "Successfully closed transactions across all property types",
  },
  {
    icon: Users,
    value: "3,000+",
    label: "Satisfied Clients",
    description: "Local and international clients who trust our expertise",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Client Satisfaction",
    description: "Average rating from our clients' feedback",
  },
]

export function AboutAchievements() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A track record of success built on expertise, dedication, and client satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{achievement.value}</h3>
                <p className="text-lg font-semibold mb-2">{achievement.label}</p>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
