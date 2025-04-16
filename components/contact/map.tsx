"use client"

export function ContactMap() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <h2 className="font-typold text-2xl md:text-3xl font-bold mb-8 text-center">Find Us</h2>
        <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.0714246083!2d-7.983298824999999!3d31.629500000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ2LjIiTiA3wrA1OCc1OS45Ilc!5e0!3m2!1sen!2sus!4v1618870000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CENTURY 21 Office Location"
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}
