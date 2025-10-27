import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    description: 'Uploaded media files stored on Vercel Blob Storage.',
  },
  access: {
    read: () => true,
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
      { name: 'full', width: 1920, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Alternative text for accessibility and SEO.' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Displayed below image (optional).' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer or source credit (optional).' },
    },
  ],
}
