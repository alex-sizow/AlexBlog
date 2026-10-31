<template>
  <section class="home">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.lead') }}</p>
    <p class="home__links">
      <NuxtLink class="home__link" :to="$localePath('/posts')">{{ $t('nav.posts') }}</NuxtLink>
      <NuxtLink class="home__link" :to="$localePath('/register')">{{ $t('nav.register') }}</NuxtLink>
    </p>
  </section>
</template>
