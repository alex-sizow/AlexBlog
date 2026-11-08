<script setup lang="ts">
import { useBreakpoints, useHydration, usePrefersDark, useTheme } from '@vuetify/v0'
import { watch } from 'vue'
import type { ThemeId } from '~/theme'

const theme = useTheme()
const themeCookie = useCookie<string | null>('theme')
const seen = useCookie<string | null>('color-scheme')
const { locale } = useI18n()
const hydration = useHydration()
const { matches: prefersDark } = usePrefersDark()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
}))

watch([prefersDark, hydration.isHydrated], ([dark, hydrated]) => {
  if (!hydrated || themeCookie.value === 'light' || themeCookie.value === 'dark') return
  const id: ThemeId = dark ? 'dark' : 'light'
  if (theme.selectedId.value !== id) theme.select(id)
  if (seen.value !== id) seen.value = id
})

const { width } = useBreakpoints()
const widthCookie = useCookie<number>('viewport-width')

watch(width, (value) => {
  widthCookie.value = value
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
