import AboutContent from './AboutContent'

export async function generateMetadata() {
  const title = 'About'
  const description =
    'Learn about TEKCECO — a pioneering initiative by TEKCE Real Estate, redefining global real estate through sustainability and eco-friendly innovation.'
  const url = 'https://tekceco.com/about'
  const ogImage = '/images/about-hero.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default function AboutPage() {
  return <AboutContent />
}
