'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme-toggle'
import type { Footer } from '@/payload-types'
import { Instagram, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react'

export function SiteFooter({ footer }: { footer: Footer }) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      case 'youtube':
        return <Youtube className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <footer className="border-t border-border lg:px-32 bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto py-12 px-4 md:px-8 flex flex-col md:flex-row justify-between gap-8">
        {/* Left section */}
        <div className="flex flex-col gap-3 max-w-sm">
          <span className="text-xl font-semibold tracking-tight">
            <span className="text-blue-950 dark:text-white">TEKCE</span>
            <span className="text-primary">CO</span>
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sustainable Real Estate. Modern Living. Smarter Future.
          </p>
          {footer.socialLinks && footer.socialLinks.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              {footer.socialLinks.map((link) => (
                <Button
                  key={link.url}
                  variant="ghost"
                  size="icon"
                  asChild
                  aria-label={link.platform ?? 'social'}
                >
                  <Link href={link.url ?? '#'}>{getIcon(link.platform ?? '')}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Center section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground/90 uppercase tracking-wider">
              Explore
            </span>
            {footer.links?.map((link) => (
              <Link
                key={link.href ?? link.label}
                href={link.href ?? '#'}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground/90 uppercase tracking-wider">
              Company
            </span>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/sustainability"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sustainability
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground/90 uppercase tracking-wider">
              Theme
            </span>
            <ModeToggle />
          </div>
        </div>
      </div>

      <Separator className="opacity-50" />

      {/* Bottom section */}
      <div className="py-6 text-center text-xs text-muted-foreground">
        {footer.footerText ?? '© 2025 TEKCECO Real Estate. All rights reserved.'}
      </div>
    </footer>
  )
}
