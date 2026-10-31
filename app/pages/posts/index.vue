<script setup lang="ts">
import { posts } from '~/data/posts'
</script>

<template>
  <section>
    <h1>{{ $t('posts.title') }}</h1>
    <ul class="posts">
      <li v-for="post in posts" :key="post.slug" class="posts__item">
        <NuxtLink class="posts__link" :to="$localePath(`/posts/${post.slug}`)">{{ $t(post.titleKey) }}</NuxtLink>
        <p>{{ $t(post.excerptKey) }}</p>
      </li>
    </ul>
  </section>
</template>
