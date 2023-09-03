<script setup>
const colorMode = useColorMode();

const activePosition = ref(90);
const activeWidth = ref(0);

const positionHandler = (color) => {
	switch (color) {
		case 'light':
			activePosition.value = 0;
			activeWidth.value = 75;
			break;
		case 'system':
			activePosition.value = 75;
			activeWidth.value = 80;
			break;
		case 'dark':
			activePosition.value = 152;
			activeWidth.value = 65;
			break;
		default:
			break;
	}
};
onMounted(() => {
	positionHandler(colorMode.preference);
});
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
			:style="{
				left: activePosition + 'px',
				width: activeWidth + 'px',
			}"></div>
	</section>
</template>

<style lang="scss" scoped>
.theme-switcher {
	position: relative;
	background: var(--bg);
	padding: 3px 12px;
	border: 1px solid black;
	border-radius: 15px;
	display: flex;
	justify-content: space-around;
	gap: 18px;

	:nth-child(3) {
		text-align: right;
	}

	&__button {
		width: 52px;
		text-align: center;
		z-index: 1;
	}

	&__status {
		position: absolute;
		top: 0px;

		right: 75px;
		background-color: var(--bg-image);
		border-radius: 15px;
		height: 100%;
		transition: all 0.5s ease;
	}
}
</style>
