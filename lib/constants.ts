import type { Guide, NavSection, NewsArticle, Partner, Project, Stat, TeamMember } from "@/types"

export const buyMenuItems: NavSection[] = [
  {
    label: "Properties",
    items: [
      { href: "/buy/houses", label: "Houses" },
      { href: "/buy/apartments", label: "Apartments" },
      { href: "/buy/villas", label: "Villas" },
      { href: "/buy/commercial", label: "Commercial" },
    ],
  },
  {
    label: "Popular Areas",
    items: [
      { href: "/buy/hivernage", label: "Hivernage" },
      { href: "/buy/gueliz", label: "Gueliz" },
      { href: "/buy/palm-grove", label: "Palm Grove" },
      { href: "/buy/agdal", label: "Agdal" },
    ],
  },
]

export const rentMenuItems: NavSection[] = [
  {
    label: "Properties",
    items: [
      { href: "/rent/houses", label: "Houses" },
      { href: "/rent/apartments", label: "Apartments" },
      { href: "/rent/villas", label: "Villas" },
    ],
  },
  {
    label: "Popular Areas",
    items: [
      { href: "/rent/hivernage", label: "Hivernage" },
      { href: "/rent/gueliz", label: "Gueliz" },
      { href: "/rent/palm-grove", label: "Palm Grove" },
    ],
  },
]

export const moreMenuItems: NavSection[] = [
  {
    label: "Resources",
    items: [
      { href: "/blog", label: "Blog" },
      { href: "/faqs", label: "FAQs" },
      { href: "/careers", label: "Careers" },
    ],
  },
]

export const stats: Stat[] = [
  { value: "100+", label: "Happy Clients" },
  { value: "500+", label: "Properties Sold" },
  { value: "10+", label: "Years of Experience" },
  { value: "200+", label: "Properties Listed" },
]

