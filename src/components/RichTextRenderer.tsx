'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export default function RichTextRenderer({ data }: { data: SerializedEditorState }) {
  if (!data || !('root' in data)) return null

  return (
    <div className="prose dark:prose-invert max-w-none leading-relaxed text-foreground/90">
      <RichText data={data} />
    </div>
  )
}
