import { getHumanitarianEvents, getPublishedPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Blog | Afara Top Team',
  description: 'Latest news, training tips, and updates from the dojo.',
}

function mapPostToCard(post: {
  _id: string
  title: string
  slug: { current: string }
  smallDescription?: string
  description?: string
  coverImage?: unknown
  publishedAt: string
  subtitle?: string
  tags?: string[]
}) {
  const category =
    post.tags?.includes('humanitarian-events')
      ? 'Humanitarian'
      : post.subtitle ?? 'Article'

  return {
    id: post._id,
    title: post.title,
    excerpt: post.smallDescription ?? post.description ?? '',
    imageSrc: post.coverImage
      ? urlFor(post.coverImage).width(900).url()
      : 'https://images.pexels.com/photos/6646879/pexels-photo-6646879.jpeg',
    href: `/blog/${post.slug.current}`,
    category,
    date: post.publishedAt,
  }
}

export default async function BlogPage() {
  const [posts, humanitarianEvents] = await Promise.all([
    getPublishedPosts(),
    getHumanitarianEvents(),
  ])

  const cards =
    posts.length > 0
      ? posts.map(mapPostToCard)
      : humanitarianEvents.map((event) => ({
          id: event.id,
          title: event.title,
          excerpt: event.excerpt,
          imageSrc: event.imageSrc,
          href: event.slug ? `/blog/${event.slug}` : '/blog',
          category: event.location ?? 'Humanitarian',
          date: event.date,
        }))

  return (
    <div className="min-h-screen bg-[#10011f] text-white">
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/4753996/pexels-photo-4753996.jpeg"
            alt="Dojo Background"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#10011f]/80 via-[#10011f]/60 to-[#10011f]" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Find your <span className="text-[#ffc200]">warrior</span> spirit in
              every story.
            </h1>

            <div className="mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[#1f00ff]/20 bg-black/40 p-2 backdrop-blur-xl sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-4 py-3">
                <svg
                  className="h-5 w-5 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles, techniques, news..."
                  className="w-full border-none bg-transparent text-white placeholder-zinc-500 focus:ring-0"
                />
              </div>
              <button className="rounded-xl bg-[#ffc200] px-8 py-3 font-bold text-black transition hover:bg-[#ffc200]/90">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">You might like</h2>
          <Link
            href="/vision"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15"
          >
            See all
          </Link>
        </div>

        {cards.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden">
            {cards.map((card) => (
              <BlogCard
                key={card.id}
                className="w-[min(78vw,260px)] shrink-0 sm:w-full"
                title={card.title}
                excerpt={card.excerpt}
                imageSrc={card.imageSrc}
                href={card.href}
                category={card.category}
                date={card.date}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-[2rem] border border-[#1f00ff]/20 bg-black/40">
            <p className="text-zinc-500">Sharpening the blades... Check back soon.</p>
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center gap-4">
          <button className="rounded-xl bg-[#ffc200] px-6 py-3 text-sm font-bold text-black">
            All Articles
          </button>
          <button className="rounded-xl border border-[#1f00ff]/20 bg-[#1f00ff]/10 px-6 py-3 text-sm font-bold text-zinc-400 transition hover:bg-[#1f00ff]/20 hover:text-white">
            Humanitarian
          </button>
          <button className="rounded-xl border border-[#1f00ff]/20 bg-[#1f00ff]/10 px-6 py-3 text-sm font-bold text-zinc-400 transition hover:bg-[#1f00ff]/20 hover:text-white">
            Training
          </button>
          <button className="rounded-xl border border-[#1f00ff]/20 bg-[#1f00ff]/10 px-6 py-3 text-sm font-bold text-zinc-400 transition hover:bg-[#1f00ff]/20 hover:text-white">
            Fighters
          </button>
        </div>
      </section>
    </div>
  )
}
