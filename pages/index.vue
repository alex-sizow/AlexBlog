<script setup lang="ts">
import ArticleList from '~/components/acticles/articleList.vue';

const { data } = await useAsyncData(() => {
	return queryContent('/articles/').find();
});
</script>

<template>
	<div class="intro">
		<p class="intro__hi">Hi, my name name is</p>
		<h1 class="intro__name">Alex Sizow</h1>

		<div class="intro__photo">
			<img
				src="@/assets/images/I.png"
				alt="I" />
			<h2 class="intro__photo_about">
				I’m a frontend developer in love with the Web,
				browsers, ducks and France
			</h2>
			<h3 class="intro__photo_description">
				Here you can find my thoughts on web development, some
				of my
				<a
					href="https://github.com/alex-sizow"
					target="_blank"
					>projects</a
				>, and information
				<nuxt-link to="/about">about me</nuxt-link>
			</h3>
		</div>
	</div>
	<div class="articles">
		<div class="articles__header">
			<h1>ARTICLES</h1>
			<nuxt-link to="/articles"> View all </nuxt-link>
		</div>

		<ArticleList :articles="data" />
	</div>
</template>

<style lang="scss" scoped>
.intro {
	position: relative;
	display: flex;
	flex-direction: column;

	&__hi {
		position: absolute;
		left: 40px;
		top: 10px;
	}

	&__name {
		font-size: 140px;
	}

	&__photo {
		width: 500px;
		margin-top: 20px;
		position: relative;
		img {
			width: 505px;
			border-radius: 30px;
			background-color: #febf70;
		}

		&_about {
			position: absolute;
			font-size: 29px;
			width: 333px;
			top: 50px;
			right: -301px;
		}

		&_description {
			position: absolute;
			font-size: 19px;
			width: 300px;
			bottom: 50px;
			right: -325px;
			a {
				color: black;
				text-decoration: underline;
			}
		}
	}
}

.articles {
	margin-top: 110px;
	&__header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid black;
		h1 {
			font-size: 60px;
		}
		a {
			font-size: 21px;
			color: black;
			text-decoration: underline;
		}
	}

	&__list {
		margin: 50px 0;
		display: flex;
		gap: 50px;
		flex-wrap: wrap;
		&_item {
			background-color: #f2f0fe;
			width: 320px;
			height: 320px;
			border-radius: 30px;
			padding: 15px;
		}
	}
}
</style>
