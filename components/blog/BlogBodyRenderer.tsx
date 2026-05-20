import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { urlFor } from '@/lib/sanity'

interface BlogBodyRendererProps {
  body: any[]
}

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div
          className={cn('relative mx-auto overflow-hidden rounded-2xl my-8', {
            'w-full': value.width === 'full' || !value.width,
            'max-w-4xl': value.width === 'wide',
            'max-w-2xl': value.width === 'medium',
            'max-w-md': value.width === 'narrow',
          })}
        >
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ''}
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
          />
          {value.alt && (
            <span className="mt-2 block text-center text-xs text-zinc-500">
              {value.alt}
            </span>
          )}
        </div>
      )
    },
    imagePair: ({ value }: any) => {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-8">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={urlFor(value.left).url()}
              alt={value.left?.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={urlFor(value.right).url()}
              alt={value.right?.alt || ''}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="leading-relaxed text-zinc-300 text-base mb-4">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-white mb-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-white mb-3">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#ffc200] pl-6 py-2 my-8 text-xl italic text-zinc-200">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
}

export default function BlogBodyRenderer({ body }: BlogBodyRendererProps) {
  if (!body) return null
  
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={body} components={components} />
    </div>
  )
}
