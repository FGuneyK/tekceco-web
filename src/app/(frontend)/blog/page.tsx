import BlogContent from './BlogContent'

export const revalidate = 60

export async function generateMetadata() {
  const title = 'Our Insights'
  const description =
    'Explore sustainable living, architecture, and innovation through TEKCECO’s latest articles and insights.'
  const url = 'https://tekceco.com/blog'
  const ogImage = '/images/blog-hero.jpg'

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

async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/posts?limit=12&where[status][equals]=published&sort=-publishedAt`,
    {
      next: { revalidate: 60 },
    },
  )

  if (!res.ok) throw new Error('Failed to fetch posts')
  const data = await res.json()
  return data.docs || []
}

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogContent posts={posts} />
}
