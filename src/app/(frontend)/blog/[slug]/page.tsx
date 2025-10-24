'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import RichTextRenderer from '@/components/RichTextRenderer'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/posts?where[slug][equals]=${slug}&depth=3`,
          { cache: 'no-store' },
        )
        const data = await res.json()
        setPost(data?.docs?.[0])
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }

    if (slug) fetchPost()
  }, [slug])

  if (!post) {
    return <div className="container py-20 text-center">Loading...</div>
  }

  const { title, author, featuredImage, categories, publishedAt, readingTime, content } = post

  return (
    <article className="container max-w-4xl mx-auto px-4 py-16">
      {/* 🖼️ Kapak görseli */}
      {featuredImage?.url && (
        <div className="relative w-full h-[400px] mb-10 rounded-2xl overflow-hidden">
          <Image
            src={featuredImage.url}
            alt={title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      {/* 🧾 Başlık ve Meta */}
      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {categories?.map((cat: any) => (
            <Badge key={cat.id} variant="secondary">
              {cat.title || cat.name}
            </Badge>
          ))}

          {publishedAt && (
            <span>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}

          {readingTime && <span>• {readingTime} min read</span>}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h1>

        {author && (
          <p className="text-sm text-muted-foreground">
            By <span className="font-medium text-foreground">{author.name}</span>
          </p>
        )}
      </header>

      <Separator className="my-8 opacity-50" />

      {/* ✨ RichText içeriği */}
      {content ? (
        <RichTextRenderer data={content} />
      ) : (
        <p className="text-muted-foreground italic">This post has no content.</p>
      )}

      <Separator className="my-12 opacity-50" />

      {/* 🔻 Footer */}
      <footer className="flex justify-between items-center text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} TEKCECO</span>
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/company/tekceco"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/tekceco"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </div>
      </footer>
    </article>
  )
}
