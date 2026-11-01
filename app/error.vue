<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
  }
}>()

const code = computed(() => props.error?.statusCode ?? 404)

useHead({ title: () => String(code.value) })

function leave(event: MouseEvent) {
  const a = (event.target as Element | null)?.closest('a')
  if (!a) return
  const href = a.getAttribute('href')
  if (!href || /^(https?:|mailto:|tel:)/.test(href) || a.getAttribute('target') === '_blank') return
  event.preventDefault()
  event.stopPropagation()
  clearError({ redirect: href })
}
</script>

<template>
  <div class="miss-page" @click.capture="leave">
    <div class="miss-page__bar">
      <AppHeader />
    </div>
    <main class="miss">
      <h1 class="miss__code">
        <template v-if="code === 404">
          <img class="miss__gif miss__gif--play" src="/never-gonna.gif" alt="">
          <img class="miss__gif miss__gif--still" src="/never-gonna.png" alt="" aria-hidden="true">
        </template>
        <span v-else class="miss__num">{{ code }}</span>
        <span class="miss__sr">{{ code }}</span>
      </h1>
    </main>
  </div>
</template>

<style>
.miss-page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--v0-canvas, oklch(0.922 0 0));
  color: var(--v0-on-surface, oklch(0 0 0));
  font-family: var(--font, Outfit, sans-serif);
}

.miss-page__bar {
  width: min(100%, var(--frame, 42rem));
  margin: 0 auto;
  background: var(--v0-surface, oklch(1 0 0));
}

.miss {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.miss__code {
  margin: 0;
}

.miss__gif {
  display: block;
  width: min(94vw, calc((100dvh - 6rem) * 1255 / 440));
  aspect-ratio: 1255 / 440;
  object-fit: cover;
  object-position: center 28%;
  -webkit-mask: url("/404-mask.png") center / 100% 100% no-repeat;
  mask: url("/404-mask.png") center / 100% 100% no-repeat;
}

.miss__gif--still {
  display: none;
}

.miss__num {
  font-family: Outfit, "Arial Black", Impact, sans-serif;
  font-weight: 800;
  line-height: 0.8;
}

.miss__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .miss__gif--play {
    display: none;
  }

  .miss__gif--still {
    display: block;
  }
}
</style>
