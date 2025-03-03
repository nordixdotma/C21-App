import { BarChart3, Building2, CircleDollarSign, Home } from "lucide-react"

const stats = [
  {
    name: "Total Projects",
    value: "45",
    change: "+4.75%",
    icon: Building2,
  },
  {
    name: "Active Listings",
    value: "23",
    change: "+10.25%",
    icon: Home,
  },
  {
    name: "Total Revenue",
    value: "12.4M MAD",
    change: "+12.5%",
    icon: CircleDollarSign,
  },
  {
    name: "Avg. Price",
    value: "2.1M MAD",
    change: "+8.2%",
    icon: BarChart3,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-oakes text-sm text-gray-500">{stat.name}</p>
              <div className="flex items-baseline gap-2">
                <p className="font-typold text-2xl font-semibold">{stat.value}</p>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

