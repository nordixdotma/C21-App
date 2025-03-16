import Image from "next/image"
import { Mail, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

// Update the language data structure to use image URLs instead of emoji flags
const teamMembers = [
  {
    id: 1,
    name: "Ines Ghak",
    role: "Senior Property Advisor",
    specialization: "Luxury Villas",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    email: "ines.ghak@century21.ma",
    phone: "+212 664 722 488",
    languages: [
      { code: "ar", name: "Arabic", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" },
      { code: "fr", name: "French", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" },
      {
        code: "en",
        name: "English",
        flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
      },
      { code: "es", name: "Spanish", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg" },
    ],
  },
  {
    id: 2,
    name: "Sadghi Mhamdi",
    role: "Property Advisor",
    specialization: "Off Plan Properties",
    image: "https://th.bing.com/th/id/OIP.ZP-E8ZFH11wb1XSm0dn-5wHaJQ?rs=1&pid=ImgDetMain",
    email: "sadghi.mhamdi@century21.ma",
    phone: "+212 623 456 789",
    languages: [
      { code: "ar", name: "Arabic", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" },
      { code: "fr", name: "French", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" },
      {
        code: "en",
        name: "English",
        flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
      },
    ],
  },
  {
    id: 3,
    name: "Redouane Zerzouri",
    role: "Property Advisor",
    specialization: "Commercial Properties",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    email: "redouane.zerzouri@century21.ma",
    phone: "+212 634 567 890",
    languages: [
      { code: "ar", name: "Arabic", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" },
      { code: "fr", name: "French", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" },
      {
        code: "en",
        name: "English",
        flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
      },
      { code: "de", name: "German", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg" },
    ],
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Senior Property Consultant",
    specialization: "Beachfront Properties",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    email: "sarah.johnson@century21.ma",
    phone: "+212 645 678 901",
    languages: [
      {
        code: "en",
        name: "English",
        flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
      },
      { code: "fr", name: "French", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" },
      { code: "it", name: "Italian", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg" },
    ],
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    role: "Property Advisor",
    specialization: "Investment Properties",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    email: "ahmed.hassan@century21.ma",
    phone: "+212 656 789 012",
    languages: [
      { code: "ar", name: "Arabic", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" },
      { code: "fr", name: "French", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" },
      {
        code: "en",
        name: "English",
        flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
      },
    ],
  },
  {
    id: 6,
    name: "Laila Benali",
    role: "Luxury Property Specialist",
    specialization: "Penthouse & High-End Residences",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    email: "laila.benali@century21.ma",
    phone: "+212 667 890 123",
    languages: [
      { code: "ar", name: "Arabic", flag: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" },
      { code: "fr", name: "French", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" },
      {
        code: "en",
        name: "English",
        flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
      },
      { code: "ru", name: "Russian", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    ],
  },
]

export function TeamGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Real Estate Experts</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals is dedicated to helping you find your dream property or sell your
            existing one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.specialization}</p>

                <div className="space-y-3 mb-4 flex-grow">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 min-w-4 mr-2" />
                    <a href={`mailto:${member.email}`} className="text-sm hover:text-primary truncate">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 min-w-4 mr-2" />
                    <a href={`tel:${member.phone}`} className="text-sm hover:text-primary">
                      {member.phone}
                    </a>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <Globe className="h-4 w-4 min-w-4 mr-2 mt-1" />
                    <div className="flex flex-wrap gap-1.5">
                      {member.languages.map((language) => (
                        <div
                          key={language.code}
                          className="flex items-center bg-gray-100 rounded-full px-2 py-0.5"
                          title={language.name}
                        >
                          <div className="w-4 h-3 mr-1.5 relative overflow-hidden">
                            <Image
                              src={language.flag || "/placeholder.svg"}
                              alt={`${language.name} flag`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs">{language.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${member.phone.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-auto"
                >
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Contact on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

