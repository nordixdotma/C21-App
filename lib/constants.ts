import type { Guide, NavSection, NewsArticle, Partner, Stat, TeamMember } from "@/types"

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
    image: "https://wallpaperboat.com/wp-content/uploads/2020/10/23/57974/real-estate-10.jpg",
  },
  {
    title: "Buying Offplan Guide",
    subtitle: "How to Buy Off Plan in Marrakech",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Renting Guide",
    subtitle: "How to Rent Property in Marrakech",
    image: "https://wallpaperboat.com/wp-content/uploads/2020/10/23/57974/real-estate-10.jpg",
  },
  {
    title: "Selling Guide",
    subtitle: "How to Sell Property in Marrakech",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
]

// Replace the mock data with an empty array
export const featuredProjects = []

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ines ghak",
    role: "Senior Property Advisor",
    specialization: "Luxury Villas",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+212664722488",
  },
  {
    id: 2,
    name: "Sadghi mhamdi",
    role: "Property Advisor",
    specialization: "Off Plan Properties",
    image: "https://th.bing.com/th/id/OIP.ZP-E8ZFH11wb1XSm0dn-5wHaJQ?rs=1&pid=ImgDetMain",
    whatsapp: "+998909998877",
  },
  {
    id: 3,
    name: "Redouane zerzouri",
    role: "Property Advisor",
    specialization: "Commercial Properties",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+79991112233",
  },
  {
    id: 4,
    name: "Ines ghak",
    role: "Senior Property Consultant",
    specialization: "Beachfront Properties",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+971502233445",
  },
  {
    id: 5,
    name: "Sadghi mhamdi",
    role: "Property Advisor",
    specialization: "Investment Properties",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+966550011223",
  },
  {
    id: 6,
    name: "Ines ghak",
    role: "Luxury Property Specialist",
    specialization: "Penthouse & High-End Residences",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+33678901234",
  },
  {
    id: 7,
    name: "Redouane zerzouri",
    role: "Real Estate Consultant",
    specialization: "Short-Term Rentals",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+14155556677",
  },
]

// Update the NewsArticle type to include content
// export interface NewsArticle {
//   id: number;
//   title: string;
//   excerpt: string;
//   date: string;
//   image: string;
//   category: string;
//   content: string[]; // Array of paragraphs for the full article content
// }

