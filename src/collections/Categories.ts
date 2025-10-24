import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Categories to group posts.',
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
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional description for this category.' },
    },
  ],
}
