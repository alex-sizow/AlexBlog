<script setup lang="ts">
import { useTheme } from '@vuetify/v0'
import { computed } from 'vue'
import { themeIds } from '~/theme'

const { locale, locales, setLocale } = useI18n()
const theme = useTheme()
const selectedTheme = computed(() => theme.selectedId.value)
</script>

<template>
  <div class="shell">
    <header class="top">
      <div>
        <p class="brand">Alexblog</p>
        <nav>
          <NuxtLink :to="$localePath('/')">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink :to="$localePath('/posts')">{{ $t('nav.posts') }}</NuxtLink>
          <NuxtLink :to="$localePath('/register')">{{ $t('nav.register') }}</NuxtLink>
        </nav>
      </div>
      <div class="tools">
        <nav class="switch" :aria-label="$t('theme.label')">
          <button
            v-for="id in themeIds"
            :key="id"
            type="button"
            :aria-pressed="selectedTheme === id"
            @click="theme.select(id)"
          >
            {{ $t(`theme.${id}`) }}
          </button>
        </nav>
        <nav class="switch" :aria-label="$t('lang.label')">
          <button
            v-for="item in locales"
            :key="item.code"
            type="button"
            :aria-current="item.code === locale ? 'true' : undefined"
            @click="setLocale(item.code)"
          >
            {{ item.name }}
          </button>
        </nav>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
