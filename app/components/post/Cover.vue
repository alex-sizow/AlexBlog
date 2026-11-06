<script setup lang="ts">
import { AspectRatio, Image } from '@vuetify/v0/components'
import type { Post } from '~/data/posts'

defineProps<{
  post: Post
  alt?: string
}>()
</script>

<template>
  <AspectRatio class="cover">
    <span class="cover__stage">
      <Image.Root class="cover__media" :src="post.image">
        <Image.Placeholder class="cover__plate" />
        <Image.Img
          class="cover__img"
          :alt="alt ?? ''"
          width="800"
          height="800"
          decoding="async"
        />
        <Image.Fallback class="cover__plate" />
      </Image.Root>
      <slot />
    </span>
  </AspectRatio>
</template>

<style scoped>
.cover {
  position: relative;
  display: block;
  overflow: hidden;
  border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
  border-radius: var(--radius, 8px);
  background: var(--v0-pink, oklch(0.869 0.070 19));

  & .cover__stage {
    position: absolute;
    inset: 0;
  }

  &:deep(.cover__media),
  &:deep(.cover__img),
  &:deep(.cover__plate) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &:deep(.cover__img) {
    object-fit: cover;
  }

  &:deep(.cover__plate) {
    background: var(--v0-pink, oklch(0.869 0.070 19));
  }
}
</style>
