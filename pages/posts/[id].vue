<script setup lang="ts">
const route = useRoute().params;
const { findOne } = useStrapi();

const response: any = await findOne('posts', route.id[0]);
const post = response.data.attributes;
</script>

<template>
	<div>{{ text }}</div>
	<div class="post">
		<img
			class="post__image"
			src="@/assets/image/wolf.webp"
			alt="" />
		<h1 class="post__title">{{ post.title }}</h1>
		<div class="post__info">
			<div>{{ post.createdAt }}</div>
			<div>#tag</div>
		</div>
		<ContentDoc />

		<div class="post__body">{{ text }}</div>
	</div>
</template>

<style scoped lang="scss">
.post {
	max-width: 830px;
	background: linear-gradient(145deg, #ffffff, #ececec);
	box-shadow: 2px 2px 6px 0 rgba(88, 96, 217, 0.37);

	border-radius: 10px;
	padding: 0px 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 19px;
	gap: 16px;

	&__image {
		border-radius: 20px 0 0 20px;
	}

	&__info {
		max-width: 450px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		div {
			background-color: rgb(82, 82, 216);
			padding: 8px 12px;
			color: #ececec;
			border-radius: 10px;
		}
	}

	&__title {
		font-size: 27px;
		font-weight: 600;
		line-height: 30px;
	}
}
</style>
