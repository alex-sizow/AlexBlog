export interface Post {
  slug: string
  titleKey: string
  excerptKey: string
  image: string
}

export const posts: Post[] = [
  {
    slug: 'hello',
    titleKey: 'posts.hello.title',
    excerptKey: 'posts.hello.excerpt',
    image: '/covers/hello.webp',
  },
  {
    slug: 'fences',
    titleKey: 'posts.fences.title',
    excerptKey: 'posts.fences.excerpt',
    image: '/covers/fences.webp',
  },
  {
    slug: 'scroll',
    titleKey: 'posts.scroll.title',
    excerptKey: 'posts.scroll.excerpt',
    image: '/covers/scroll.webp',
  },
  {
    slug: 'night',
    titleKey: 'posts.night.title',
    excerptKey: 'posts.night.excerpt',
    image: '/covers/night.webp',
  },
]

const rawBodies = import.meta.glob('./bodies/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const bodies = new Map<string, string>()
for (const [path, source] of Object.entries(rawBodies)) {
  if (typeof source !== 'string') continue
  const name = path.split('/').pop()?.replace(/\?.*$/, '')
  if (name) bodies.set(name, source)
}

export function postBody(slug: string, locale: string): string | null {
  return bodies.get(`${slug}.${locale}.md`) ?? null
}
