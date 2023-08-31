<script setup lang="ts">
import ArticleList from '~/components/acticles/articleList.vue';

const { data } = await useAsyncData(() => {
	return queryContent('/articles/').find();
});
</script>

<template>
	<div><ArticleList :articles="data" /></div>
</template>

<style scoped></style>
