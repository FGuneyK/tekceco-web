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

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full lg:px-32 z-50 backdrop-blur-md bg-background/70 shadow-sm border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <span className="text-xl font-semibold">TEKCECO</span>
        <nav className="hidden md:flex gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/listing">Properties</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about">About</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
              </NavigationMenuItem>
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
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/listing" className="text-lg font-medium">
                  Properties
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
