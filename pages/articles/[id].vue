<script setup lang="ts"></script>

<template>
	<div>
		<ContentDoc
			:path="`/articles/${this.$route.params.id}`" />
	</div>
</template>

<style scoped></style>
