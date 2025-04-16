import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

const partnershipBenefits = [
  "Exclusive marketing and sales representation",
  "Comprehensive market analysis and pricing strategy",
  "International client network and marketing reach",
  "Dedicated sales team for your development projects",
  "Regular performance reporting and insights",
  "Tailored marketing campaigns and materials",
]

export function DevelopersPartnership() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
            <p className="text-gray-600 mb-8">
              CENTURY 21 offers comprehensive marketing and sales solutions for developers. Our experienced team can
              help you maximize the value of your development and achieve your sales targets.
            </p>

            <div className="space-y-4 mb-8">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Contact Our Developer Relations Team</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your company"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Details
                </label>
                <textarea
                  id="project"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Tell us about your development project"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
