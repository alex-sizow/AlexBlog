<script setup>
const activePosition = ref(90);
const activeWidth = ref(90);

const positionHandler = (color) => {
	switch (color) {
		case 'light':
			activePosition.value = 0;
			activeWidth.value = 0;
			break;
		case 'system':
			activePosition.value = 80;
			activeWidth.value = 0;
			break;
		case 'dark':
			activePosition.value = 135;
			activeWidth.value = 0;
			break;
		default:
			break;
	}
};
</script>

<template>
	<section class="theme-switcher">
		<button
			v-for="color of ['light', 'system', 'dark']"
			:key="color"
			class="theme-switcher__button"
			@click="
				($colorMode.preference = color),
					positionHandler(color)
			">
			{{ color }}
		</button>
		<div
			class="theme-switcher__status"
			:style="{ left: activePosition + 'px' }"></div>
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
		z-index: 1;
	}

	&__status {
		position: absolute;
		top: 0px;
		background-color: red;
		border-radius: 15px;
		width: 80px;
		height: 100%;
	}
}
</style>
