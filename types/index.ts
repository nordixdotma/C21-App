export interface Project {
  id: number
  name: string
  image: string
  location: string
  developer: string
  handover: string
  price: string
  paymentPlan?: string
  status?: string
}

export interface NavItem {
  href: string
  label: string
}

export interface NavSection {
  label: string
  items: NavItem[]
}

export interface TeamMember {
  id: number
  name: string
  role: string
  specialization: string
  image: string
  whatsapp: string
}

export interface NewsArticle {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  category: string
}

export interface Stat {
  value: string
  label: string
}

export interface Guide {
  title: string
  subtitle: string
  image: string
}

export interface Partner {
  name: string
  logo: string
}

