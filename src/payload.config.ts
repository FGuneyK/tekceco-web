import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

// Collections
import { Users } from './collections/Users'
import { Authors } from './collections/Authors'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { Redirects } from './collections/Redirects'

// Globals
import { Nav } from './globals/Nav'
import { SiteSettings } from './globals/SiteSettings'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },

  collections: [Users, Authors, Media, Categories, Tags, Posts, Pages, Redirects],
  globals: [Nav, SiteSettings, Footer],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,

  plugins: [
    payloadCloudPlugin(),

    seoPlugin({
      collections: ['posts', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => doc?.title ?? '',
      generateDescription: ({ doc }) => doc?.excerpt ?? '',
    }),

    // 🪣 Vercel Blob sadece "media" koleksiyonu için
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
