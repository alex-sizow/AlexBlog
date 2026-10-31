export interface Post {
  slug: string
  titleKey: string
  excerptKey: string
}

export const posts: Post[] = [
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
