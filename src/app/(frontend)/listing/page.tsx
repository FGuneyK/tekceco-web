'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { GroupedProperty } from '@/lib/fetchProperties'
import PropertyCard from '@/components/PropertyCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner' // ✅ Yeni Spinner importu

// 🌍 Ülke-şehir eşleştirmesi
const cityOptions: Record<string, string[]> = {
  Spain: ['Malaga', 'Alicante', 'Barcelona'],
  Türkiye: ['Antalya', 'Istanbul', 'Alanya'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi'],
  'North Cyprus': ['Kyrenia', 'Nicosia'],
}

function ListingContent() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<GroupedProperty[]>([])
  const [filtered, setFiltered] = useState<GroupedProperty[]>([])
  const [loading, setLoading] = useState(true)

  const [country, setCountry] = useState('all')
  const [city, setCity] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  useEffect(() => {
    const qCountry = searchParams.get('location') || 'all'
    const qCity = searchParams.get('city') || ''
    const qType = searchParams.get('propertyType') || 'all'
    setCountry(qCountry)
    setCity(qCity)
    setPropertyType(qType)
  }, [searchParams])

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/properties')
        const data = await res.json()
        setProperties(data)
        setFiltered(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (loading) return
    let list = [...properties]

    if (country !== 'all') list = list.filter((p) => p.country === country)
    if (city) list = list.filter((p) => p.city === city)
    if (propertyType !== 'all') list = list.filter((p) => p.propertyType === propertyType)

    if (priceRange !== 'all') {
      list = list.filter((p) => {
        const price = p.startingPrice
        switch (priceRange) {
          case 'under-100k':
            return price < 100000
          case '100k-300k':
            return price >= 100000 && price <= 300000
          case '300k-500k':
            return price > 300000 && price <= 500000
          case 'over-500k':
            return price > 500000
          default:
            return true
        }
      })
    }

    setFiltered(list)
    setCurrentPage(1)
  }, [country, city, propertyType, priceRange, properties, loading])

  const startIdx = (currentPage - 1) * itemsPerPage
  const paginated = filtered.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const cities = country !== 'all' ? cityOptions[country] || [] : []

  return (
    <main className="min-h-screen bg-background p-10">
      <h1 className="text-3xl font-semibold mb-8 text-foreground">Eco-Friendly Properties</h1>

      {/* 🔍 Filtre Alanı */}
      <div className="bg-card p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-between mb-8">
        {/* 🌍 Country */}
        <Select
          onValueChange={(v) => {
            setCountry(v)
            setCity('')
          }}
          value={country}
        >
          <SelectTrigger className="w-[180px] bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60 focus:ring-2 focus:ring-primary transition">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-card text-card-foreground border border-border">
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="Spain">Spain</SelectItem>
            <SelectItem value="Türkiye">Türkiye</SelectItem>
            <SelectItem value="United Arab Emirates">UAE</SelectItem>
            <SelectItem value="North Cyprus">North Cyprus</SelectItem>
          </SelectContent>
        </Select>

        {/* 🏙️ City */}
        <Select onValueChange={setCity} value={city} disabled={country === 'all'}>
          <SelectTrigger className="w-[180px] bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60 focus:ring-2 focus:ring-primary transition disabled:opacity-50">
            <SelectValue placeholder={country === 'all' ? 'Select country' : 'City'} />
          </SelectTrigger>
          <SelectContent className="bg-card text-card-foreground border border-border">
            {cities.length > 0 ? (
              cities.map((cityName) => (
                <SelectItem key={cityName} value={cityName}>
                  {cityName}
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">No cities available</div>
            )}
          </SelectContent>
        </Select>

        {/* 🏠 Property Type */}
        <Select onValueChange={(v) => setPropertyType(v)} value={propertyType}>
          <SelectTrigger className="w-[180px] bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60 focus:ring-2 focus:ring-primary transition">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent className="bg-card text-card-foreground border border-border">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Apartments">Apartments</SelectItem>
            <SelectItem value="Houses">Houses</SelectItem>
            <SelectItem value="Land">Land</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        {/* 💰 Price Range */}
        <Select onValueChange={(v) => setPriceRange(v)} value={priceRange}>
          <SelectTrigger className="w-[180px] bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60 focus:ring-2 focus:ring-primary transition">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent className="bg-card text-card-foreground border border-border">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="under-100k">Under €100k</SelectItem>
            <SelectItem value="100k-300k">€100k - €300k</SelectItem>
            <SelectItem value="300k-500k">€300k - €500k</SelectItem>
            <SelectItem value="over-500k">Over €500k</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setCountry('all')
            setCity('')
            setPropertyType('all')
            setPriceRange('all')
          }}
          className="ml-auto"
        >
          Clear Filters
        </Button>
      </div>

      {/* 🌀 Spinner (fetch sırasında) */}
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spinner className="text-primary size-8" />
        </div>
      ) : paginated.length === 0 ? (
        <p className="text-muted-foreground">No properties found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((property) => (
            <PropertyCard key={property.mainId} property={property} />
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-6 py-2"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-6 py-2"
          >
            Next
          </Button>
        </div>
      )}
    </main>
  )
}

export default function ListingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-muted-foreground">Loading properties...</div>}>
      <ListingContent />
    </Suspense>
  )
}
