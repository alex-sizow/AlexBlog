<script setup lang="ts">
import { computed } from 'vue'
import { posts } from '~/data/posts'

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})
const post = computed(() => posts.find(item => item.slug === slug.value))
const body = computed(() => {
  const current = post.value
  if (!current?.bodyKey || !current.paragraphs) return null
  return { key: current.bodyKey, count: current.paragraphs }
})
</script>

<template>
  <article v-if="post">
    <h1>{{ $t(post.titleKey) }}</h1>
    <p>{{ $t(post.excerptKey) }}</p>
    <template v-if="body">
      <p v-for="n in body.count" :key="n">{{ $t(body.key, { n }) }}</p>
    </template>
    <p v-else class="notice">{{ $t('posts.emptyBody') }}</p>
  </article>
  <p v-else>{{ $t('posts.missing') }}</p>
</template>