// Update the articles array to include content for each article
export const articles: NewsArticle[] = [
  {
    id: 1,
    title: "Marrakech Real Estate Market Trends 2024",
    excerpt:
      "Discover the latest trends and insights in Marrakech's dynamic property market, including emerging neighborhoods and investment opportunities.",
    date: "January 15, 2024",
    image: "https://www.flatheadrealestate.com/assets/images/montana-real-estate/5/30011675/large/30011675_1.jpg",
    category: "Market Insights",
    content: [
      "Discover the latest trends and insights in Marrakech's dynamic property market, including emerging neighborhoods and investment opportunities.",
      "The Marrakech real estate market has shown remarkable resilience in 2024, with property values increasing by an average of 7% across the city. This growth is particularly evident in areas like Gueliz and Hivernage, where luxury apartments continue to attract both local and international buyers.",
      "One of the most significant trends we're observing is the increasing demand for eco-friendly properties. Developers are responding by incorporating sustainable features such as solar panels, water recycling systems, and energy-efficient designs into new projects. These green properties command a premium of approximately 15-20% but offer long-term savings on utility costs.",
      "Another emerging trend is the rise of mixed-use developments that combine residential, commercial, and leisure spaces. These integrated communities are particularly popular among younger buyers and investors who value convenience and a vibrant lifestyle. The M Avenue development in Hivernage exemplifies this trend, offering luxury apartments alongside high-end retail outlets, restaurants, and cultural spaces.",
      "In terms of investment opportunities, the areas surrounding the new Marrakech railway station are showing promising growth potential. With improved connectivity to Casablanca and other major cities, these neighborhoods are experiencing increased interest from commuters and investors alike.",
      "The rental market remains strong, particularly for short-term vacation rentals. Properties in the Medina and Palmeraie continue to offer attractive yields of 6-8% annually, making them appealing options for investors seeking regular income streams.",
      "Looking ahead, experts predict continued steady growth in the Marrakech property market, with particular emphasis on luxury developments and properties that cater to the growing demand for sustainable living. As always, location remains paramount, with properties in established areas maintaining their value even during market fluctuations.",
    ],
  },
  {
    id: 2,
    title: "Top 5 Areas for Property Investment in Marrakech",
    excerpt:
      "Explore the most promising neighborhoods for real estate investment in Marrakech, from the historic Medina to modern Gueliz.",
    date: "January 10, 2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Investment",
    content: [
      "Explore the most promising neighborhoods for real estate investment in Marrakech, from the historic Medina to modern Gueliz.",
      "1. Hivernage: The undisputed luxury hub of Marrakech, Hivernage continues to be one of the most sought-after areas for high-end property investment. With its proximity to the Menara Gardens, luxury hotels, and upscale restaurants, properties here command premium prices but offer excellent returns. The average price per square meter ranges from 25,000 to 35,000 MAD, with luxury villas often exceeding this range. Rental yields in Hivernage typically range from 5-7% annually, making it an attractive option for investors seeking stable returns in a prestigious location.",
      "2. Gueliz: As the modern city center of Marrakech, Gueliz offers a perfect blend of contemporary living with easy access to traditional Moroccan experiences. The area is particularly popular among expatriates and younger Moroccan professionals. Property prices have increased by approximately 12% over the past two years, reflecting the growing demand. Investors can expect to pay between 18,000 and 28,000 MAD per square meter, with rental yields averaging 6-8%. The abundance of shops, cafes, and cultural venues makes Gueliz properties highly rentable throughout the year.",
      "3. Palm Grove (Palmeraie): For those seeking exclusivity and tranquility, the Palm Grove area offers some of the most luxurious villas in Marrakech. Set amidst thousands of palm trees, properties here provide privacy while remaining just a 15-minute drive from the city center. Investment in this area typically starts at around 3 million MAD for smaller villas, with luxury estates reaching 20 million MAD or more. While the initial investment is substantial, properties in Palm Grove have historically maintained their value exceptionally well, with annual appreciation rates of 5-6% over the past decade.",
      "4. Agdal: This rapidly developing area has become increasingly attractive to investors due to its modern infrastructure, proximity to universities, and relatively affordable prices compared to Hivernage or Gueliz. Property values in Agdal have increased by approximately 15% in the last three years, making it one of the fastest-growing areas in terms of real estate appreciation. Prices range from 12,000 to 20,000 MAD per square meter, with rental yields often exceeding 8%, particularly for properties catering to students and young professionals.",
      "5. Medina: Investing in Marrakech's historic Medina offers a unique opportunity to own a piece of Moroccan heritage. Traditional riads (courtyard houses) continue to attract investors looking to create boutique hotels or vacation rentals. While renovation can be challenging due to preservation requirements, successfully restored riads can generate exceptional returns, particularly in the tourism sector. Prices vary significantly based on condition, size, and exact location, but investors should expect to allocate additional funds for restoration and maintenance. The potential returns, however, can be substantial, with well-managed riad guesthouses achieving occupancy rates of 70-80% during peak seasons.",
    ],
  },
  {
    id: 3,
    title: "Guide to Buying Property in Marrakech",
    excerpt:
      "Everything you need to know about purchasing property in Marrakech, including legal requirements and cultural considerations.",
    date: "January 5, 2024",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Buying Guide",
    content: [
      "Everything you need to know about purchasing property in Marrakech, including legal requirements and cultural considerations.",
      "Purchasing property in Marrakech can be an exciting venture, whether you're looking for a vacation home, retirement residence, or investment opportunity. However, navigating the Moroccan real estate market requires understanding specific legal procedures and cultural nuances that may differ significantly from those in your home country.",
      "Legal Framework: Contrary to some misconceptions, foreign buyers face few restrictions when purchasing property in Morocco. Since 2003, the country has implemented policies to encourage foreign investment in real estate. Non-Moroccan citizens can freely purchase most properties, with the exception of agricultural land, which requires additional approvals. It's worth noting that all property transactions must be conducted in Moroccan Dirhams (MAD).",
      "The Buying Process: The property acquisition process typically begins with a verbal agreement, followed by a preliminary contract ('compromis de vente') and a deposit payment, usually 10% of the purchase price. This deposit is generally non-refundable unless specific conditions outlined in the contract aren't met. The final deed ('acte authentique') is signed before a notary, who verifies the property's legal status and ensures all taxes and fees are paid.",
      "Key Documents: Before proceeding with any purchase, ensure you obtain and verify several crucial documents: the property title deed ('titre foncier'), land registry extract ('certificat de propriété'), and proof that the property is free from any liens or encumbrances. If the property is part of a condominium, request the building regulations ('règlement de copropriété') to understand your rights and obligations.",
      "Costs and Taxes: Beyond the property price, buyers should budget for additional costs, including registration tax (4-6% of the declared property value), notary fees (1-1.5%), and various administrative fees. Annual property tax ('taxe d'habitation') applies to occupied properties, while a 'taxe des services communaux' covers local services. For non-residents, it's advisable to consult with a tax specialist regarding potential implications in your home country.",
      "Cultural Considerations: When buying in traditional areas like the Medina, understanding local customs is essential. Properties here often have complex ownership histories and may involve multiple family members. Additionally, renovations in historic areas must comply with preservation guidelines. Building relationships with neighbors is culturally important and can prove invaluable when navigating local bureaucracy.",
      "Working with Professionals: Engaging reputable professionals is crucial. A trustworthy real estate agent with experience working with international clients can navigate the market's complexities. Similarly, a lawyer specializing in Moroccan property law can protect your interests throughout the transaction. At CENTURY 21, our multilingual team specializes in guiding foreign buyers through every step of the process.",
      "Financing Options: While many foreign buyers purchase properties with cash, mortgage options are available through Moroccan banks. Typically, non-residents can finance up to 50% of the property value, with repayment terms ranging from 5 to 25 years. Interest rates are generally higher for non-residents, and the application process requires substantial documentation.",
      "By understanding these essential aspects of property acquisition in Marrakech, you'll be better prepared to make informed decisions and enjoy a smoother purchasing experience. Remember that patience is key—Moroccan real estate transactions often move at a different pace than in Western countries, but the reward of owning your piece of this magical city makes the journey worthwhile.",
    ],
  },
  {
    id: 4,
    title: "The Rise of Eco-Friendly Properties in Marrakech",
    excerpt:
      "How sustainable architecture and green building practices are transforming Marrakech's luxury real estate landscape.",
    date: "February 2, 2024",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Sustainability",
    content: [
      "How sustainable architecture and green building practices are transforming Marrakech's luxury real estate landscape.",
      "Marrakech, a city steeped in tradition, is experiencing a remarkable evolution in its real estate sector as eco-friendly properties gain prominence. This shift reflects both global environmental concerns and Morocco's ambitious national renewable energy goals, which aim to generate 52% of the country's electricity from renewable sources by 2030.",
      "The movement toward sustainable real estate in Marrakech began with boutique eco-lodges on the city's outskirts but has rapidly expanded to include luxury villas, apartment complexes, and even entire planned communities. These developments are redefining luxury by incorporating environmental responsibility alongside traditional opulence.",
      "Solar energy stands at the forefront of this green revolution. With Marrakech enjoying over 300 sunny days annually, solar panels have become increasingly common features on new properties. The most innovative developments incorporate building-integrated photovoltaics (BIPV), where solar-generating capabilities are seamlessly integrated into architectural elements like roof tiles and façades. These systems not only reduce energy costs but can also allow homeowners to sell excess electricity back to the national grid.",
      "Water conservation represents another critical aspect of sustainable building in Marrakech. Given the region's arid climate, innovative water management systems have become essential features in eco-friendly properties. These include greywater recycling systems that repurpose water from sinks and showers for irrigation, rainwater harvesting installations, and drought-resistant landscaping that celebrates native plant species requiring minimal irrigation.",
      "Traditional Moroccan architectural elements are being reimagined through a sustainable lens. The central courtyard (riad) design, which has provided natural cooling for centuries, is being enhanced with modern passive cooling techniques. Similarly, thick walls with high thermal mass—a hallmark of traditional Moroccan construction—are being updated with contemporary insulation materials to create highly energy-efficient building envelopes.",
      "Several flagship projects exemplify this sustainable luxury approach. The Atlas Gardens development in the Palmeraie area features villas that combine traditional Moroccan aesthetics with cutting-edge sustainability features, including geothermal heating and cooling systems. Meanwhile, the Noria Residences near the Amelkis Golf Course incorporate living walls, solar arrays, and advanced water recycling systems while maintaining the elegant aesthetic expected in luxury properties.",
      "Beyond environmental benefits, these eco-friendly properties offer significant economic advantages. Owners typically see 30-40% reductions in utility costs compared to conventional properties of similar size. Additionally, sustainable properties are increasingly commanding premium prices and experiencing faster appreciation rates, with studies suggesting a 10-15% price premium for certified green buildings in Marrakech.",
      "The Moroccan government has supported this trend through various initiatives, including tax incentives for renewable energy installations and expedited permitting for projects meeting specific sustainability criteria. The introduction of Morocco's green building standard, modeled after international certifications like LEED and BREEAM but adapted for local conditions, has further accelerated the adoption of sustainable building practices.",
      "As Marrakech continues to evolve as a global luxury destination, the integration of sustainability into its real estate landscape represents not just a passing trend but a fundamental shift in how luxury is defined. For investors and homebuyers, eco-friendly properties offer the rare opportunity to combine environmental responsibility with the timeless allure of one of the world's most enchanting cities.",
    ],
  },
  {
    id: 5,
    title: "Navigating Moroccan Property Law: A Foreigner's Guide",
    excerpt:
      "Understanding the legal framework and requirements for non-Moroccan citizens looking to invest in Marrakech real estate.",
    date: "February 10, 2024",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Legal",
    content: [
      "Understanding the legal framework and requirements for non-Moroccan citizens looking to invest in Marrakech real estate.",
      "Morocco has established itself as an attractive destination for foreign real estate investment, with Marrakech being particularly popular among international buyers. While the country has liberalized its property laws to welcome foreign investment, navigating the legal landscape requires careful attention to specific procedures and requirements.",
      "The fundamental principle to understand is that foreign nationals have nearly the same property rights as Moroccan citizens in urban areas. This includes the right to purchase apartments, houses, commercial properties, and land zoned for urban development. The main restriction applies to agricultural land, which requires special authorization and typically involves establishing a Moroccan company for the purchase.",
      "Property ownership in Morocco is governed by two distinct legal systems: the traditional system (Moulkiya) and the modern title deed system (Titre Foncier). The Titre Foncier system, established during the French protectorate, provides the greatest security for foreign buyers. Properties registered under this system have clear titles recorded in a central registry, making ownership verification straightforward and reducing the risk of disputes.",
      "In contrast, properties under the traditional Moulkiya system may have more complex ownership histories, often involving multiple family members with inherited rights. While it's legally possible for foreigners to purchase such properties, particularly in the historic Medina, these transactions require additional due diligence and legal expertise to ensure all rightful owners consent to the sale.",
      "The property acquisition process typically follows these steps: After identifying a property and agreeing on a price, the buyer and seller sign a preliminary contract (compromis de vente) and the buyer pays a deposit, usually 10% of the purchase price. This contract should include contingency clauses protecting the buyer if issues arise during due diligence. The notary then conducts thorough title verification before preparing the final deed (acte authentique).",
      "Notaries play a central role in Moroccan property transactions. As public officials appointed by the government, they verify the property's legal status, ensure all taxes are paid, and register the transfer with appropriate authorities. While notaries are legally obligated to protect all parties' interests, foreign buyers often benefit from engaging their own lawyer to provide additional oversight and explanation of complex legal documents.",
      "Taxation is another important consideration. Property acquisition incurs registration tax (4-6% of the declared value), notary fees (approximately 1-1.5%), and various administrative charges. Annual property taxes include the residence tax (taxe d'habitation) and municipal services tax (taxe des services communaux), though rates are relatively modest compared to many European countries.",
      "For estate planning purposes, foreign owners should be aware that Moroccan inheritance law, based on Islamic principles, may apply to their Moroccan property unless they take specific steps to ensure their national law applies. This typically involves making a will explicitly choosing the application of their home country's inheritance laws, as permitted under Morocco's adherence to the Hague Convention.",
      "Currency regulations represent another important consideration. While Morocco maintains certain currency controls, the Office des Changes (Foreign Exchange Office) has established specific provisions for foreign property investors. Non-residents can open convertible dirham accounts to finance their purchases and, importantly, can repatriate the proceeds from property sales if they can document the original foreign currency investment.",
      "By understanding these legal frameworks and working with qualified professionals, foreign investors can navigate Moroccan property law with confidence, ensuring their Marrakech real estate investments rest on solid legal foundations.",
    ],
  },
  {
    id: 6,
    title: "Renovation Tips for Traditional Riads in Marrakech",
    excerpt:
      "Expert advice on restoring and modernizing historic riads while preserving their authentic Moroccan character and charm.",
    date: "February 18, 2024",
    image:
      "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Renovation",
    content: [
      "Expert advice on restoring and modernizing historic riads while preserving their authentic Moroccan character and charm.",
      "Renovating a traditional riad in Marrakech's historic Medina offers a unique opportunity to own a piece of Moroccan architectural heritage while creating a space that meets contemporary living standards. These courtyard houses, often centuries old, present both remarkable rewards and significant challenges for renovation projects.",
      "Before beginning any renovation, understanding the historical and architectural significance of your riad is essential. Traditional riads were designed around central courtyards that provided light, air circulation, and privacy—principles that remain relevant today. The most successful renovations honor these original design intentions while sensitively introducing modern amenities.",
      "Structural assessment should be your first priority. Many older riads have foundation issues, water damage, or structural weaknesses that must be addressed before aesthetic improvements. Engage an engineer experienced with historic Medina properties to conduct a thorough evaluation. Pay particular attention to load-bearing walls, roof structures, and any signs of subsidence, which is relatively common in the Medina's ancient foundations.",
      "Plumbing and electrical systems typically require complete modernization in historic riads. When planning these updates, consider creating dedicated utility chases that allow for future maintenance without disturbing decorative elements. For plumbing, copper pipes have proven more durable than PVC in Marrakech's climate, while electrical systems should include adequate capacity for modern appliances and climate control systems.",
      "Climate management presents unique challenges in traditional riads. While the original design provided natural cooling through the courtyard's microclimate effect, most renovations incorporate additional climate control. Underfloor heating works particularly well with traditional tadelakt (polished plaster) and zellige (mosaic tile) surfaces, while discreet split-system air conditioning units can provide cooling with minimal visual impact.",
      "Water features, central to traditional riad design, often require significant restoration. When renovating fountains and pools, consider installing modern filtration systems concealed within traditional designs. Similarly, traditional irrigation systems for courtyard gardens can be updated with automated drip systems that maintain authentic plantings with greater water efficiency.",
      "Artisanal craftsmanship represents the soul of Moroccan architecture. Working with skilled local artisans is essential for authentic restoration of elements like intricate plasterwork (gebs), cedar wood ceilings (zouakt), and zellige tilework. While these traditional crafts add significantly to renovation costs, they create irreplaceable authenticity and support the continuation of Moroccan architectural traditions.",
      "When introducing contemporary elements, consider a 'minimal intervention' approach that allows modern additions to be clearly distinguished from original features. This philosophy, advocated by architectural conservationists, creates a respectful dialogue between historic and contemporary elements rather than attempting to mimic historical styles with modern materials.",
      "Navigating local regulations presents another challenge. The Medina is a UNESCO World Heritage site with strict preservation guidelines. All renovation plans require approval from local authorities, particularly for any changes affecting the riad's exterior or structural elements. Working with an architect familiar with these regulations can help avoid costly delays and compliance issues.",
      "Finally, budget realistically for your renovation. Costs typically exceed initial estimates due to unforeseen structural issues and the labor-intensive nature of traditional craftsmanship. Experienced renovators recommend allocating a contingency of at least 20% beyond initial estimates and understanding that timelines often extend significantly beyond initial projections.",
      "With patience, respect for traditional methods, and careful planning, renovating a historic riad can result in an extraordinary property that honors Moroccan architectural heritage while providing the comfort expected in contemporary luxury homes.",
    ],
  },
]