export const guides: Guide[] = [
  {
    title: "Buying Guide",
    subtitle: "How to Buy Property in Marrakech",
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Buying Offplan Guide",
    subtitle: "How to Buy Off Plan in Marrakech",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Renting Guide",
    subtitle: "How to Rent Property in Marrakech",
    image: "https://images.unsplash.com/photo-1560518883-2d5b0d9e2b05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Selling Guide",
    subtitle: "How to Sell Property in Marrakech",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
]

export const featuredProjects: Project[] = [
    {
      "id": 1,
      "name": "M Avenue Residences",
      "location": "Hivernage, Marrakech",
      "developer": "M Avenue Development",
      "handover": "Handover in Q4 2024",
      "price": "from MAD 2.5M",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      "id": 2,
      "name": "Agdal Gardens",
      "location": "Agdal, Marrakech",
      "developer": "Palmeraie Développement",
      "handover": "Handover in Q2 2025",
      "price": "from MAD 1.8M",
      "image": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      "id": 3,
      "name": "Palm Grove Villas",
      "location": "La Palmeraie, Marrakech",
      "developer": "Atlas Hospitality",
      "handover": "Handover in Q3 2024",
      "price": "from MAD 4.2M",
      "image": "https://images.unsplash.com/photo-1613977257592-6205e87d73a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      "id": 4,
      "name": "The Pearl Residences",
      "location": "Gueliz, Marrakech",
      "developer": "Majestic Properties",
      "handover": "Handover in Q1 2026",
      "price": "from MAD 3.1M",
      "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      "id": 5,
      "name": "Oasis Golf Villas",
      "location": "Amelkis, Marrakech",
      "developer": "Oasis Developments",
      "handover": "Handover in Q4 2025",
      "price": "from MAD 5.5M",
      "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      "id": 6,
      "name": "Royal Heights",
      "location": "Targa, Marrakech",
      "developer": "Royal Estates",
      "handover": "Handover in Q2 2024",
      "price": "from MAD 2.2M",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      "id": 7,
      "name": "Atlas Skyview",
      "location": "City Center, Marrakech",
      "developer": "Skyline Developments",
      "handover": "Handover in Q3 2025",
      "price": "from MAD 2.9M",
      "image": "https://images.unsplash.com/photo-1483097365279-e8acd3bf6f08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }  
]

export const teamMembers: TeamMember[] = [
    {
      "id": 1,
      "name": "Ines ghak",
      "role": "Senior Property Advisor",
      "specialization": "Luxury Villas",
      "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "whatsapp": "+212664722488"
    },
    {
      "id": 2,
      "name": "Sadghi mhamdi",
      "role": "Property Advisor",
      "specialization": "Off Plan Properties",
      "image": "https://images.unsplash.com/photo-1517841902196-6c0e70e7f9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "whatsapp": "+998909998877"
    },
    {
      "id": 3,
      "name": "Redouane zerzouri",
      "role": "Property Advisor",
      "specialization": "Commercial Properties",
      "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "whatsapp": "+79991112233"
    },
    {
      "id": 4,
      "name": "Ines ghak",
      "role": "Senior Property Consultant",
      "specialization": "Beachfront Properties",
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "whatsapp": "+971502233445"
    },
    {
      "id": 5,
      "name": "Sadghi mhamdi",
      "role": "Property Advisor",
      "specialization": "Investment Properties",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "whatsapp": "+966550011223"
    },
    {
      "id": 6,
      "name": "Ines ghak",
      "role": "Luxury Property Specialist",
      "specialization": "Penthouse & High-End Residences",
      "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "whatsapp": "+33678901234"
    },
    {
      "id": 7,
      "name": "Redouane zerzouri",
      "role": "Real Estate Consultant",
      "specialization": "Short-Term Rentals",
      "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "whatsapp": "+14155556677"
    }
  ]

export const articles: NewsArticle[] = [
  {
    id: 1,
    title: "Marrakech Real Estate Market Trends 2024",
    excerpt:
      "Discover the latest trends and insights in Marrakech's dynamic property market, including emerging neighborhoods and investment opportunities.",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Market Insights",
  },
  {
    id: 2,
    title: "Top 5 Areas for Property Investment in Marrakech",
    excerpt:
      "Explore the most promising neighborhoods for real estate investment in Marrakech, from the historic Medina to modern Gueliz.",
    date: "January 10, 2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Investment",
  },
  {
    id: 3,
    title: "Guide to Buying Property in Marrakech",
    excerpt:
      "Everything you need to know about purchasing property in Marrakech, including legal requirements and cultural considerations.",
    date: "January 5, 2024",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Buying Guide",
  },
]

export const partners: Partner[] = [
  { name: "Attijariwafa Bank", logo: "https://th.bing.com/th/id/R.675fe0988229c421b089b6f861ee7342?rik=Jf4WBTBM90jniQ&pid=ImgRaw&r=0&sres=1&sresct=1" },
  { name: "Maroc Telecom", logo: "https://th.bing.com/th/id/R.e91c1ae188e7a261702b1d3bc4e0229b?rik=J9blZMNNu3s0VQ&riu=http%3a%2f%2fwww.iam.ma%2fImagesMarocTelecom%2fPhototh%c3%a8que%2fImages-grandes%2fmaroc-telecom-blanc-ar-grande.jpg&ehk=npiFX2O%2fm3WSVxWqoFAtnmPUSnd2igw69bqUxnnS%2fBI%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" },
  { name: "OCP Group", logo: "https://th.bing.com/th/id/R.2bc95cdacbd027a3f3a323930d73493f?rik=aAnhRYeTp%2fBnWA&riu=http%3a%2f%2fwww.gruppopedercini.com%2fwp-content%2fuploads%2fOCP-logo.jpg&ehk=NxZK6oqHbUklKNpLRRRPWRMjAYiJJD3jK8VZJf%2bCLi0%3d&risl=&pid=ImgRaw&r=0" },
  { name: "Royal Air Maroc", logo: "https://th.bing.com/th/id/OIP.1wbWdnHgyLr0rfU8d772WQHaE8?rs=1&pid=ImgDetMain" },
  { name: "ONCF", logo: "https://th.bing.com/th/id/OIP.uRV90AwL0dYWhCT3tfJE9AHaD2?rs=1&pid=ImgDetMain" },
  { name: "Marjane", logo: "https://th.bing.com/th/id/OIP.uvN6Wj_BHa5WTCESqvnjigHaDt?rs=1&pid=ImgDetMain" },
]

