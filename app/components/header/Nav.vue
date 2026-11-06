<script setup lang="ts">
import { Overflow, Menu } from '@vuetify/v0/components'
import { onMounted, shallowRef, watch } from 'vue'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/posts', key: 'nav.posts' },
  { to: '/about', key: 'nav.about' },
  { to: '/register', key: 'nav.register' },
] as const

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const open = shallowRef<string | number | null>(null)
const ready = shallowRef(false)

function arm() {
  ready.value = false
  requestAnimationFrame(() => {
    ready.value = true
  })
}

watch(() => route.path, () => {
  open.value = null
})

watch(locale, arm)

onMounted(() => {
  arm()
  void document.fonts.ready.then(arm)
})

function current(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`)
}

function pathOf(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function labelOf(value: unknown) {
  const link = links.find(entry => entry.to === value)
  return link ? t(link.key) : ''
}

function onMenuKey(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const item = (event.target as Element | null)?.closest('a')
  if (item instanceof HTMLAnchorElement) item.click()
}
</script>

<template>
  <Overflow.Root as="nav" class="header-nav" :gap="0" :aria-label="$t('nav.label')">
    <Overflow.Item
      v-for="link in links"
      :key="link.to"
      class="header-nav__slot"
      :value="link.to"
      :disabled="!ready"
    >
      <NuxtLink
        class="header-nav__link"
        :class="{ 'header-nav__link--current': current(link.to) }"
        :to="localePath(link.to)"
        :aria-current="current(link.to) ? 'page' : undefined"
      >
        {{ $t(link.key) }}
      </NuxtLink>
    </Overflow.Item>
    <Overflow.Item disabled class="header-nav__spacer" aria-hidden="true" />
    <Overflow.Indicator v-slot="{ hidden }" class="header-nav__more">
      <Menu.Root v-model="open">
        <Menu.Activator class="header-nav__toggle" :aria-label="$t('nav.menu')">
          <span class="header-nav__bars" aria-hidden="true" />
        </Menu.Activator>
        <Menu.Content
          class="header-nav__menu"
          position-area="bottom span-right"
          position-try="flip-inline, flip-block"
          @keydown.capture="onMenuKey"
        >
          <Menu.Item
            v-for="ticket in hidden"
            :key="String(ticket.value)"
            as="a"
            class="header-nav__item"
            :class="{ 'header-nav__item--current': current(pathOf(ticket.value)) }"
            :href="localePath(pathOf(ticket.value))"
            :label="labelOf(ticket.value)"
            :aria-current="current(pathOf(ticket.value)) ? 'page' : undefined"
          >
            {{ labelOf(ticket.value) }}
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </Overflow.Indicator>
  </Overflow.Root>
</template>

<style scoped>
.header-nav {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  margin: 0;

  & .header-nav__slot {
    margin-inline-end: 8px;
  }

  & .header-nav__spacer {
    flex: 1 1 auto;
    min-width: 0;
    height: 0;
  }

  & .header-nav__link {
    display: inline-block;
    padding: 0.3rem 0.65rem;
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

    &.header-nav__link--current {
      border-color: var(--v0-ink, oklch(0 0 0));
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }

  & .header-nav__more {
    display: flex;
    flex: none;
    align-items: center;
  }

  & .header-nav__toggle {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    margin: 0;
    padding: 0;
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: var(--radius, 8px);
    background: var(--v0-surface, oklch(1 0 0));
    color: inherit;
    cursor: pointer;
    appearance: none;

    &:hover,
    &[data-state='open'] {
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }

  & .header-nav__bars {
    width: 1.05rem;
    height: 2px;
    background: currentColor;
    box-shadow: 0 -0.32rem 0 currentColor, 0 0.32rem 0 currentColor;
  }

  & .header-nav__menu {
    inset: auto;
    width: max-content;
    min-width: 11rem;
    max-width: min(18rem, calc(100vw - 1.5rem));
    margin: 0.4rem 0 0;
    padding: 0.35rem;
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: var(--radius, 8px);
    background: var(--v0-surface, oklch(1 0 0));
    color: var(--v0-on-surface, oklch(0 0 0));
    overflow: visible;
  }

  & .header-nav__item {
    display: block;
    padding: 0.4rem 0.7rem;
    border: var(--stroke, 3px) solid transparent;
    border-radius: var(--radius, 8px);
    color: inherit;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;

    &:hover,
    &[data-highlighted='true'] {
      background: var(--v0-pink, oklch(0.869 0.070 19));
      color: var(--v0-ink, oklch(0 0 0));
    }

    &.header-nav__item--current {
      border-color: var(--v0-ink, oklch(0 0 0));
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }
}
</style>
