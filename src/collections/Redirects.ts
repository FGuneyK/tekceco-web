import type { CollectionConfig } from 'payload'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    group: 'Settings',
    description: 'Manage 301/302 redirects.',
  },
  access: {
    read: ({ req }) => Boolean(req.user), // only admins or logged users
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      admin: { description: 'Old path (e.g. /old-blog-post)' },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: { description: 'New destination (e.g. /new-blog-post)' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: '301',
      options: [
        { label: '301 – Permanent', value: '301' },
        { label: '302 – Temporary', value: '302' },
      ],
    },
  ],
}
