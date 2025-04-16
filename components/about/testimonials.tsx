import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Working with CENTURY 21 Marrakech was a seamless experience from start to finish. Their knowledge of the local market and attention to detail made finding our dream home a pleasure.",
    name: "Sarah & John Thompson",
    location: "United Kingdom",
  },
  {
    quote:
      "As an international investor, I needed a team I could trust to handle my property purchases in Marrakech. The team's professionalism and expertise exceeded my expectations.",
    name: "Ahmed Al-Mansour",
    location: "UAE",
  },
  {
    quote:
      "The team went above and beyond to help us sell our villa. Their marketing strategy and negotiation skills resulted in a sale price that exceeded our expectations.",
    name: "Marie Dubois",
    location: "France",
  },
]

export function AboutTestimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
