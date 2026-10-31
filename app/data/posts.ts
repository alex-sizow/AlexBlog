export interface Post {
  slug: string
  titleKey: string
  excerptKey: string
  bodyKey?: string
  paragraphs?: number
}

export const posts: Post[] = [
  {
    slug: 'blabla',
    titleKey: 'posts.blabla.title',
    excerptKey: 'posts.blabla.excerpt',
    bodyKey: 'posts.blabla.paragraph',
    paragraphs: 40,
  },
  {
    slug: 'hello',
    titleKey: 'posts.hello.title',
    excerptKey: 'posts.hello.excerpt',
  },
  {
    slug: 'skeleton',
    titleKey: 'posts.skeleton.title',
    excerptKey: 'posts.skeleton.excerpt',
  },
]
