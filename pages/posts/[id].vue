<script setup lang="ts">
const route = useRoute().params;
const { findOne } = useStrapi();

const response: any = await findOne('posts', route.id[0]);
const post = response.data.attributes;
</script>
<template>
	<div v-html="post.text"></div>
	<h1>{{ post.title }}</h1>
</template>

<style scoped></style>
