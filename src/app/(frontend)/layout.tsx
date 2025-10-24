import React from 'react'
import './globals.css'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { getGlobal, getMediaUrl } from '@/lib/payload'
import type { Nav, Footer, SiteSetting } from '@/payload-types'

export const revalidate = 60 // ISR: her 60 saniyede CMS’ten günceller

export async function generateMetadata() {
  const settings = await getGlobal<SiteSetting>('site-settings')

  const ogImageUrl = getMediaUrl(settings?.defaultSEO?.ogImage)

  return {
    title: settings?.defaultSEO?.title || settings?.siteName || 'TEKCECO',
    description:
      settings?.defaultSEO?.description ||
      'Sustainable Real Estate. Modern Living. Smarter Future.',
    openGraph: {
      title: settings?.defaultSEO?.title || settings?.siteName || 'TEKCECO',
      description:
        settings?.defaultSEO?.description ||
        'Sustainable Real Estate. Modern Living. Smarter Future.',
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [nav, footer] = await Promise.all([getGlobal<Nav>('nav'), getGlobal<Footer>('footer')])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {nav && <Header nav={nav} />}
          <main className="pt-16 min-h-screen">{children}</main>
          {footer && <SiteFooter footer={footer} />}
        </ThemeProvider>
      </body>
    </html>
  )
}
