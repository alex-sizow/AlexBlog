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
    <NuxtLink class="header__brand" :to="localePath('/')">Alexblog</NuxtLink>
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
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--v0-border, oklch(0.812 0.01 260));
  background: var(--v0-surface, oklch(0.99 0.004 260));

  & .header__brand {
    flex: none;
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  & .header__nav {
    display: flex;
    gap: 0.9rem;
    min-width: 0;
    margin: 0;
  }

  & .header__link {
    color: var(--v0-primary, oklch(0.623 0.188 260));
    text-decoration: none;
    white-space: nowrap;

    &.header__link--current {
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }

  & .header__tools {
    display: flex;
    flex: none;
    align-items: center;
    gap: 0.65rem;
    margin-left: auto;
  }

  & .header__switch {
    display: flex;
    margin: 0;
    border: 1px solid var(--v0-border, oklch(0.812 0.01 260));
    border-radius: 999px;
  }

  & .header__option {
    margin: 0;
    padding: 0.15rem 0.55rem;
    border: 0;
    border-radius: 999px;
    background: none;
    color: var(--v0-muted, oklch(0.474 0.016 260));
    font: inherit;
    line-height: 1.4;
    white-space: nowrap;
    cursor: pointer;

    &.header__option--on {
      background: var(--v0-primary, oklch(0.623 0.188 260));
      color: var(--v0-on-primary, oklch(0.99 0.004 260));
      font-weight: 600;
    }
  }
}
</style>
