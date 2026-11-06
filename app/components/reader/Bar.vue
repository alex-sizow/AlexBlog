<template>
  <div class="reader">
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
  timeline-scope: --read;

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

  & .reader__article {
    view-timeline: --read block;
  }
}
</style>
