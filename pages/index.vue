<script setup lang="ts"></script>

<template>
	<div class="main">
		<div class="main__item">
			<img
				class="main__item_img"
				src="@/assets/image/wolf.webp"
				alt="" />
			<div class="main__item_title">title</div>
		</div>
		<div class="main__item">xcv</div>
		<div class="main__item">xcv</div>
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
		min-height: 250px;
		width: 100%;

		background: linear-gradient(145deg, #ffffff, #dfdede);

		border-radius: 12px;
		box-shadow: 2px 2px 6px 0 rgba(88, 96, 217, 0.37);
		&_img {
			border-radius: 12px;
			width: 100%;
			object-fit: cover;
			object-position: 0px -25px;
			height: 58%;
		}
	}
	&__item:hover {
		transition: 0.25s;
		scale: 1.01;
		&_img {
			height: 68%;
		}
		&_title {
			color: red;
		}
	}
}
</style>
