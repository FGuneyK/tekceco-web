/**
 * 🌿 Payload Fetch Helpers for Next.js
 * Works perfectly with ISR & Vercel
 */
import type { Media } from '@/payload-types'

export async function getGlobal<T>(slug: string): Promise<T | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/${slug}`, {
      next: { revalidate: 60 }, // ISR destekli
    })
    if (!res.ok) throw new Error(`Failed to fetch global: ${slug}`)
    return (await res.json()) as T
  } catch (err) {
    console.error(`❌ CMS Fetch Error [${slug}]:`, err)
    return null
  }
}

/**
 * ✅ Güvenli şekilde media URL döner
 * Payload bazen string (id) bazen Media objesi döner
 */
export function getMediaUrl(media: string | Media | null | undefined): string | null {
  if (typeof media === 'object' && media?.url) return media.url
  return null
}

/**
 * ✅ Tarih formatlayıcı (ör: 24 Oct 2025)
 */
export function formatDate(date?: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * ✅ Slugify helper (SEO-safe)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
