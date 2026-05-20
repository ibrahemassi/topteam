import { getPublishedPosts } from '@/lib/blog'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Blog | Afara Top Team',
  description: 'Latest news, training tips, and updates from the dojo.',
}

export default async function BlogPage() {
  // Commented out Sanity fetch for now
  // const posts = await getPublishedPosts()
  const posts: any[] = []
  
  const featuredPost = posts[0]
  const secondaryPosts = posts.slice(1, 3)
  const remainingPosts = posts.slice(3)

  return (
    <div className="min-h-screen bg-[#10011f] text-white">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
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
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
              Find your <span className="text-[#ffc200]">warrior</span> spirit in every story.
            </h1>
            
            {/* Search/Filter Bar */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-[#1f00ff]/20 max-w-2xl">
              <div className="flex-1 px-4 py-3 flex items-center gap-3">
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search articles, techniques, news..." 
                  className="bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 w-full"
                />
              </div>
              <button className="bg-[#ffc200] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#ffc200]/90 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Row */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 rounded-3xl bg-[#1f00ff]/10 backdrop-blur-2xl border border-[#1f00ff]/20 shadow-2xl">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-[#ffc200]">500+</div>
            <div className="text-sm text-zinc-400 font-medium uppercase tracking-wider">Active Fighters</div>
          </div>
          <div className="space-y-1 border-y md:border-y-0 md:border-x border-[#1f00ff]/20 py-4 md:py-0 md:px-8">
            <div className="text-3xl font-bold text-[#ffc200]">12+</div>
            <div className="text-sm text-zinc-400 font-medium uppercase tracking-wider">Pro Coaches</div>
          </div>
          <div className="space-y-1 md:pl-8">
            <div className="text-3xl font-bold text-[#ffc200]">4</div>
            <div className="text-sm text-zinc-400 font-medium uppercase tracking-wider">Dojo Locations</div>
          </div>
        </div>
      </section>

      {/* 3. Popular/Featured Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Most Popular <span className="text-[#ffc200]">Insights</span></h2>
          <Link href="/blog" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
            View all articles →
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large Featured Card */}
            {featuredPost && (
              <Link 
                href={`/blog/${featuredPost.slug.current}`}
                className="lg:col-span-8 relative group aspect-[16/10] lg:aspect-auto lg:h-[600px] rounded-[2.5rem] overflow-hidden border border-[#1f00ff]/20"
              >
                <Image
                  src={featuredPost.coverImage ? urlFor(featuredPost.coverImage).url() : "https://images.pexels.com/photos/6295875/pexels-photo-6295875.jpeg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <div className="mb-4 inline-block px-4 py-1.5 rounded-full bg-[#ffc200] text-black text-xs font-bold uppercase tracking-widest">
                    Featured
                  </div>
                  <h3 className="text-4xl font-bold mb-4 group-hover:text-[#ffc200] transition-colors">{featuredPost.title}</h3>
                  <p className="text-zinc-300 max-w-xl line-clamp-2">{featuredPost.smallDescription}</p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#ffc200]/30 overflow-hidden bg-black">
                      <Image src="/Logo-from-the-back.png" alt="Logo" width={48} height={48} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Afara Top Team</div>
                      <div className="text-xs text-zinc-500">{new Date(featuredPost.publishedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-10 right-10">
                  <div className="w-14 h-14 rounded-full bg-[#ffc200] flex items-center justify-center text-black shadow-xl transform group-hover:rotate-45 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            )}

            {/* Side Secondary Cards */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {secondaryPosts.map((post) => (
                <Link 
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="relative group flex-1 rounded-[2.5rem] overflow-hidden border border-[#1f00ff]/20 min-h-[280px]"
                >
                  <Image
                    src={post.coverImage ? urlFor(post.coverImage).url() : "https://images.pexels.com/photos/4753987/pexels-photo-4753987.jpeg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#ffc200] transition-colors line-clamp-2">{post.title}</h3>
                    <div className="text-xs text-zinc-400">{new Date(post.publishedAt).toLocaleDateString()}</div>
                  </div>
                  <div className="absolute bottom-8 right-8">
                    <div className="w-10 h-10 rounded-full bg-[#ffc200]/20 backdrop-blur-md border border-[#ffc200]/30 flex items-center justify-center text-[#ffc200] group-hover:bg-[#ffc200] group-hover:text-black transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center rounded-[2.5rem] border border-[#1f00ff]/20 bg-black/40">
            <p className="text-zinc-500">Sharpening the blades... Check back soon.</p>
          </div>
        )}
      </section>

      {/* 4. Filter/Category Bar */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-[#ffc200] text-black font-bold text-sm">All Articles</button>
          <button className="px-6 py-3 rounded-xl bg-[#1f00ff]/10 border border-[#1f00ff]/20 text-zinc-400 font-bold text-sm hover:text-white hover:bg-[#1f00ff]/20 transition-all">Muay Thai</button>
          <button className="px-6 py-3 rounded-xl bg-[#1f00ff]/10 border border-[#1f00ff]/20 text-zinc-400 font-bold text-sm hover:text-white hover:bg-[#1f00ff]/20 transition-all">Wrestling</button>
          <button className="px-6 py-3 rounded-xl bg-[#1f00ff]/10 border border-[#1f00ff]/20 text-zinc-400 font-bold text-sm hover:text-white hover:bg-[#1f00ff]/20 transition-all">Boxing</button>
          <button className="px-6 py-3 rounded-xl bg-[#1f00ff]/10 border border-[#1f00ff]/20 text-zinc-400 font-bold text-sm hover:text-white hover:bg-[#1f00ff]/20 transition-all">MMA</button>
          <button className="px-6 py-3 rounded-xl bg-[#1f00ff]/10 border border-[#1f00ff]/20 text-zinc-400 font-bold text-sm hover:text-white hover:bg-[#1f00ff]/20 transition-all">Nutrition</button>
          
          <div className="ml-auto">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1f00ff] text-white font-bold text-sm hover:bg-[#1f00ff]/80 transition-all">
              <span>Subscribe to Newsletter</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Grid Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold">Explore the <span className="text-[#ffc200]">Archives</span></h2>
        </div>

        {remainingPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {remainingPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#1f00ff]/10 mb-4">
                  <Image
                    src={post.coverImage ? urlFor(post.coverImage).url() : "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2 px-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#ffc200]">Article</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ffc200] transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-500 font-medium">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <div className="px-3 py-1 rounded-full bg-[#1f00ff]/10 text-[#1f00ff] text-[10px] font-bold group-hover:bg-[#1f00ff] group-hover:text-white transition-all">
                      Read
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder cards if no remaining posts */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/3] bg-zinc-900 rounded-3xl" />
                <div className="h-4 bg-zinc-900 rounded w-3/4" />
                <div className="h-4 bg-zinc-900 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
