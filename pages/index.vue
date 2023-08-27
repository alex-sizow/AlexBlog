<template>
	<div class="intro">
		<p class="intro__hi">Hi, my name name is</p>
		<h1 class="intro__name">Alex Sizou</h1>

		<div class="intro__photo">
			<img
				src="@/assets/images/I.jpg"
				alt="I" />
			<h2 class="intro__photo_description">
				I’m a frontend developer in love with the Web,
				browsers, ducks and France
			</h2>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

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
		margin-top: 20px;
		position: relative;
		img {
			width: 500px;
			border-radius: 30px;
		}

		&_description {
			position: absolute;
			font-size: 29px;
			width: 335px;
			bottom: 10px;
			right: 0;
		}
	}
}
</style>
