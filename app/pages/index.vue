<template>
  <section class="home">
    <HomeDuck />
    <h1 class="display">{{ $t('home.title') }}</h1>
    <p class="home__lead">{{ $t('home.lead') }}</p>
    <p class="home__links">
      <NuxtLink class="home__link" :to="$localePath('/posts')">{{ $t('nav.posts') }}</NuxtLink>
      <NuxtLink class="home__link home__link--primary" :to="$localePath('/register')">{{ $t('nav.register') }}</NuxtLink>
    </p>
  </section>
</template>
