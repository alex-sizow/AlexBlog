<script setup lang="ts">
import type { Post } from '~/data/posts'

defineProps<{
  post: Post
}>()
</script>

<template>
  <NuxtLink class="preview" :to="$localePath(`/posts/${post.slug}`)">
    <PostCover :post="post">
      <span class="preview__copy">
        <span class="preview__title">{{ $t(post.titleKey) }}</span>
        <span class="preview__excerpt">{{ $t(post.excerptKey) }}</span>
      </span>
    </PostCover>
  </NuxtLink>
</template>

<style scoped>
.preview {
  display: block;
  width: 100%;
  min-width: 0;
  color: inherit;
  text-decoration: none;

  & .preview__copy {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.55rem 0.7rem 0.6rem;
    border-top: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    background: var(--v0-surface, oklch(1 0 0));
    color: var(--v0-on-surface, oklch(0 0 0));
  }

  & .preview__title {
    overflow: hidden;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .preview__excerpt {
    display: -webkit-box;
    overflow: hidden;
    color: var(--v0-muted, oklch(0.510 0 0));
    font-size: 0.85rem;
    line-height: 1.3;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  &:hover .preview__copy {
    background: var(--v0-yellow, oklch(0.947 0.103 99));
    color: var(--v0-ink, oklch(0 0 0));
  }

  &:hover .preview__excerpt {
    color: var(--v0-ink, oklch(0 0 0));
  }
}
</style>
