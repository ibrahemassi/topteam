import { getPostBySlug } from '@/lib/blog'
import BlogBodyRenderer from '@/components/blog/BlogBodyRenderer'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | Afara Top Team`,
    description: post.smallDescription,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#10011f] pt-24 pb-20 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="mb-12 inline-flex items-center text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-[#ffc200] transition-colors"
          >
            <span className="mr-2">←</span> Back to journal
          </Link>

          <div className="mb-12">
            <div className="mb-6 flex items-center space-x-3">
              <span className="rounded-full bg-[#ffc200] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                Insight
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-medium text-zinc-400">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.1]">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="mt-6 text-2xl text-zinc-400 font-light leading-relaxed">{post.subtitle}</p>
            )}
          </div>

          {post.coverImage && (
            <div className="relative mb-20 aspect-[21/10] w-full overflow-hidden rounded-[2.5rem] border border-[#1f00ff]/20 shadow-2xl">
              <Image
                src={urlFor(post.coverImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10011f]/40 to-transparent" />
            </div>
          )}

          <div className="mx-auto max-w-3xl">
            {post.description && (
              <div className="mb-16 text-2xl leading-relaxed text-zinc-200 font-medium border-l-4 border-[#ffc200] pl-8">
                {post.description}
              </div>
            )}

            <div className="prose prose-invert prose-zinc max-w-none">
              <BlogBodyRenderer body={post.body} />
            </div>

            <div className="mt-24 rounded-3xl border border-[#1f00ff]/20 bg-black/40 p-10 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex items-center space-x-6">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-[#ffc200]/30 bg-black p-1">
                    <Image
                      src="/Logo-from-the-back.png"
                      alt="Afara Top Team"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">Afara Top Team</p>
                    <p className="text-sm text-zinc-500">Official Dojo Publication</p>
                  </div>
                </div>
                <Link
                  href="/#hero-cta"
                  className="w-full sm:w-auto text-center rounded-xl bg-[#1f00ff] px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(31,0,255,0.3)] transition-all hover:scale-105 active:scale-95"
                >
                  Join the Dojo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
