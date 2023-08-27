<template>
	<header class="header">
		<nuxt-link to="/"
			><img src="@/public/logo.svg" />
		</nuxt-link>
		<nuxt-link to="/">Articles</nuxt-link>
		<nuxt-link to="/">Projects</nuxt-link>
		<nuxt-link to="/about"> About </nuxt-link>
	</header>
</template>

<style lang="scss" scoped>
.header {
	width: 100%;
	position: sticky;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 35px;
	background-color: var(--primary-hover);
	border-radius: 0 0 10px 10px;
	a {
		text-decoration: underline;
	}
}
</style>
