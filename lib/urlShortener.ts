'use server'

import getCollection from '@/db'
import { MP5Props } from '@/types'

export async function createShortUrl(formData: FormData): Promise<Omit<MP5Props, 'shortened'> | { error: string }> {
  const alias = formData.get('alias')?.toString() ?? ''
  const url = formData.get('url')?.toString() ?? ''

  try {
    new URL(url)
  } catch {
    return { error: 'Invalid URL format' }
  }

  const urls = await getCollection('urls')
  const existing = await urls.findOne({ alias })

  if (existing) {
    return { error: 'Alias already exists' }
  }

  await urls.insertOne({ alias, url })

  return { alias, url }
}