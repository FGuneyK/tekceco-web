'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PropertySearch from '@/components/PropertySearch'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-12 lg:py-20">
        <div className="text-center">
          {/* Başlık */}
          <motion.h1
            className="scroll-m-20 lg:pb-6 text-4xl font-extrabold tracking-tight lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-950 dark:to-blue-700">
              Navy
            </span>{' '}
            TEKCE quality meets sustainable{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-lime-700">
              green
            </span>{' '}
            at <span className="text-blue-950 dark:text-white tracking-tight">TEKCE</span>
            <span className="text-primary">CO</span>.
          </motion.h1>

          {/* Alt açıklama */}
          <motion.p
            className="mt-2 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Find the eco-friendly property of your dreams.
          </motion.p>

          {/* Arama */}
          <motion.div
            className="mt-1 sm:mt-12 mx-auto max-w-xl relative"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <form>
              <PropertySearch />
            </form>

            {/* SVG süslemeleri */}
            <div className="hidden md:block absolute bottom-20 right-8 -translate-y-12 translate-x-20">
              <svg
                className="w-16 h-auto text-blue-700"
                width={121}
                height={135}
                viewBox="0 0 121 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="hidden md:block absolute bottom-0 left-0 translate-y-10 -translate-x-32">
              <svg
                className="w-40 h-auto text-primary"
                width={347}
                height={188}
                viewBox="0 0 347 188"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
