import type { CollectionConfig, Access } from 'payload'

const isLoggedIn: Access = ({ req }) => !!req.user

const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

const canUpdateSelfOrAdmin: Access = ({ req, id }) => {
  if (!req.user) return false
  return req.user.role === 'admin' || req.user.id === id
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  auth: {
    tokenExpiration: 7 * 24 * 60 * 60, // 7 days
    verify: true, // enable email verification if SMTP configured
  },
  access: {
    read: isLoggedIn,
    update: canUpdateSelfOrAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
      ],
      required: true,
      defaultValue: 'author',
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
