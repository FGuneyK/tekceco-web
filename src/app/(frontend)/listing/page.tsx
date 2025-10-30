import ListingContent from './ListingContent'

export async function generateMetadata() {
  const title = 'Eco-Friendly Properties | TEKCECO'
  const description =
    'Explore sustainable and eco-friendly real estate options in Spain, Türkiye, Dubai, and North Cyprus.'
  const url = 'https://tekceco.com/listings'
  const ogImage = '/og-image.jpg'

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

export default function ListingPage() {
  return <ListingContent />
}
