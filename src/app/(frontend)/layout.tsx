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
  const defaultSEO = settings?.defaultSEO

  const siteName = settings?.siteName || 'TEKCECO'
  const baseUrl = (settings as any)?.siteUrl || 'https://tekceco.com'

  const ogImageUrl = getMediaUrl(defaultSEO?.ogImage) || `${baseUrl}/og-default.jpg`
  const defaultTitle =
    defaultSEO?.title || 'Sustainable Real Estate. Modern Living. Smarter Future.'
  const defaultDescription =
    defaultSEO?.description ||
    'Explore eco-friendly properties and sustainable investments with TEKCECO – a smarter way to live and invest.'

  // 🔹 Otomatik olarak “| TEKCECO” ekleyen yardımcı fonksiyon
  const formatTitle = (title: string) => {
    const clean = title?.includes(siteName) ? title : `${title} | ${siteName}`
    return clean
  }

  return {
    title: {
      default: formatTitle(defaultTitle),
      template: `%s | ${siteName}`, // Sayfa metadata’larında otomatik olarak eklenir
    },
    description: defaultDescription,

    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },

    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName,
      title: formatTitle(defaultTitle),
      description: defaultDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: formatTitle(defaultTitle),
      description: defaultDescription,
      images: [ogImageUrl],
      creator: '@tekceglobal',
    },

    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    themeColor: '#00897B',
    manifest: '/site.webmanifest',
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
