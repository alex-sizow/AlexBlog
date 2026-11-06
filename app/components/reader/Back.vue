<template>
  <NuxtLink class="back" :to="$localePath('/posts')" :aria-label="$t('posts.back')">
    <svg class="back__arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="1.6" d="M13 4.2v3.6h7.2v8.4H13v3.6L3.4 12z" />
    </svg>
  </NuxtLink>
</template>

<style scoped>
.back {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.65rem;
  height: 2.65rem;
  border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
  border-radius: 50%;
  background: #fe71aa;
  color: var(--v0-ink, oklch(0 0 0));

  &:hover {
    background: var(--v0-yellow, oklch(0.947 0.103 99));
  }

  &:hover .back__arrow {
    transform: translateX(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  & .back__arrow {
    display: block;
    width: 1.45rem;
    height: 1.45rem;
    transition: transform 140ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    & .back__arrow {
      transition: none;
    }
  }
}
</style>
