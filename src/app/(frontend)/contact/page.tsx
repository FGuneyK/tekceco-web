import ContactContent from './ContactContent'

export async function generateMetadata() {
  const title = 'Contact Global Offices'
  const description =
    'Reach out to TEKCECO offices worldwide. Our expert teams in Spain, Türkiye, Dubai, North Cyprus, and Sweden are ready to guide you toward sustainable real estate investments.'
  const url = 'https://tekceco.com/contact'
  const ogImage = '/images/contact-hero.jpg'

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

export default function ContactPage() {
  return <ContactContent />
}
