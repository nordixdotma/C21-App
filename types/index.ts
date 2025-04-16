export interface Guide {
  title: string
  subtitle: string
  image: string
}

export interface NavSection {
  label: string
  items: {
    href: string
    label: string
  }[]
}

export interface NewsArticle {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  category: string
  content: string[]
}

export interface Partner {
  name: string
  logo: string
}

export interface Stat {
  value: string
  label: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  specialization: string
  image: string
  whatsapp: string
}

export interface Project {
  id: number
  name: string
  image: string
  location: string
  price: string
  priceType?: string
  type: string
  status?: string
  bedrooms?: string
  bathrooms?: string
  areaSize?: string
  sizePostfix?: string
  description?: string
  features?: string[]
  date: string
  isNew: boolean
  isFeatured: boolean
  developer?: string
}
