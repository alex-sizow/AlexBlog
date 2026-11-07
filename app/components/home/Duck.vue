<script setup lang="ts">
import { Button } from '@vuetify/v0/components'
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'
import type { DuckHandle } from '~/duck/scene'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const failed = shallowRef(false)
const quacking = shallowRef(false)
let handle: DuckHandle | undefined
let cancelled = false
let quackTimer = 0

function showQuack() {
  quacking.value = true
  window.clearTimeout(quackTimer)
  quackTimer = window.setTimeout(() => {
    quacking.value = false
  }, 700)
}

function poke() {
  handle?.quack()
}

function onPointerDown(event: PointerEvent) {
  if (event.target === canvas.value && event.currentTarget instanceof HTMLElement) {
    event.currentTarget.focus()
  }
}

function onKey(event: KeyboardEvent) {
  if (event.target !== event.currentTarget) return
  const step = 0.12
  if (event.key === 'ArrowLeft') handle?.orbit(-step, 0)
  else if (event.key === 'ArrowRight') handle?.orbit(step, 0)
  else if (event.key === 'ArrowUp') handle?.orbit(0, step)
  else if (event.key === 'ArrowDown') handle?.orbit(0, -step)
  else if (event.key === 'Enter' || event.key === ' ') poke()
  else return
  event.preventDefault()
}

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  void import('~/duck/scene').then(async ({ startDuck }) => {
    try {
      const started = await startDuck(el, { reduced, onQuack: showQuack })
      if (cancelled) {
        started.dispose()
        return
      }
      handle = started
    } catch {
      if (!cancelled) failed.value = true
    }
  }).catch(() => {
    if (!cancelled) failed.value = true
  })
})

onBeforeUnmount(() => {
  cancelled = true
  window.clearTimeout(quackTimer)
  handle?.dispose()
  handle = undefined
})
</script>

<template>
  <div class="stage">
    <div
      class="stage__view"
      tabindex="0"
      :aria-label="$t('home.duck')"
      @pointerdown="onPointerDown"
      @keydown="onKey"
    >
      <canvas
        ref="canvas"
        class="stage__canvas"
        :hidden="failed"
        aria-hidden="true"
      />
      <p v-if="failed" class="stage__fallback">{{ $t('home.fallback') }}</p>
      <p class="stage__bubble" :class="{ 'stage__bubble--on': quacking }" aria-live="polite">
        {{ quacking ? $t('home.quack') : '' }}
      </p>
      <p class="stage__hint">{{ $t('home.hint') }}</p>
    </div>
    <Button.Root class="stage__quack" :aria-label="$t('home.quack')" @click="poke">
      {{ $t('home.quack') }}
    </Button.Root>
    <p class="stage__credit">{{ $t('home.credit') }}</p>
  </div>
</template>

<style scoped>
.stage {
  margin: 0 0 1.35rem;

  & .stage__view {
    position: relative;
    height: min(72vw, 28rem);
    min-height: 16rem;
    overflow: hidden;
    border: var(--stroke) solid var(--v0-border, oklch(0 0 0));
    border-radius: var(--radius);
    background:
      radial-gradient(ellipse 70% 42% at 50% 82%, oklch(0.78 0.09 230 / 0.55), transparent 70%),
      var(--v0-yellow, oklch(0.947 0.103 99));

    &:focus-visible {
      outline: var(--stroke) solid var(--v0-primary, oklch(0.482 0.298 277));
      outline-offset: 3px;
    }
  }

  & .stage__canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    cursor: grab;
    view-transition-name: stage-canvas;

    &:active {
      cursor: grabbing;
    }
  }

  & .stage__fallback {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    margin: 0;
    padding: 1rem;
    text-align: center;
    font-weight: 800;
  }

  & .stage__hint,
  & .stage__bubble {
    position: absolute;
    margin: 0;
    pointer-events: none;
  }

  & .stage__hint {
    left: 0.7rem;
    bottom: 0.7rem;
    max-width: 16rem;
    color: var(--v0-ink, oklch(0 0 0));
    font-size: 0.85rem;
    font-weight: 800;
  }

  & .stage__bubble {
    top: 12%;
    left: 58%;
    padding: 0.35rem 0.7rem;
    border: var(--stroke) solid var(--v0-ink, oklch(0 0 0));
    border-radius: var(--radius);
    background: var(--v0-pink, oklch(0.869 0.070 19));
    color: var(--v0-ink, oklch(0 0 0));
    font-weight: 800;
    opacity: 0;
  }

  & .stage__bubble--on {
    opacity: 1;
  }

  & .stage__quack {
    margin-top: 0.75rem;
    padding: 0.55rem 0.95rem;
    border: var(--stroke) solid var(--v0-ink, oklch(0 0 0));
    border-radius: var(--radius);
    background: var(--v0-primary, oklch(0.482 0.298 277));
    color: var(--v0-on-primary, oklch(1 0 0));
    font: inherit;
    font-weight: 800;
    cursor: pointer;

    &:hover {
      color: var(--v0-yellow, oklch(0.947 0.103 99));
    }

    &:active {
      transform: translateY(1px);
    }
  }

  & .stage__credit {
    margin: 0.45rem 0 0;
    color: var(--v0-muted, oklch(0.510 0 0));
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stage .stage__quack:active {
    transform: none;
  }
}
</style>
