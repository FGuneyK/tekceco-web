'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { GroupedProperty } from '@/lib/fetchProperties'
import PropertyCard from '@/components/PropertyCard'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function ListingPage() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<GroupedProperty[]>([])
  const [filtered, setFiltered] = useState<GroupedProperty[]>([])
  const [country, setCountry] = useState('all')
  const [city, setCity] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  // 🔹 İlk yüklemede query parametreleri oku
  useEffect(() => {
    const qCountry = searchParams.get('location') || 'all'
    const qCity = searchParams.get('city') || ''
    const qType = searchParams.get('propertyType') || 'all'
    setCountry(qCountry)
    setCity(qCity)
    setPropertyType(qType)
  }, [searchParams])

  // 🔹 Property verisini yükle
  useEffect(() => {
    async function load() {
      const res = await fetch('/api/properties')
      const data = await res.json()
      setProperties(data)
      setFiltered(data)
    }
    load()
  }, [])

  // 🔹 Filtreleme
  useEffect(() => {
    let list = [...properties]

    if (country !== 'all') list = list.filter((p) => p.country === country)
    if (city.trim()) list = list.filter((p) => p.city?.toLowerCase().includes(city.toLowerCase()))
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
  }, [country, city, propertyType, priceRange, properties])

  // 🔹 Pagination hesaplama
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginated = filtered.slice(startIdx, startIdx + itemsPerPage)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  return (
    <main className="min-h-screen bg-background p-10">
      <h1 className="text-3xl font-semibold mb-8 text-foreground">Eco-Friendly Properties</h1>

      {/* 🔍 Filtre alanı */}
      <div className="bg-card p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-between mb-8">
        <Select onValueChange={(v) => setCountry(v)} value={country}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="Spain">Spain</SelectItem>
            <SelectItem value="Türkiye">Türkiye</SelectItem>
            <SelectItem value="United Arab Emirates">UAE</SelectItem>
            <SelectItem value="North Cyprus">North Cyprus</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-[180px]"
        />

        <Select onValueChange={(v) => setPropertyType(v)} value={propertyType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Apartments">Apartments</SelectItem>
            <SelectItem value="Houses">Houses</SelectItem>
            <SelectItem value="Land">Land</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setPriceRange(v)} value={priceRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
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

      {/* 🏡 Kartlar */}
      {paginated.length === 0 ? (
        <p className="text-muted-foreground">No properties found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((property) => (
            <PropertyCard key={property.mainId} property={property} />
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      {totalPages > 1 && (
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
