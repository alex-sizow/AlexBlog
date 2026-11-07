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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 1fr));
  gap: 0.85rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;

  & .posts__item {
    min-width: 0;
  }
}
</style>
