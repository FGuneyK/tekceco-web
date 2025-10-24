import type { GlobalConfig } from 'payload'

export const Nav: GlobalConfig = {
  slug: 'nav',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      defaultValue: 'TEKCECO',
      admin: { description: 'Displayed next to the logo in the header.' },
    },
    {
      name: 'links',
      type: 'array',
      label: 'Navigation Links',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
