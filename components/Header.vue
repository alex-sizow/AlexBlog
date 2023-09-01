<script setup></script>

<template>
	<header class="header">
		<nuxt-link to="/"><img src="/logo.svg" /> </nuxt-link>
		<nav class="navigation">
			<nuxt-link to="/articles">Articles</nuxt-link>
			<nuxt-link to="/">Projects</nuxt-link>
			<nuxt-link to="/about"> About </nuxt-link>
		</nav>
		<color-mode-picker />
	</header>
</template>

<style lang="scss">
.header {
	width: 100%;
	position: sticky;
	height: 50px;
	display: flex;
	justify-content: space-between;
	padding: 30px;
	align-items: center;
	gap: 35px;
	background-color: var(--primary-hover);
	border-radius: 0 0 10px 10px;
	a {
		text-decoration: underline;
	}
}

.navigation {
	display: flex;
	justify-content: space-around;
	align-items: center;
	gap: 25px;
}
</style>
