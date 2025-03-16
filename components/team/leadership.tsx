import Image from "next/image"

const leadershipTeam = [
  {
    id: 1,
    name: "Mohammed Al Fassi",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "With over 20 years of experience in real estate, Mohammed has led the company to become one of the most respected agencies in Marrakech.",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    role: "Chief Operations Officer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Fatima oversees all operational aspects of the company, ensuring that our clients receive the highest level of service and satisfaction.",
  },
  {
    id: 3,
    name: "Robert Chen",
    role: "Sales Director",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Robert leads our sales team with a focus on client relationships and market expertise, consistently achieving exceptional results.",
  },
]

export function TeamLeadership() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Meet the visionary leaders who guide our company with expertise, integrity, and a commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadershipTeam.map((leader) => (
            <div key={leader.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="aspect-square relative">
                <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                <p className="text-primary font-medium mb-4">{leader.role}</p>
                <p className="text-gray-600">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

