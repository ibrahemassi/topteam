import { getSiteData } from './site-data'
import { pexelsUrl } from './pexels-url'
import { getSanityClient, urlFor } from './sanity'

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  subtitle?: string
  smallDescription?: string
  description?: string
  coverImage?: any
  publishedAt: string
  body: any[]
  tags?: string[]
}

export interface HumanitarianEvent {
  id: string
  title: string
  date: string
  location?: string
  excerpt: string
  imageSrc: string
  slug: string
}

function mapDummyEvents(): HumanitarianEvent[] {
  const events = getSiteData().vision.humanitarianEvents ?? []
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    location: event.location,
    excerpt: event.excerpt,
    imageSrc: pexelsUrl(event.imagePexelsId, 1200),
    slug: event.slug,
  }))
}

function mapSanityPostToEvent(post: Post): HumanitarianEvent {
  return {
    id: post._id,
    title: post.title,
    date: post.publishedAt,
    location: post.subtitle,
    excerpt: post.smallDescription ?? post.description ?? '',
    imageSrc: post.coverImage
      ? urlFor(post.coverImage).width(1200).url()
      : pexelsUrl(6646879, 1200),
    slug: post.slug.current,
  }
}

export async function getHumanitarianEvents(): Promise<HumanitarianEvent[]> {
  const client = getSanityClient()
  if (!client) return mapDummyEvents()

  const query = `*[_type == "post" && "humanitarian-events" in tags && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    subtitle,
    smallDescription,
    description,
    coverImage,
    publishedAt,
    tags
  }`

  try {
    const posts = await client.fetch<Post[]>(query)
    if (posts.length > 0) {
      return posts.map(mapSanityPostToEvent)
    }
  } catch (error) {
    console.error('Error fetching humanitarian events from Sanity:', error)
  }

  return mapDummyEvents()
}

export async function getPublishedPosts() {
  const client = getSanityClient()
  if (!client) return []

  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`
  try {
    const posts = await client.fetch(query)
    return posts as Post[]
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  const client = getSanityClient()
  if (!client) return null

  const query = `*[_type == "post" && slug.current == $slug][0]`
  try {
    const post = await client.fetch(query, { slug })
    return post as Post
  } catch (error) {
    console.error('Error fetching post by slug from Sanity:', error)
    return null
  }
}
