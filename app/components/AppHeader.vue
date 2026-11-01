<script setup lang="ts">
import { Overflow, Menu } from '@vuetify/v0/components'
import { Switch, useTheme } from '@vuetify/v0'
import { onMounted, shallowRef, watch } from 'vue'

const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const theme = useTheme()

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/posts', key: 'nav.posts' },
  { to: '/register', key: 'nav.register' },
] as const

const open = shallowRef<string | number | null>(null)
const ready = shallowRef(false)

const dark = computed({
  get: () => theme.selectedId.value === 'dark',
  set: (on: boolean) => {
    theme.select(on ? 'dark' : 'light')
  },
})

const french = computed({
  get: () => locale.value === 'fr',
  set: (on: boolean) => {
    void setLocale(on ? 'fr' : 'en')
  },
})

const langName = computed(() => {
  const item = locales.value.find(entry => entry.code === locale.value)
  return item && 'name' in item && item.name ? item.name : locale.value
})

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
  <header class="header">
    <div class="header__bar">
      <NuxtLink class="header__brand" :to="localePath('/')" aria-label="Alexblog">
        <img class="header__mark" src="/logo.jpg" alt="" width="48" height="48">
        <span class="header__name">Alexblog</span>
      </NuxtLink>
      <Overflow.Root as="nav" class="header__nav" :gap="0" :aria-label="$t('nav.label')">
        <Overflow.Item
          v-for="link in links"
          :key="link.to"
          class="header__slot"
          :value="link.to"
          :disabled="!ready"
        >
          <NuxtLink
            class="header__link"
            :class="{ 'header__link--current': current(link.to) }"
            :to="localePath(link.to)"
            :aria-current="current(link.to) ? 'page' : undefined"
          >
            {{ $t(link.key) }}
          </NuxtLink>
        </Overflow.Item>
        <Overflow.Item disabled class="header__spacer" aria-hidden="true" />
        <Overflow.Indicator v-slot="{ hidden }" class="header__more">
          <Menu.Root v-model="open">
            <Menu.Activator class="header__toggle" :aria-label="$t('nav.menu')">
              <span class="header__bars" aria-hidden="true" />
            </Menu.Activator>
            <Menu.Content
              class="header__menu"
              position-area="bottom span-right"
              position-try="flip-inline, flip-block"
              @keydown.capture="onMenuKey"
            >
              <Menu.Item
                v-for="ticket in hidden"
                :key="String(ticket.value)"
                as="a"
                class="header__item"
                :class="{ 'header__item--current': current(pathOf(ticket.value)) }"
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
      <div class="header__tools">
        <span class="tumbler">
          <Switch.Root
            v-model="dark"
            class="tumbler__switch"
            namespace="header:theme"
            :label="`${$t('theme.label')}: ${$t(dark ? 'theme.dark' : 'theme.light')}`"
          >
            <Switch.Track class="tumbler__track" namespace="header:theme">
              <span class="tumbler__glyph tumbler__emoji tumbler__emoji--sun" aria-hidden="true">☀️</span>
              <span class="tumbler__glyph tumbler__emoji tumbler__emoji--moon" aria-hidden="true">🌕</span>
              <Switch.Thumb class="tumbler__knob" namespace="header:theme" />
            </Switch.Track>
          </Switch.Root>
        </span>
        <span class="tumbler">
          <Switch.Root
            v-model="french"
            class="tumbler__switch"
            namespace="header:lang"
            :label="`${$t('lang.label')}: ${langName}`"
          >
            <Switch.Track class="tumbler__track" namespace="header:lang">
              <span class="tumbler__glyph" aria-hidden="true">
                <svg class="tumbler__mark" viewBox="15 0 30 30" width="17" height="17">
                  <rect width="60" height="30" fill="oklch(0.30 0.09 264)" />
                  <path d="M0 0 L60 30 M60 0 L0 30" fill="none" stroke="oklch(1 0 0)" stroke-width="8" />
                  <path d="M0 0 L60 30 M60 0 L0 30" fill="none" stroke="oklch(0.50 0.19 25)" stroke-width="3.4" />
                  <path d="M30 0 V30 M0 15 H60" fill="none" stroke="oklch(1 0 0)" stroke-width="12" />
                  <path d="M30 0 V30 M0 15 H60" fill="none" stroke="oklch(0.50 0.19 25)" stroke-width="7" />
                </svg>
              </span>
              <span class="tumbler__glyph" aria-hidden="true">
                <svg class="tumbler__mark" viewBox="0 0 3 3" width="17" height="17">
                  <rect width="1" height="3" fill="oklch(0.42 0.14 264)" />
                  <rect x="1" width="1" height="3" fill="oklch(1 0 0)" />
                  <rect x="2" width="1" height="3" fill="oklch(0.58 0.21 27)" />
                </svg>
              </span>
              <Switch.Thumb class="tumbler__knob" namespace="header:lang" />
            </Switch.Track>
          </Switch.Root>
        </span>
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

  & .header__nav {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-width: 0;
    margin: 0;
  }

  & .header__slot {
    margin-inline-end: 8px;
  }

  & .header__spacer {
    flex: 1 1 auto;
    min-width: 0;
    height: 0;
  }

  & .header__link {
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

    &.header__link--current {
      border-color: var(--v0-ink, oklch(0 0 0));
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }

  & .header__more {
    display: flex;
    flex: none;
    align-items: center;
  }

  & .header__toggle {
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

  & .header__bars {
    width: 1.05rem;
    height: 2px;
    background: currentColor;
    box-shadow: 0 -0.32rem 0 currentColor, 0 0.32rem 0 currentColor;
  }

  & .header__menu {
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

  & .header__item {
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

    &.header__item--current {
      border-color: var(--v0-ink, oklch(0 0 0));
      background: var(--v0-yellow, oklch(0.947 0.103 99));
      color: var(--v0-ink, oklch(0 0 0));
    }
  }

  & .header__tools {
    display: flex;
    flex: none;
    align-items: center;
    gap: 0.5rem;
  }

  & .tumbler {
    --knob: 1.85rem;
    --gap: 0.14rem;
    --pad: 0.1rem;
    --flag: 1.05rem;
    display: inline-flex;
    flex: none;

    &:active {
      &:deep(.tumbler__knob) {
        transform: scale(0.94);
      }

      &:deep(.tumbler__knob[data-state='checked']) {
        transform: translateX(calc(100% + var(--gap))) scale(0.94);
      }
    }
  }

  &:deep(.tumbler__switch) {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    line-height: 0;
    cursor: pointer;
    appearance: none;
  }

  &:deep(.tumbler__track) {
    position: relative;
    display: grid;
    grid-template-columns: var(--knob) var(--knob);
    gap: var(--gap);
    align-items: center;
    justify-items: center;
    width: max-content;
    min-height: calc(var(--knob) + var(--pad) * 2 + var(--stroke, 3px) * 2);
    margin: 0;
    padding: var(--pad);
    border: var(--stroke, 3px) solid var(--v0-border, oklch(0 0 0));
    border-radius: 999px;
    background: var(--v0-canvas, oklch(0.922 0 0));
  }

  & .tumbler__glyph {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: var(--flag);
    height: var(--flag);
    overflow: hidden;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px oklch(0 0 0 / 0.35);
  }

  & .tumbler__emoji {
    width: var(--knob);
    height: var(--knob);
    overflow: visible;
    box-shadow: none;
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
    font-size: 1.15rem;
    line-height: 1;
    user-select: none;
  }

  & .tumbler__emoji--sun {
    transform: translate(0.05em, 0.1em);
  }

  & .tumbler__emoji--moon {
    transform: translate(0.07em, 0.11em);
  }

  & .tumbler__mark {
    display: block;
    width: 100%;
    height: 100%;
  }

  &:deep(.tumbler__knob) {
    position: absolute;
    z-index: 0;
    top: var(--pad);
    left: var(--pad);
    width: var(--knob);
    height: var(--knob);
    border: var(--stroke, 3px) solid var(--v0-ink, oklch(0 0 0));
    border-radius: 50%;
    background: var(--v0-yellow, oklch(0.947 0.103 99));
    transition: transform 160ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:deep(.tumbler__knob[data-state='checked']) {
    transform: translateX(calc(100% + var(--gap)));
  }

  @media (prefers-reduced-motion: reduce) {
    &:deep(.tumbler__knob) {
      transition: none;
    }
  }
}
</style>
