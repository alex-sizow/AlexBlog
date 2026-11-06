<script setup lang="ts">
import { posts } from '~/data/posts'
</script>

<template>
  <section>
    <h1 class="display">{{ $t('posts.title') }}</h1>
    <ul class="posts">
      <li class="posts__item" v-for="post in posts" :key="post.slug">
        <PostPreview :post="post" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;

  & .posts__item {
    flex: 1 1 14rem;
    min-width: min(100%, 14rem);
    max-width: 100%;
  }
}
</style>
