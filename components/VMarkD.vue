<script setup>
const props = defineProps({
	text: {
		type: String,
		default: '# Hello World!',
	},
});
</script>

<template lang="md">
{{text}}
</template>

<style lang="scss" scoped></style>
