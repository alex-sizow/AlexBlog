<script setup lang="ts"></script>

<template>
	<div>
		<ContentDoc
			:path="`/articles/${$route.params.id}`"
			class="nuxt-content" />
	</div>
</template>

<style scoped></style>
