<template>
	<section class="theme-switcher">
		<button
			v-for="color of ['light', 'system', 'dark']"
			:key="color"
			class="theme-switcher__button"
			@click="$colorMode.preference = color">
			{{ color }}
		</button>
	</section>
</template>

<style lang="scss" scoped>
.theme-switcher {
	position: relative;
	background: var(--bg);
	padding: 3px 12px;
	border-radius: 15px;
	display: flex;
	justify-content: space-around;
	gap: 18px;

	&__button {
		width: 52px;
		text-align: center;
	}

	&__status {
		position: absolute;
	}
}
</style>
