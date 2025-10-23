import xml2js from 'xml2js'

export type Variant = {
  id: string
  subtype: string
  price: number
  currency: string
  bedrooms: string
  bathrooms: string
  size: string
}

export type GroupedProperty = {
  mainId: string
  city: string
  propertyType?: string
  district: string
  neighborhood: string
  country: string
  url: string
  type: string
  ecoFriendlyName: string
  title: string
  images: { image: string[] } | { image: string }
  variants: Variant[]
  startingPrice: number
  currency: string
  bedrooms?: string
  bathrooms?: string
}

function getEcoFriendlyName(): string {
  const ecoWords = ['Eco-friendly', 'Sustainable', 'Green', 'Energy-efficient', 'Carbon-neutral']
  return ecoWords[Math.floor(Math.random() * ecoWords.length)]
}

function mapCountryCode(code: string): string {
  const map: Record<string, string> = {
    ES: 'Spain',
    TR: 'Türkiye',
    AE: 'United Arab Emirates',
    CY: 'North Cyprus',
  }
  return map[code] || code
}

export async function fetchProperties(filters?: {
  country?: string
  city?: string
  propertyType?: string
  priceRange?: string
}): Promise<GroupedProperty[]> {
  try {
    const res = await fetch('https://tekce.com/feed/ecofriendly', {
      headers: { 'User-Agent': 'TekceUser' },
      cache: 'no-store',
    })

    if (!res.ok) throw new Error(`Failed to fetch feed: ${res.status}`)

    const xml = await res.text()
    const data = await xml2js.parseStringPromise(xml, { explicitArray: false })
    const properties = Array.isArray(data.properties.property)
      ? data.properties.property
      : [data.properties.property]

    const grouped: Record<string, GroupedProperty> = {}

    for (const p of properties) {
      const mainId = p.id.split('-').slice(0, 2).join('-')
      const ecoFriendlyName = getEcoFriendlyName()
      const countryFull = mapCountryCode(p.country)

      // Kuzey Kıbrıs özel durumu
      const title =
        p.country === 'CY'
          ? `${ecoFriendlyName} ${p.type} in ${p.district}, ${p.city}`
          : `${ecoFriendlyName} ${p.type} in ${p.city}, ${countryFull}`

      if (!grouped[mainId]) {
        grouped[mainId] = {
          mainId,
          city: p.city,
          district: p.district,
          neighborhood: p.neighborhood,
          country: countryFull,
          url: p.url,
          type: p.type,
          propertyType: p.type, // 🆕 propertyType alanını doldur
          ecoFriendlyName,
          title,
          images: p.images,
          variants: [],
          startingPrice: 0,
          currency: p.currency || 'EUR',
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
        }
      }

      grouped[mainId].variants.push({
        id: p.id,
        subtype: p.subtype,
        price: Number(p.price) || 0,
        currency: p.currency || 'EUR',
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        size: p.size,
      })

      if (!grouped[mainId].bedrooms) grouped[mainId].bedrooms = p.bedrooms
      if (!grouped[mainId].bathrooms) grouped[mainId].bathrooms = p.bathrooms
    }

    Object.values(grouped).forEach((g) => {
      const validPrices = g.variants.filter((v) => v.price > 0).map((v) => v.price)
      g.startingPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0
      g.currency = g.variants[0]?.currency || 'EUR'
    })

    let result = Object.values(grouped)

    if (filters) {
      if (filters.country && filters.country.toLowerCase() !== 'all') {
        result = result.filter((p) => p.country === filters.country)
      }
      if (filters.city && filters.city.trim() !== '') {
        const cityFilter = filters.city.toLowerCase()
        result = result.filter((p) => p.city.toLowerCase().includes(cityFilter))
      }
      if (filters.propertyType && filters.propertyType.toLowerCase() !== 'all') {
        const propTypeFilter = filters.propertyType
        result = result.filter((p) =>
          p.propertyType ? p.propertyType === propTypeFilter : p.type === propTypeFilter,
        )
      }
      if (filters.priceRange && filters.priceRange.toLowerCase() !== 'all') {
        switch (filters.priceRange) {
          case 'under-100k':
            result = result.filter((p) => p.startingPrice < 100000)
            break
          case '100k-300k':
            result = result.filter((p) => p.startingPrice >= 100000 && p.startingPrice <= 300000)
            break
          case '300k-500k':
            result = result.filter((p) => p.startingPrice >= 300000 && p.startingPrice <= 500000)
            break
          case 'over-500k':
            result = result.filter((p) => p.startingPrice > 500000)
            break
        }
      }
    }

    return result
  } catch {
    return []
  }
}
