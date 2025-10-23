import { fetchProperties } from '@/lib/fetchProperties'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchProperties()
  return NextResponse.json(data)
}
