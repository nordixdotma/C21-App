import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutCTA() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or rent property in Marrakech, our team of experts is here to help you
            every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/our-team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
