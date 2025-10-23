'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function PropertySearch() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [city, setCity] = useState('')

  // Ülke-şehir eşleştirmesi
  const cityOptions: Record<string, string[]> = {
    Spain: ['Malaga', 'Alicante', 'Barcelona'],
    Türkiye: ['Antalya', 'Istanbul', 'Alanya'],
    'United Arab Emirates': ['Dubai', 'Abu Dhabi'],
    'North Cyprus': ['Kyrenia', 'Nicosia'],
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (city) params.append('city', city)
    if (propertyType) params.append('propertyType', propertyType)
    router.push(`/listing?${params.toString()}`)
  }

  // Seçili ülkeye göre şehir listesi
  const cities = location ? cityOptions[location] || [] : []

  return (
    <section className="relative">
      <div className="relative z-20 container mx-auto px-3 text-center">
        <div className="max-w-4xl mx-auto backdrop-blur-lg border border-border bg-background/80 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* 🌍 Country */}
            <Select
              onValueChange={(value) => {
                setLocation(value)
                setCity('') // ülke değiştiğinde şehir sıfırlansın
              }}
            >
              <SelectTrigger className="w-full bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60 focus:ring-2 focus:ring-primary transition">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="bg-card text-card-foreground border border-border">
                <SelectItem value="Spain">Spain</SelectItem>
                <SelectItem value="Türkiye">Türkiye</SelectItem>
                <SelectItem value="United Arab Emirates">UAE</SelectItem>
                <SelectItem value="North Cyprus">North Cyprus</SelectItem>
              </SelectContent>
            </Select>

            {/* 🏙️ City */}
            <Select
              onValueChange={setCity}
              value={city}
              disabled={!location} // ülke seçilmeden city kapalı
            >
              <SelectTrigger className="w-full bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60 focus:ring-2 focus:ring-primary transition disabled:opacity-50">
                <SelectValue placeholder={location ? 'City' : 'Select country'} />
              </SelectTrigger>
              <SelectContent className="bg-card text-card-foreground border border-border">
                {cities.length > 0 ? (
                  cities.map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No cities available
                  </div>
                )}
              </SelectContent>
            </Select>

            {/* 🏠 Property Type */}
            <Select onValueChange={setPropertyType}>
              <SelectTrigger className="w-full bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60 focus:ring-2 focus:ring-primary transition">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent className="bg-card text-card-foreground border border-border">
                <SelectItem value="Houses">Houses</SelectItem>
                <SelectItem value="Apartments">Apartments</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleSearch}
            className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Search Properties
          </Button>
        </div>
      </div>
    </section>
  )
}
