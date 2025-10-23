import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import newsImg from '@/assets/hnavcards-news.jpg'
import propertiesImg from '@/assets/hnavcards-properties.jpg'
import destinationsImg from '@/assets/hnavcards-destinations.jpg'
import corporateImg from '@/assets/hnavcards-corporate.jpeg'

export default function ExploreCards() {
  return (
    <section className="w-full container mx-auto my-16">
      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-3 h-128">
        {/* News Card */}
        <div
          className="relative flex flex-col justify-end pb-10 pl-5 rounded-xl w-1/3 overflow-hidden group shadow-lg"
          style={{
            backgroundImage: `url(${newsImg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent rounded-xl" />
          <div className="relative z-10 text-white">
            <p className="font-bold text-2xl mb-1">Sustainability News</p>
            <p className="text-white/90">Explore the latest sustainability news from the world.</p>
            <Link href="/blog">
              <Button
                variant="outline"
                className="
    mt-3
    border border-white/70
    text-black
    dark:text-white
    dark:bg-white/10
    dark:backdrop-blur-md
    hover:bg-white/20
    hover:text-white
    dark:hover:bg-white/20
    transition-all
    duration-300
    shadow-sm
    dark:shadow-md
    hover:shadow-lg
  "
              >
                Learn Latest News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col gap-3 w-1/3">
          {/* Corporate */}
          <div
            className="relative flex flex-col justify-end pb-10 pl-5 rounded-xl h-1/2 overflow-hidden group shadow-lg"
            style={{
              backgroundImage: `url(${corporateImg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black rounded-xl" />
            <div className="relative z-10 text-white">
              <p className="font-bold text-2xl mb-1">Green Future by TEKCE</p>
              <p className="text-white/90">
                Learn about TEKCE and its contributions to the future.
              </p>
              <Link href="/corporate">
                <Button
                  variant="outline"
                  className="
    mt-3
    border border-white/70
    text-black
    dark:text-white
    dark:bg-white/10
    dark:backdrop-blur-md
    hover:bg-white/20
    hover:text-white
    dark:hover:bg-white/20
    transition-all
    duration-300
    shadow-sm
    dark:shadow-md
    hover:shadow-lg
  "
                >
                  About TEKCE
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Destinations */}
          <div
            className="relative flex flex-col justify-end pb-10 pl-5 rounded-xl h-1/2 overflow-hidden group shadow-lg"
            style={{
              backgroundImage: `url(${destinationsImg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black rounded-xl" />
            <div className="relative z-10 text-white">
              <p className="font-bold text-2xl mb-1">Green Destinations</p>
              <p className="text-white/90">Find your next sustainable destination.</p>
              <Link href="/destinations">
                <Button
                  variant="outline"
                  className="
    mt-3
    border border-white/70
    text-black
    dark:text-white
    dark:bg-white/10
    dark:backdrop-blur-md
    hover:bg-white/20
    hover:text-white
    dark:hover:bg-white/20
    transition-all
    duration-300
    shadow-sm
    dark:shadow-md
    hover:shadow-lg
  "
                >
                  All Destinations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div
          className="relative flex flex-col justify-end pb-10 pl-5 rounded-xl w-1/3 overflow-hidden group shadow-lg"
          style={{
            backgroundImage: `url(${propertiesImg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent rounded-xl" />
          <div className="relative z-10 text-white">
            <p className="font-bold text-2xl mb-1">Eco-Friendly Properties</p>
            <p className="text-white/90">Best eco-friendly properties all over the world.</p>
            <Link href="/listing">
              <Button
                variant="outline"
                className="
    mt-3
    border border-white/70
    text-black
    dark:text-white
    dark:bg-white/10
    dark:backdrop-blur-md
    hover:bg-white/20
    hover:text-white
    dark:hover:bg-white/20
    transition-all
    duration-300
    shadow-sm
    dark:shadow-md
    hover:shadow-lg
  "
              >
                See All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-wrap gap-2 lg:hidden mt-10">
        {/* News */}
        <div
          className="relative flex flex-col justify-end h-56 sm:h-80 w-full sm:w-1/2 rounded-xl overflow-hidden group p-4 shadow-lg"
          style={{
            backgroundImage: `url(${newsImg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent rounded-xl" />
          <div className="relative z-10 text-white">
            <p className="font-bold text-lg">Sustainability News</p>
            <p className="text-white/90">Explore the latest sustainability news from the world.</p>
            <Link href="/blog">
              <Button
                variant="outline"
                className="mt-3 text-black border-white hover:bg-white/20 transition hover:text-white"
              >
                Learn Latest News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Corporate + Destinations */}
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <div
            className="relative flex flex-col justify-end h-56 sm:h-40 rounded-xl overflow-hidden group p-4 shadow-lg"
            style={{
              backgroundImage: `url(${corporateImg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black rounded-xl" />
            <div className="relative z-10 text-white">
              <p className="font-bold text-lg">Green Future by TEKCE</p>
              <p className="text-white/90">
                Learn about TEKCE and its contributions to the future.
              </p>
              <Link href="/corporate">
                <Button
                  variant="outline"
                  className="mt-3 text-black border-white hover:bg-white/20 transition hover:text-white"
                >
                  About TEKCE
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div
            className="relative flex flex-col justify-end h-56 sm:h-40 rounded-xl overflow-hidden group p-4 shadow-lg"
            style={{
              backgroundImage: `url(${destinationsImg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black rounded-xl" />
            <div className="relative z-10 text-white">
              <p className="font-bold text-lg">Green Destinations</p>
              <p className="text-white/90">Find your next sustainable destination.</p>
              <Link href="/destinations">
                <Button
                  variant="outline"
                  className="mt-3 text-black border-white hover:bg-white/20 transition hover:text-white"
                >
                  All Destinations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div
          className="relative flex flex-col justify-end h-56 sm:h-80 w-full sm:w-1/2 rounded-xl overflow-hidden group p-4 shadow-lg"
          style={{
            backgroundImage: `url(${propertiesImg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent rounded-xl" />
          <div className="relative z-10 text-white">
            <p className="font-bold text-lg">Eco-Friendly Properties</p>
            <p className="text-white/90">Best eco-friendly properties all over the world.</p>
            <Link href="/listing">
              <Button
                variant="outline"
                className="mt-3 text-black border-white hover:bg-white/20 transition hover:text-white"
              >
                See All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
