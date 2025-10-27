'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  const leaders = [
    {
      name: 'Bayram TEKÇE',
      title: 'CEO, TEKCE Real Estate',
      image: '/api/media/file/bayramtekce.jpeg',
      quote: 'Sustainability is not an option. It’s our responsibility for the next generation.',
    },
    {
      name: 'Özkan TEKÇE',
      title: 'COO, TEKCE Real Estate',
      image: '/api/media/file/ozkantekce.jpeg',
      quote: 'Innovation and eco-living must walk hand in hand for a better world.',
    },
    {
      name: 'Aysun TEKÇE',
      title: 'CMO, TEKCE Real Estate',
      image: '/api/media/file/aysuntekce.jpeg',
      quote: 'Green is not just a color. It’s the future of living and real estate.',
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 🌿 Hero */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-emerald-100/30 to-background">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/about-hero.jpg"
            alt="Eco architecture"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Building Tomorrow Responsibly</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          At TEKCE, we redefine global real estate with a vision rooted in sustainability. TEKCECO
          is our commitment to highlighting homes that live in harmony with nature.
        </p>
      </section>

      {/* 🌍 Sustainability Section */}
      <section className="container mx-auto py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Image
            src="/api/media/file/aboutimage.jpg"
            alt="Sustainable architecture"
            width={600}
            height={400}
            className="rounded-xl shadow-md object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Sustainability at the Core of Our Vision</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            TEKCECO highlights eco-friendly properties that reduce energy consumption, support green
            materials, and empower future generations to live sustainably. We search for homes with
            modern architecture with environmental responsibility, making every project a
            contribution to a cleaner planet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="default">
              <Link href="https://tekce.com">Learn more about TEKCE</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://tekceco.com">Discover TEKCECO</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 👥 Leadership Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3">Our Leadership</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Visionary leaders shaping a sustainable real estate future.
          </p>
        </div>

        <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((person) => (
            <Card
              key={person.name}
              className="overflow-hidden border-border bg-card hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-64 w-full">
                <Image src={person.image} alt={person.name} fill className="object-contain" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{person.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{person.title}</p>
              </CardHeader>
              <CardContent>
                <blockquote className="italic text-muted-foreground border-l-4 border-emerald-500 pl-3">
                  “{person.quote}”
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 🌱 CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Green Vision</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover eco-friendly properties that combine luxury, innovation, and sustainability.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/listing">Explore Properties</Link>
        </Button>
      </section>
    </main>
  )
}
