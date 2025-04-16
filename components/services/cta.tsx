import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ServicesCTA() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/90 to-primary rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Have Questions About Our Services?</h2>
            <p className="text-white/90 mb-8">
              Our team of real estate experts is ready to assist you. Contact us today to discuss your needs and
              discover the perfect solution for your property goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">
                  Contact Us Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-primary hover:bg-white/10" asChild>
                <Link href="/our-team">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
