<script setup lang="ts">
import { computed } from 'vue'
import { posts } from '~/data/posts'

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})
const post = computed(() => posts.find(item => item.slug === slug.value))
</script>

<template>
  <article v-if="post">
    <h1>{{ $t(post.titleKey) }}</h1>
    <p>{{ $t(post.excerptKey) }}</p>
    <p class="notice">{{ $t('posts.emptyBody') }}</p>
  </article>
  <p v-else>{{ $t('posts.missing') }}</p>
</template>
