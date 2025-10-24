import type { CollectionConfig } from 'payload'
import readingTime from 'reading-time'
import slugify from 'slugify'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// === Lexical JSON'dan düz metin çıkarma fonksiyonu ===
// JSON.stringify() KESİNLİKLE KULLANILMAZ!
function getPlainTextFromLexical(lexicalData: any): string {
  try {
    if (!lexicalData) return ''
    if (typeof lexicalData === 'string') return lexicalData

    const traverse = (node: any): string => {
      if (!node) return ''
      if (node.text) return node.text
      if (node.children && Array.isArray(node.children)) {
        return node.children.map(traverse).join(' ')
      }
      return ''
    }

    if (lexicalData.root) {
      return traverse(lexicalData.root)
    }

    return ''
  } catch (err) {
    console.error('getPlainTextFromLexical failed:', err)
    return ''
  }
}

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
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // İstersen özel Lexical node veya plugin ekleyebilirsin
        ],
      }),
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar' },
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
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          return {
            ...data,
            slug: slugify(data.title, { lower: true, strict: true }),
          }
        }
        return data
      },
    ],
    beforeChange: [
      ({ data }) => {
        const updatedData = { ...data }

        // ✅ Lexical JSON'dan plain text çıkarıp okuma süresini hesapla
        if (updatedData?.content) {
          const plainText = getPlainTextFromLexical(updatedData.content)
          const stats = readingTime(plainText)
          updatedData.readingTime = Math.ceil(stats.minutes)
        }

        // ✅ Yayın tarihini otomatik doldur
        if (updatedData?.status === 'published' && !updatedData?.publishedAt) {
          updatedData.publishedAt = new Date().toISOString()
        }

        return updatedData
      },
    ],
  },
}
