<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <header class="header">
    <div class="header__bar">
      <NuxtLink class="header__brand" :to="localePath('/')" aria-label="Alexblog">
        <img class="header__mark" src="/logo.jpg" alt="" width="48" height="48">
        <span class="header__name">Alexblog</span>
      </NuxtLink>
      <HeaderNav />
      <div class="header__tools">
        <TumblerTheme />
        <TumblerLocale />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1;
  container: header / inline-size;
  border-bottom: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
  background: var(--v0-surface, oklch(1 0 0));
  color: var(--v0-on-surface, oklch(0 0 0));

  & .header__bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
    padding: 0.7rem 1.1rem;

    @container header (max-width: 28rem) {
      & .header__name {
        display: none;
      }
    }

    @container header (max-width: 22rem) {
      gap: 0.5rem;
      padding-inline: 0.7rem;
    }
  }

  & .header__brand {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.55rem;
    min-width: 0;
    color: inherit;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    text-decoration: none;
  }

  & .header__mark {
    display: block;
    width: 3rem;
    height: 3rem;
    flex: none;
    object-fit: cover;
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: var(--radius, 8px);
  }

  & .header__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .header__tools {
    display: flex;
    flex: none;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>

<style>
:root {
  --header-block: calc(3rem + 1.4rem + var(--stroke, 3px));
}
</style>
