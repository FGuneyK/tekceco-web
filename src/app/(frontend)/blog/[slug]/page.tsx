import BlogPostContent from './BlogPostContent'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/posts?where[slug][equals]=${params.slug}&depth=3`,
    { next: { revalidate: 60 } },
  )

  const data = await res.json()
  const post = data?.docs?.[0]

  if (!post) {
    return {
      title: 'Post Not Found | TEKCECO Blog',
      description: 'The requested blog post could not be found.',
    }
  }

  const title = `${post.title}`
  const description = post.excerpt || 'Explore more about sustainable living and architecture.'
  const ogImage = post.featuredImage?.url || '/images/blog-hero.jpg'
  const url = `https://tekceco.com/blog/${params.slug}`

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

async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/posts?where[slug][equals]=${slug}&depth=3`,
    { next: { revalidate: 60 } },
  )

  if (!res.ok) throw new Error('Failed to fetch post')
  const data = await res.json()
  return data?.docs?.[0] || null
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return <BlogPostContent post={post} />
}
