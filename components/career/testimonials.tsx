import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "Joining CENTURY 21 was the best career decision I've made. The supportive environment and comprehensive training have helped me grow professionally and achieve my goals.",
    name: "Yasmine Alaoui",
    role: "Senior Real Estate Agent",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    years: "5 years with the company",
  },
  {
    id: 2,
    quote:
      "What I appreciate most about working here is the collaborative culture. Everyone is willing to share knowledge and support each other, which creates a positive and productive workplace.",
    name: "Karim Benjelloun",
    role: "Property Marketing Specialist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    years: "3 years with the company",
  },
  {
    id: 3,
    quote:
      "The leadership team truly invests in your growth. They provide the resources, mentorship, and opportunities you need to advance your career in real estate.",
    name: "Nadia El Mansouri",
    role: "Real Estate Administrator",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    years: "2 years with the company",
  },
]

export function CareerTestimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Team Says</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hear from our team members about their experiences working at CENTURY 21.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-md">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-primary">{testimonial.years}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
