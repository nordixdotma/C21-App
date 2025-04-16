import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function TeamJoin() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="bg-primary/10 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-gray-600 mb-8">
              Are you passionate about real estate and looking for an opportunity to grow your career? We're always
              looking for talented individuals to join our team.
            </p>
            <Link href="/career">
              <Button className="bg-primary hover:bg-primary/90">
                View Career Opportunities <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
