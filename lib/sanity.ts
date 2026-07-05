import { createClient, type SanityClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

let clientInstance: SanityClient | null = null

export function getSanityClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return null

  if (!clientInstance) {
    clientInstance = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2024-05-16',
      useCdn: false,
    })
  }

  return clientInstance
}

export function urlFor(source: any) {
  const client = getSanityClient()
  if (!client) {
    throw new Error('Sanity is not configured')
  }
  return imageUrlBuilder(client).image(source)
}
