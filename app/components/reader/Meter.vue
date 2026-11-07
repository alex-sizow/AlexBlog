<template>
  <div class="meter" aria-hidden="true">
    <div class="meter__track">
      <div class="meter__fill" />
    </div>
  </div>
</template>

<style scoped>
.meter {
  flex: 1;
  min-width: 0;

  & .meter__track {
    height: 0.7rem;
    overflow: hidden;
    border: var(--stroke, 3px) solid var(--v0-ink, oklch(0 0 0));
    border-radius: 999px;
    background: var(--v0-canvas, oklch(0.922 0 0));
  }

  & .meter__fill {
    width: 100%;
    height: 100%;
    background: var(--v0-primary, oklch(0.482 0.298 277));
    transform: scaleX(var(--read, 0));
    transform-origin: left center;
  }
}
</style>
