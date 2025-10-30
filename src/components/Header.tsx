'use client'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '@/components/theme-toggle'
import type { Nav } from '@/payload-types'

export function Header({ nav }: { nav: Nav }) {
  return (
    <header className="fixed top-0 left-0 w-full lg:px-32 z-50 backdrop-blur-md bg-background/70 shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <span className="text-xl font-semibold tracking-tight">
          {nav.logoText ? (
            <>
              <span className="text-blue-950 dark:text-white">{nav.logoText.slice(0, 5)}</span>
              <span className="text-primary">{nav.logoText.slice(5)}</span>
            </>
          ) : (
            <>
              <span className="text-blue-950 dark:text-white">TEKCE</span>
              <span className="text-primary">CO</span>
            </>
          )}
        </span>
        <nav className="hidden md:flex gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {nav.links?.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink href={link.href}>{link.label}</NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-8 pb-4 px-6 overflow-y-auto">
              <nav className="flex flex-col gap-6 text-lg font-medium border-t pt-4">
                {nav.links?.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
