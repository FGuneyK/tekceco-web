import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let FlatCompat
try {
  // Dinamik import ile CJS modülünü çağırıyoruz
  const eslintrc = await import('@eslint/eslintrc')
  FlatCompat = eslintrc.FlatCompat
} catch {
  const { FlatCompat: CJSFlatCompat } = await import('@eslint/eslintrc/dist/eslintrc.cjs').catch(
    () => ({}),
  )
  FlatCompat = CJSFlatCompat
}

if (!FlatCompat) {
  console.warn(
    '⚠️ Could not import FlatCompat from @eslint/eslintrc, skipping ESLint compatibility setup.',
  )
}

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: ['.next/'],
  },
]

export default eslintConfig
