import Image from "next/image"
import Link from "next/link"
import { Building2, Calendar, FileText } from "lucide-react"

const navigation = [
  {
    name: "My Properties",
    href: "/client-dashboard?tab=properties",
    icon: Building2,
  },
  {
    name: "Appointments",
    href: "/client-dashboard?tab=appointments",
    icon: Calendar,
  },
  {
    name: "Visit Reports",
    href: "/client-dashboard?tab=reports",
    icon: FileText,
  },
]

export function ClientDashboardNav() {
  return (
    <div className="hidden w-64 border-r bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b px-6 py-4">
          <Image src="/C21 logo rbz.png" alt="CENTURY 21" width={120} height={60} className="w-32" />
        </div>

        <div className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-oakes">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

