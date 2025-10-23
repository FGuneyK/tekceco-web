import Hero from '@/components/Hero'
import HighlightedProperties from '@/components/HighlightedProperties'
import ExploreCards from '@/components/ExploreCards'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center">
      <Hero />
      <HighlightedProperties />
      <ExploreCards />
    </main>
  )
}
