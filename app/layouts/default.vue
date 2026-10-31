<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
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
      <nav class="lang" :aria-label="$t('lang.label')">
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
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
