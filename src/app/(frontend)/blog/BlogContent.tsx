'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function BlogContent({ posts }: { posts: any[] }) {
  return (
    <section className="container max-w-6xl mx-auto py-24 px-4 md:px-8">
      {/* 📰 Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Our Insights</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore sustainable living, architecture, and innovation through our latest editorials.
        </p>
      </div>

      {/* 🧱 Posts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => {
          const img = post.featuredImage?.url || '/placeholder.jpg'
          return (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group relative">
              <Card className="overflow-hidden border-border/70 hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={img}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="space-y-1">
                  <CardTitle className="line-clamp-2 text-lg font-semibold">{post.title}</CardTitle>

                  {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((cat: any) => (
                        <Badge key={cat.id} variant="outline" className="text-xs">
                          {cat.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    • {post.readingTime} min read
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
