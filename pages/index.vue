<script setup lang="ts"></script>

<template>
	<div class="main">
		<div class="main__item">xcv</div>
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
		padding: 10px;
		background: rgba(255, 255, 255, 0);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 12px;
		box-shadow: 5px 5px 10px 0 rgba(88, 96, 217, 0.37);
	}
	&__item:hover {
		transition: 0.25s;
		scale: 1.01;
	}
}
</style>