export const partners: Partner[] = [
  {
    name: "Attijariwafa Bank",
    logo: "https://th.bing.com/th/id/R.675fe0988229c421b089b6f861ee7342?rik=Jf4WBTBM90jniQ&pid=ImgRaw&r=0&sres=1&sresct=1",
  },
  {
    name: "Maroc Telecom",
    logo: "https://th.bing.com/th/id/R.e91c1ae188e7a261702b1d3bc4e0229b?rik=J9blZMNNu3s0VQ&riu=http%3a%2f%2fwww.iam.ma%2fImagesMarocTelecom%2fPhototh%c3%a8que%2fImages-grandes%2fmaroc-telecom-blanc-ar-grande.jpg&ehk=npiFX2O%2fm3WSVxWqoFAtnmPUSnd2igw69bqUxnnS%2fBI%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
  },
  {
    name: "OCP Group",
    logo: "https://th.bing.com/th/id/R.2bc95cdacbd027a3f3a323930d73493f?rik=aAnhRYeTp%2fBnWA&riu=http%3a%2f%2fwww.gruppopedercini.com%2fwp-content%2fuploads%2fOCP-logo.jpg&ehk=NxZK6oqHbUklKNpLRRRPWRMjAYiJJD3jK8VZJf%2bCLi0%3d&risl=&pid=ImgRaw&r=0",
  },
  { name: "Royal Air Maroc", logo: "https://th.bing.com/th/id/OIP.1wbWdnHgyLr0rfU8d772WQHaE8?rs=1&pid=ImgDetMain" },
  { name: "ONCF", logo: "https://th.bing.com/th/id/OIP.uRV90AwL0dYWhCT3tfJE9AHaD2?rs=1&pid=ImgDetMain" },
  { name: "Marjane", logo: "https://th.bing.com/th/id/OIP.uvN6Wj_BHa5WTCESqvnjigHaDt?rs=1&pid=ImgDetMain" },
]
