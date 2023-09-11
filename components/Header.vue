<script setup>
const navigationStatus = ref(true);

const toggleStatus = () =>
	(navigationStatus.value = !navigationStatus.value);
</script>

<template>
	<header class="header">
		<nuxt-link to="/"><img src="/logo.svg" /> </nuxt-link>
		<nav class="navigation">
			<nuxt-link to="/articles">Articles</nuxt-link>
			<nuxt-link to="/">Projects</nuxt-link>
			<nuxt-link to="/about"> About </nuxt-link>
		</nav>
		<color-mode-picker class="color-picker" />
		<div
			class="toggle-button"
			@click="toggleStatus">
			<i>🧡</i>
		</div>
	</header>
	<div
		class="dropdown-menu"
		v-if="navigationStatus">
		<nav class="navigation">
			<color-mode-picker />
			<nuxt-link to="/articles">Articles</nuxt-link>
			<nuxt-link to="/">Projects</nuxt-link>
			<nuxt-link to="/about"> About </nuxt-link>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
.header {
	width: 100vw;
	position: sticky;
	z-index: 2;
	top: 0px;
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
.toggle-button {
	display: none;
}

.dropdown-menu {
	display: none;
	position: sticky;
	left: 55%;
	top: 80px;
	width: 300px;
	padding: 24px;
	background-color: var(--primary-hover);
	border-radius: 12px;
	backdrop-filter: blur(15px);
	z-index: 10;
	.navigation {
		display: flex;
		flex-direction: column;
	}
}

@media (max-width: 880px) {
	.navigation {
		display: none;
	}
	.color-picker {
		display: none;
	}

	.toggle-button {
		display: block;
	}

	.dropdown-menu {
		display: block;
	}
}
</style>
