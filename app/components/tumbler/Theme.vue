<script setup lang="ts">
import { useTheme } from '@vuetify/v0'

const { t } = useI18n()
const theme = useTheme()

const dark = computed({
  get: () => theme.selectedId.value === 'dark',
  set: (on: boolean) => {
    theme.select(on ? 'dark' : 'light')
  },
})

const label = computed(() => `${t('theme.label')}: ${t(dark.value ? 'theme.dark' : 'theme.light')}`)
</script>

<template>
  <TumblerShell v-model="dark" namespace="header:theme" :label="label">
    <template #off>
      <span class="tumbler__glyph tumbler__glyph--emoji tumbler__glyph--sun" aria-hidden="true">☀️</span>
    </template>
    <template #on>
      <span class="tumbler__glyph tumbler__glyph--emoji tumbler__glyph--moon" aria-hidden="true">🌕</span>
    </template>
  </TumblerShell>
</template>
