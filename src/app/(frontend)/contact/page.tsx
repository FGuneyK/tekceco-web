'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [country, setCountry] = useState('all')

  const offices = [
    // 🇪🇸 Spain
    {
      country: 'Spain',
      city: 'Málaga, Benalmádena',
      address: 'C/El Montículo 8, 29631 Benalmádena, Málaga, Spain',
      phone: '+34 951 83 02 02',
    },
    {
      country: 'Spain',
      city: 'Alicante, Orihuela Costa',
      address:
        'Carretera de Villamartín 12, Urbanización La Zenia II, Casa 22, 03189 Orihuela Costa, Alicante, Spain',
      phone: '+34 951 83 02 02',
    },

    // 🇹🇷 Türkiye
    {
      country: 'Türkiye',
      city: 'Antalya, Lara',
      address:
        'Çağlayan Mahallesi, Barınaklar Bulvarı no: 5, Daire:3, 07235, Muratpaşa, Antalya, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'Antalya, Konyaaltı',
      address:
        'Gürsu Mahallesi, Atatürk Bulvarı no: 183, Mustafa Altunbaş İş Merkezi, Kat:4, Daire:8, 07070, Konyaaltı, Antalya, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'Antalya, Alanya',
      address:
        'Kızlarpınarı Mahallesi, Kızlarpınarı Caddesi no: 45/B, 07460, Alanya, Antalya, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'Antalya, Belek',
      address: 'Belek Mahallesi, Köprü Caddesi no: 17/104, Serik, Antalya, Türkiye',
      phone: '+90 850 811 23 23',
      email: '[email protected]',
    },
    {
      country: 'Türkiye',
      city: 'Antalya, Döşemealtı',
      address: 'Altınkale Mahallesi 4056. Sokak No:9/A Döşemealtı, Antalya, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'İstanbul, Cevizlibağ',
      address:
        'Maltepe Mahallesi Yedikule Çırpıcı Yolu Sokak no:2 Avrupa Ofis Blok ofis: 12, 34010, Cevizlibağ, Zeytinburnu, İstanbul, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'İstanbul, Göztepe',
      address:
        'Merdivenköy Mahallesi Nur Sokak no: 1A, Business Istanbul A Blok 410, 34732, Göztepe, Kadıköy, İstanbul, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'Ankara',
      address:
        'Kızılırmak Mahallesi, Ufuk Üniversitesi Caddesi, 1445 Sokak no: 2, Paragon Tower B134, 06530, Çankaya, Ankara, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'Muğla, Bodrum',
      address: 'Konacık Mahallesi, Atatürk Bulvarı no:285/1B, 48480, Bodrum, Muğla, Türkiye',
      phone: '+90 850 811 23 23',
      email: '[email protected]',
    },
    {
      country: 'Türkiye',
      city: 'Muğla, Fethiye',
      address: 'Babataşı Mahallesi Adnan Menderes Bulvarı No:97, Fethiye, Muğla, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'Mersin, Mezitli',
      address:
        'Cumhuriyet Mahallesi Gazi Mustafa Kemal Bulvarı No:961/AA, Mezitli, Mersin, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'Bursa',
      address:
        'Konak Mah. Lefkoşe Cad. Barış Sok. No:3 Ofis Artı İş Merkezi Kat:2 No:15, Nilüfer, Bursa, Türkiye',
      phone: '+90 850 811 23 23',
      email: '[email protected]',
    },
    {
      country: 'Türkiye',
      city: 'Trabzon',
      address:
        'Kaşüstü Mahallesi, Devlet Karayolu Caddesi No: 29, Kat: 4, Daire:32 61250, Yomra, Trabzon, Türkiye',
      phone: '+90 850 811 23 23',
      email: '[email protected]',
    },
    {
      country: 'Türkiye',
      city: 'Yalova',
      address:
        'Süleyman Bey Mahallesi İstiklal Cad. no: 67/1-A, Elif Apt. 77200 Merkez, Yalova, Türkiye',
      phone: '+90 850 811 23 23',
    },
    {
      country: 'Türkiye',
      city: 'İzmir',
      address:
        'Mansuroğlu Mahallesi 1593/1 Sokak No:4 Lider Centrio İş Merkezi B Blok Kat:8 No:86, Bayraklı, İzmir, Türkiye',
      phone: '+90 850 811 23 23',
    },

    // 🇨🇾 North Cyprus
    {
      country: 'North Cyprus',
      city: 'Girne',
      address: 'Beşparmaklar Cad. No:144, Çatalköy, Girne 9370, North Cyprus',
      phone: '+90 850 811 23 23',
    },

    // 🇦🇪 UAE
    {
      country: 'United Arab Emirates',
      city: 'Dubai',
      address:
        'Düsseldorf Business Point Floor: 9 Office: 906 Al Barsha 1, Dubai, United Arab Emirates',
      phone: '+971 521 958 490',
    },

    // 🇸🇪 Sweden
    {
      country: 'Sweden',
      city: 'Stockholm, Bromma',
      address: 'Bällstavägen 58, 16872 Bromma, Sweden',
      phone: '+46 8 420 022 44',
    },
  ]

  const filtered = country === 'all' ? offices : offices.filter((o) => o.country === country)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 🌍 Hero */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-emerald-100/30 to-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/contact-hero.jpg"
            alt="TEKCE offices"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Worldwide TEKCE Offices</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          Need help? Our global team is just a message away. Reach out to any of our offices for
          local expertise and sustainable real estate guidance.
        </p>
      </section>

      {/* 🌎 Filter & Offices */}
      <section className="container mx-auto py-10 text-center">
        <div className="flex justify-center mb-6">
          <Select onValueChange={setCountry} value={country}>
            <SelectTrigger className="w-[220px] bg-card text-card-foreground border border-border shadow-sm hover:bg-muted/60">
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent className="bg-card text-card-foreground border border-border">
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="Spain">Spain</SelectItem>
              <SelectItem value="Türkiye">Türkiye</SelectItem>
              <SelectItem value="North Cyprus">North Cyprus</SelectItem>
              <SelectItem value="United Arab Emirates">UAE</SelectItem>
              <SelectItem value="Sweden">Sweden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((office) => (
            <Card
              key={office.city}
              className="bg-card border border-border hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              <CardHeader>
                <CardTitle>{office.city}</CardTitle>
                <p className="text-sm text-muted-foreground">{office.country}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{office.address}</p>
                <p className="text-sm font-medium">📞 {office.phone}</p>
                <p className="text-sm text-primary underline"></p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href="https://tekce.com/contact" target="_blank" rel="noopener noreferrer">
              Visit TEKCE Main Contact Page
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
