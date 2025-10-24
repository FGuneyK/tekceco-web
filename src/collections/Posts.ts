import type { CollectionConfig } from 'payload'
import readingTime from 'reading-time'
import slugify from 'slugify'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'publishedAt'],
    group: 'Content',
    description: 'Blog articles and editorials.',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title && !data?.slug) {
              data.slug = slugify(data.title, { lower: true, strict: true })
            }
            return data
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary for SEO and previews (used in meta description).',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // You can add or customize features here, e.g.:
          // Custom heading levels or uploads
        ],
      }),
      required: true,
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.content) {
              const plainText =
                typeof data.content === 'string' ? data.content : JSON.stringify(data.content)
              const stats = readingTime(plainText)
              data.readingTime = Math.ceil(stats.minutes)
            }
            return data
          },
        ],
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
