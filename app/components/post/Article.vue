<script setup lang="ts">
import { computed } from 'vue'
import { postBody, type Post } from '~/data/posts'
import { renderMarkdown } from '~/utils/markdown'

const props = defineProps<{
  post: Post
}>()

const { locale } = useI18n()
const html = computed(() => {
  const source = postBody(props.post.slug, locale.value)
  if (!source) return null
  return renderMarkdown(source)
})
</script>

<template>
  <article class="post">
    <header class="post__head">
      <PostCover class="post__cover" :post="post" :alt="$t(post.titleKey)" />
      <div class="post__intro">
        <h1 class="display">{{ $t(post.titleKey) }}</h1>
        <p class="post__excerpt">{{ $t(post.excerptKey) }}</p>
      </div>
    </header>
    <div v-if="html" class="post__body" v-html="html" />
    <p v-else class="notice">{{ $t('posts.emptyBody') }}</p>
  </article>
</template>
