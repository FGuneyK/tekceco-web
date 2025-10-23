import { fetchProperties } from '@/lib/fetchProperties'
import PropertyGallery from '@/components/PropertyGallery'
import PropertyVariantSelector from '@/components/PropertyVariantSelector'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const all = await fetchProperties()
  const property = all.find((p) => p.mainId === params.id)

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground">
        Property not found.
      </main>
    )
  }

  const imageArray: string[] = Array.isArray((property.images as any).image)
    ? (property.images as { image: string[] }).image.slice(0, 10)
    : [(property.images as { image: string }).image]

  const location = `${property.district ? property.district + ', ' : ''}${property.city}, ${property.country}`

  return (
    <main className="min-h-screen bg-background px-4 py-8 lg:px-32">
      <nav className="mb-8">
        <Link href="/listing">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Listings
          </Button>
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Gallery + Details */}
        <div className="lg:col-span-2">
          <PropertyGallery
            images={imageArray}
            mainId={property.mainId}
            ecoFriendlyName={property.ecoFriendlyName}
            title={property.title}
          />

          <div className="my-4 flex justify-between items-center gap-3">
            <Badge variant="outline" className="text-sm bg-background/80 text-foreground shadow-md">
              {property.type}
            </Badge>

            <Link href={property.url} target="_blank">
              <Badge className="text-base font-light bg-blue-950 hover:bg-blue-950 text-white flex items-center gap-2 shadow-md">
                Visit on
                <Image
                  src="https://tekce.com/images/tekce-logo.svg"
                  alt="Tekce"
                  width={60}
                  height={20}
                  className="inline-block"
                />
              </Badge>
            </Link>
          </div>

          <Card className="p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-foreground mb-4">{property.title}</h1>
            <p className="text-muted-foreground mb-2">{location}</p>

            {property.variants?.length > 0 ? (
              <PropertyVariantSelector variants={property.variants} />
            ) : (
              <div className="border rounded-md p-4 bg-muted/40">
                <p className="text-lg font-semibold text-emerald-600 mb-2">
                  {property.startingPrice?.toLocaleString('tr-TR')} {property.currency}
                </p>
                <p className="text-sm text-muted-foreground">
                  {property.variants?.[0]?.bedrooms ?? '-'} Bedrooms •{' '}
                  {property.variants?.[0]?.bathrooms ?? '-'} Bathrooms •{' '}
                  {property.variants?.[0]?.size ?? '-'} m²
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mt-6">
              <div>
                <p className="font-medium text-muted-foreground">Property Type</p>
                <p>{property.propertyType}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Country</p>
                <p>{property.country}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">City</p>
                <p>{property.city}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">District</p>
                <p>{property.district}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Contact Agent Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Interested in this property?</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Contact one of our local experts for more information about this eco-friendly
                property.
              </p>
              <Button className="w-full">Contact Agent</Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
