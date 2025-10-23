'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bath, Bed, ArrowLeft, ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import type { GroupedProperty } from '@/lib/fetchProperties'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type PropertyCardProps = {
  property: GroupedProperty
  className?: string
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const {
    mainId,
    city,
    district,
    country,
    type,
    ecoFriendlyName,
    images,
    startingPrice,
    currency,
    bedrooms,
    bathrooms,
    variants,
    title,
  } = property

  const swiperRef = useRef<any>(null)

  // Görselleri normalize et (max 5)
  const imageArray: string[] = Array.isArray((images as any).image)
    ? (images as { image: string[] }).image.slice(0, 5)
    : [(images as { image: string }).image]

  const location = `${district ? district + ', ' : ''}${city}, ${country}`
  const price = startingPrice ? `${startingPrice.toLocaleString()} ${currency}` : 'Price on Request'

  const totalBedrooms = bedrooms || variants[0]?.bedrooms || '-'
  const totalBathrooms = bathrooms || variants[0]?.bathrooms || '-'

  return (
    <Card className={cn('overflow-hidden p-0 relative', className)}>
      <div className="relative w-full aspect-4/3">
        {/* 🖼️ Swiper */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full h-full relative z-0"
        >
          {imageArray.map((src: string, i: number) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`${ecoFriendlyName} ${type} image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🟩 Custom Nav Buttons */}
        <Button
          variant="default"
          size="icon"
          className="absolute z-10 h-8 w-8 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary left-2 top-1/2 -translate-y-1/2 shadow-md"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="default"
          size="icon"
          className="absolute z-10 h-8 w-8 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary right-2 top-1/2 -translate-y-1/2 shadow-md"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>

        {/* 🏷️ Property ID Badge */}
        <Badge className="absolute z-10 top-2 left-2 bg-background/80 text-foreground">
          {mainId}
        </Badge>

        {/* 🌿 Eco Tag */}
        <Badge className="absolute z-10 bottom-2 left-2 bg-green-600/80 text-white">
          {ecoFriendlyName}
        </Badge>
      </div>

      {/* 🧾 İçerik */}
      <CardContent className="p-4">
        <h3 className="text-2xl font-bold">{price}</h3>
        <p className="text-muted-foreground">{location}</p>
        <p className="text-base text-foreground mt-1 line-clamp-2">{title}</p>
      </CardContent>

      {/* 🔻 Alt Kısım */}
      <CardFooter className="flex flex-col items-start gap-4 p-4 bg-muted/50">
        <div className="flex justify-between items-center w-full">
          <Badge variant="secondary">{type}</Badge>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" /> {totalBedrooms}
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" /> {totalBathrooms}
            </div>
          </div>

          <Badge>Energy: A+</Badge>
        </div>

        <Link href={`/property/${mainId}`} className="w-full">
          <Button className="w-full">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
