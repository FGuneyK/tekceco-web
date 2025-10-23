'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Variant } from '@/lib/fetchProperties'

export default function PropertyVariantSelector({ variants }: { variants: Variant[] }) {
  const [selected, setSelected] = useState(variants[0])

  return (
    <div className="space-y-4">
      {/* 🔘 Variant badges */}
      {variants.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <Badge
              key={v.id}
              onClick={() => setSelected(v)}
              className={cn(
                'cursor-pointer px-3 py-1.5 text-sm font-medium transition-all border',
                selected.id === v.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background text-foreground hover:bg-muted border-border',
              )}
            >
              {v.subtype}
            </Badge>
          ))}
        </div>
      )}

      {/* 🏷 Selected variant details */}
      <div className="border rounded-md p-4 bg-muted/40">
        <p className="text-lg font-semibold text-emerald-600 mb-2">
          {selected.price.toLocaleString('tr-TR')} {selected.currency}
        </p>
        <p className="text-sm text-muted-foreground">
          {selected.bedrooms ?? '-'} Bedrooms • {selected.bathrooms ?? '-'} Bathrooms •{' '}
          {selected.size ?? '-'} m²
        </p>
      </div>
    </div>
  )
}
