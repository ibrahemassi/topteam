import { client } from './sanity'

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
}

export async function getPublishedPosts() {
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
  const query = `*[_type == "post" && slug.current == $slug][0]`
  try {
    const post = await client.fetch(query, { slug })
    return post as Post
  } catch (error) {
    console.error('Error fetching post by slug from Sanity:', error)
    return null
  }
}
