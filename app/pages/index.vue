<template>
  <section class="home">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.lead') }}</p>
    <p class="home-links">
      <NuxtLink :to="$localePath('/posts')">{{ $t('nav.posts') }}</NuxtLink>
      <NuxtLink :to="$localePath('/register')">{{ $t('nav.register') }}</NuxtLink>
    </p>
  </section>
</template>
