<script setup lang="ts">
import { readProgress } from '~/utils/readProgress'

const root = useTemplateRef('root')
let frame = 0
let observer: ResizeObserver | undefined

function measure() {
  const el = root.value
  const article = el?.querySelector('.reader__article')
  if (!el || !article) return
  const box = article.getBoundingClientRect()
  el.style.setProperty('--read', String(readProgress(box.top, box.height, window.innerHeight)))
}

function schedule() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  const article = root.value?.querySelector('.reader__article')
  if (!article) return
  observer = new ResizeObserver(schedule)
  observer.observe(article)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="reader">
    <div class="reader__bar">
      <ReaderBack />
      <ReaderMeter v-if="$slots.article" />
    </div>
    <div v-if="$slots.article" class="reader__article">
      <slot name="article" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.reader {
  & .reader__bar {
    position: sticky;
    top: var(--header-block, calc(3rem + 1.4rem + var(--stroke, 3px)));
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: -1.75rem -1.5rem 1.1rem;
    padding: 0.7rem 1.5rem;
    border-bottom: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    background: var(--v0-surface, oklch(1 0 0));
  }
}
</style>
