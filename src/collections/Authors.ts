import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'twitter', 'website'],
  },
  access: {
    read: () => true, // public
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Generated automatically if left empty.',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Short biography of the author.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Author photo.',
      },
    },
    {
      name: 'twitter',
      type: 'text',
      admin: {
        description: 'Twitter/X profile (optional)',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'Personal website (optional)',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9\\s-]/g, '')
            .trim()
            .replace(/\\s+/g, '-')
            .slice(0, 96)
        }
        return data
      },
    ],
  },
}
