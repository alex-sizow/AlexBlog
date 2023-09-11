<script setup>
defineProps({
	articles: { type: Array },
});
</script>

<template>
	<div class="list">
		<div
			class="list__item"
			v-for="article in articles"
			:key="article._id">
			<nuxt-link
				:to="article._path"
				class="list__item_image"></nuxt-link>
			<nuxt-link :to="article._path">
				{{ article.title }}
			</nuxt-link>
			<p>{{ article.description }}</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.list {
	margin: 50px 0;
	display: flex;
	gap: 50px;
	flex-wrap: wrap;
	justify-content: space-evenly;
	&__item {
		display: flex;
		flex-direction: column;
		gap: 15px;
		background-color: #f2f0fe;
		width: 320px;
		height: 400px;
		border-radius: 30px;
		padding: 15px;

		a {
			margin-left: 10px;
		}

		p {
			margin-left: 10px;
			font-size: 16px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3; /* Limit the number of lines */
			-webkit-box-orient: vertical;
		}

		&_image {
			margin-left: 0px !important;
			width: 100%;
			border-radius: 15px;
			min-height: 200px;
			background: #fdbf78;
		}
	}
}
</style>
