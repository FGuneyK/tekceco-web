import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Tags for posts and SEO.',
  },
  access: {
    read: () => true,
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
      admin: { position: 'sidebar' },
    },
  ],
}
