<script setup lang="ts">
import { Toggle, useTheme } from '@vuetify/v0'
import { computed } from 'vue'
import { themeIds, type ThemeId } from '~/theme'

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const theme = useTheme()

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/posts', key: 'nav.posts' },
  { to: '/register', key: 'nav.register' },
] as const

const themeId = computed({
  get: (): ThemeId => theme.selectedId.value === 'dark' ? 'dark' : 'light',
  set: (id) => {
    if (id === 'light' || id === 'dark') theme.select(id)
  },
})

const lang = computed({
  get: () => locale.value,
  set: (code) => {
    if (code === 'en' || code === 'fr') void setLocale(code)
  },
})

function current(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <header class="header">
    <NuxtLink class="header__brand" :to="localePath('/')">
      <svg class="header__mark" viewBox="0 0 40 34" aria-hidden="true">
        <circle cx="12" cy="13" r="10" fill="var(--v0-pink, oklch(0.869 0.070 19))" stroke="currentColor" stroke-width="2.25" />
        <polygon points="23,2 26.6,12.2 37.5,12.4 28.8,18.8 32,29.2 23,23.2 14,29.2 17.2,18.8 8.5,12.4 19.4,12.2" fill="var(--v0-yellow, oklch(0.947 0.103 99))" stroke="currentColor" stroke-width="2.25" stroke-linejoin="round" />
      </svg>
      Alexblog
    </NuxtLink>
    <nav class="header__nav">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        class="header__link"
        :class="{ 'header__link--current': current(link.to) }"
        :to="localePath(link.to)"
        :aria-current="current(link.to) ? 'page' : undefined"
      >
        {{ $t(link.key) }}
      </NuxtLink>
    </nav>
    <div class="header__tools">
      <Toggle.Group
        v-model="themeId"
        mandatory
        namespace="header:theme"
        class="header__switch"
        :label="$t('theme.label')"
      >
        <Toggle.Root
          v-for="id in themeIds"
          :key="id"
          class="header__option"
          :class="{ 'header__option--on': themeId === id }"
          :value="id"
          group-namespace="header:theme"
        >
          {{ $t(`theme.${id}`) }}
        </Toggle.Root>
      </Toggle.Group>
      <Toggle.Group
        v-model="lang"
        mandatory
        namespace="header:lang"
        class="header__switch"
        :label="$t('lang.label')"
      >
        <Toggle.Root
          v-for="item in locales"
          :key="item.code"
          class="header__option"
          :class="{ 'header__option--on': lang === item.code }"
          :value="item.code"
          group-namespace="header:lang"
        >
          {{ item.name }}
        </Toggle.Root>
      </Toggle.Group>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  padding: 0.9rem 1.25rem;
  border-bottom: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
  background: var(--v0-surface, oklch(1 0 0));
  color: var(--v0-on-surface, oklch(0 0 0));

  & .header__brand {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.45rem;
    color: inherit;
    font-weight: 800;
    letter-spacing: -0.04em;
    text-decoration: none;
  }

  & .header__mark {
    display: block;
    width: 2.35rem;
    height: 2rem;
    flex: none;
  }

  & .header__nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    min-width: 0;
    margin: 0;
  }

  & .header__link {
    padding: 0.2rem 0.55rem;
    border: var(--stroke, 3px) solid transparent;
    border-radius: var(--radius, 8px);
    color: inherit;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      background: var(--v0-pink, oklch(0.869 0.070 19));
      color: var(--v0-ink, oklch(0 0 0));
    }

    &.header__link--current {
      border-color: var(--v0-ink, oklch(0 0 0));
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }

  & .header__tools {
    display: flex;
    flex: 1 0 100%;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-left: 0;
  }

  & .header__switch {
    display: flex;
    margin: 0;
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: var(--radius, 8px);
    background: var(--v0-surface, oklch(1 0 0));
  }

  & .header__option {
    margin: 0;
    padding: 0.2rem 0.55rem;
    border: 0;
    border-radius: 5px;
    background: none;
    color: var(--v0-muted, oklch(0.510 0 0));
    font: inherit;
    font-weight: 700;
    line-height: 1.4;
    white-space: nowrap;
    cursor: pointer;

    &.header__option--on {
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }
}
</style>
