'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { useRef } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper' // ✅ Type import

type Props = {
  images: string[]
  mainId: string
  ecoFriendlyName: string
  title: string
}

export default function PropertyGallery({ images, mainId, ecoFriendlyName, title }: Props) {
  const swiperRef = useRef<SwiperType | null>(null) // ✅ fixed

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg border">
      {/* Swiper */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full h-[500px] relative z-0"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[500px]">
              <Image src={src} alt={`${title} image ${i + 1}`} fill className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <Badge variant="outline" className="bg-background/80 text-foreground shadow-lg">
          {mainId}
        </Badge>
        <Badge className="bg-green-600/90 text-white shadow-lg">{ecoFriendlyName}</Badge>
      </div>

      {/* Custom Nav Buttons */}
      <Button
        variant="default"
        size="icon"
        className="absolute z-10 h-8 w-8 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary left-3 top-1/2 -translate-y-1/2 shadow-md"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="default"
        size="icon"
        className="absolute z-10 h-8 w-8 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary right-3 top-1/2 -translate-y-1/2 shadow-md"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}
