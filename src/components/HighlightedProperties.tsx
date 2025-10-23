import { fetchProperties } from '@/lib/fetchProperties'
import PropertyCard from '@/components/PropertyCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HighlightedProperties() {
  const all = await fetchProperties()
  const featured = all.slice(0, 3) // Şimdilik ilk 3 property gösteriyoruz

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Highlighted Eco-Friendly Properties
        </h2>
        <p className="text-muted-foreground mt-2">
          Explore our hand-picked sustainable homes across the globe.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((property) => (
          <PropertyCard key={property.mainId} property={property} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/listing">
          <Button size="lg" variant="outline">
            View All Properties
          </Button>
        </Link>
      </div>
    </section>
  )
}
