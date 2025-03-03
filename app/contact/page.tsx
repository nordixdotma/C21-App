import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/hero"
import { ContactForm } from "@/components/contact/form"
import { ContactInfo } from "@/components/contact/info"
import { ContactMap } from "@/components/contact/map"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <ContactHero />
        <div className="max-w-[1170px] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
        <ContactMap />
      </main>
      <Footer />
    </div>
  )
}

