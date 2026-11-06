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
  <ReaderBar>
    <template v-if="post" #article>
      <PostArticle :post="post" />
    </template>
    <p v-if="!post" class="banner">{{ $t('posts.missing') }}</p>
  </ReaderBar>
</template>
