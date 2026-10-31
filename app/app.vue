<script setup lang="ts">
import { useBreakpoints, useTheme } from '@vuetify/v0'
import { watch } from 'vue'

const theme = useTheme()
const themeCookie = useCookie<'light' | 'dark'>('theme')
const { locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
}))


watch(() => theme.selectedId.value, (id) => {
  if (id === 'light' || id === 'dark') themeCookie.value = id
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
