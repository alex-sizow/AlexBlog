<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localeCookie = useCookie<'en' | 'fr'>('lang')

const french = computed({
  get: () => locale.value === 'fr',
  set: (on: boolean) => {
    const next = on ? 'fr' : 'en'
    localeCookie.value = next
    crossfade(() => setLocale(next))
  },
})

const langName = computed(() => {
  const item = locales.value.find(entry => entry.code === locale.value)
  return item && 'name' in item && item.name ? item.name : locale.value
})

const label = computed(() => `${t('lang.label')}: ${langName.value}`)
</script>

<template>
  <TumblerShell v-model="french" namespace="header:lang" :label="label">
    <template #off>
      <span class="tumbler__glyph" aria-hidden="true">
        <svg class="locale-tumbler__mark" viewBox="15 0 30 30" width="17" height="17">
          <rect width="60" height="30" fill="oklch(0.30 0.09 264)" />
          <path d="M0 0 L60 30 M60 0 L0 30" fill="none" stroke="oklch(1 0 0)" stroke-width="8" />
          <path d="M0 0 L60 30 M60 0 L0 30" fill="none" stroke="oklch(0.50 0.19 25)" stroke-width="3.4" />
          <path d="M30 0 V30 M0 15 H60" fill="none" stroke="oklch(1 0 0)" stroke-width="12" />
          <path d="M30 0 V30 M0 15 H60" fill="none" stroke="oklch(0.50 0.19 25)" stroke-width="7" />
        </svg>
      </span>
    </template>
    <template #on>
      <span class="tumbler__glyph" aria-hidden="true">
        <svg class="locale-tumbler__mark" viewBox="0 0 3 3" width="17" height="17">
          <rect width="1" height="3" fill="oklch(0.42 0.14 264)" />
          <rect x="1" width="1" height="3" fill="oklch(1 0 0)" />
          <rect x="2" width="1" height="3" fill="oklch(0.58 0.21 27)" />
        </svg>
      </span>
    </template>
  </TumblerShell>
</template>

<style scoped>
.locale-tumbler__mark {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
