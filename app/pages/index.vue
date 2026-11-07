<script setup lang="ts">
import { posts } from '~/data/posts'

const featured = posts.slice(0, 3)
</script>

<template>
  <div class="home">
    <HomeIntro />
    <ul class="home__posts">
      <li class="home__posts-item" v-for="post in featured" :key="post.slug">
        <PostPreview :post="post" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home__posts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;

  & .home__posts-item {
    min-width: 0;
  }
}

@media (max-width: 40rem) {
  .home__posts {
    grid-template-columns: 1fr;
  }
}
</style>
