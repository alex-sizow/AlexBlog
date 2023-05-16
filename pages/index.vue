<script setup lang="ts">
const createDate = (time: string) => {
	const date = new Date(time);
	const options: object = {
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		year: 'numeric',
	};
	const formatter = new Intl.DateTimeFormat('ru-RU', options);
	return formatter.format(date);
};
const config = useRuntimeConfig();
const { find } = useStrapi();

const posts: any = await find('posts');
</script>

<template>
	<div class="main">
		{{ config }}
		<NuxtLink
			:to="`posts/${post.id}'`"
			v-for="post in posts.data"
			:key="post.id"
			class="main__item">
			<img
				class="main__item_img"
				src="@/assets/image/wolf.webp"
				alt="" />
			<span class="main__item_title">
				{{ post.attributes.title }}
			</span>
			<div class="main__item_description">
				{{ post.attributes.description }}
			</div>
			<div class="main__item_date">
				{{ createDate(post.attributes.publishedAt) }}
			</div>
		</NuxtLink>
	</div>
</template>

<style scoped lang="scss">
.main {
	display: flex;
	gap: 22px;
	flex-wrap: wrap;
	&__item {
		transition: 0.2s;
		max-width: 250px;
		height: 250px;
		width: 100%;
		position: relative;
		background: linear-gradient(145deg, #ffffff, #dfdede);

		border-radius: 12px;
		box-shadow: 2px 2px 6px 0 rgba(88, 96, 217, 0.37);
		&_img {
			border-radius: 12px;
			width: 100%;
			object-fit: cover;
			object-position: 0px -25px;
			height: 150px;
			filter: brightness(92%);
			transition: 0.25s;
		}
		&_title {
			color: white;
			position: absolute;
			top: 124px;
			left: 12px;
			transition: 0.45s;
			font-weight: 400;
		}
		&_description {
			position: relative;
			padding: 10px;
			font-size: 20px;
			font-weight: 300;
		}
		&_date {
			position: absolute;
			bottom: 10px;
			right: 12px;
			font-size: 10px;
			font-weight: 300;
		}
		&:hover {
			transition: 0.35s;
			scale: 1.01;
			box-shadow: 4px 4px 8px 0 rgba(88, 96, 217, 0.37);
			img {
				transition: 0.38s;
				object-position: 0px -32px;
				filter: brightness(100%);
			}
			span {
				transition: 0.1s;

				font-size: 20px;
			}
			div {
			}
		}
	}
}
</style>
