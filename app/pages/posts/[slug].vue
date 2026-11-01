<script setup lang="ts">
import { computed } from 'vue'
import { postBody, posts } from '~/data/posts'
import { renderMarkdown } from '~/utils/markdown'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})
const post = computed(() => posts.find(item => item.slug === slug.value))
const html = computed(() => {
  const current = post.value
  if (!current) return null
  const source = postBody(current.slug, locale.value)
  if (!source) return null
  return renderMarkdown(source)
})
</script>

<template>
  <article v-if="post" class="post">
    <h1 class="display">{{ $t(post.titleKey) }}</h1>
    <p class="post__excerpt">{{ $t(post.excerptKey) }}</p>
    <div v-if="html" class="post__body" v-html="html" />
    <p v-else class="notice">{{ $t('posts.emptyBody') }}</p>
  </article>
  <p v-else class="banner">{{ $t('posts.missing') }}</p>
</template>
