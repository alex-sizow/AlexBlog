<script setup lang="ts">
const route = useRoute().params;
const { findOne } = useStrapi();
const { $marked, $time } = useNuxtApp();

const response: any = await findOne('posts', route.id[0]);
const post = response.data.attributes.text;
</script>

<template>
	<div class="post">
		<img
			class="post__image"
			src="@/assets/image/wolf.webp"
			alt="" />
		<h1 class="post__title">{{ post.title }}</h1>
		<div class="post__info">
			<div>
				{{
					$time(response.data.attributes.createdAt, 'ru-RU')
				}}
			</div>
			<div>#tag</div>
		</div>

		<div
			class="post__body"
			v-html="$marked(post)"></div>
	</div>
</template>

<style lang="scss">
.post {
	max-width: 830px;
	background: linear-gradient(145deg, #ffffff, #ececec);
	box-shadow: 2px 2px 6px 0 rgba(88, 96, 217, 0.37);

	border-radius: 10px;
	padding: 0px 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 19px;
	gap: 16px;

	&__image {
		border-radius: 20px 0 0 20px;
	}

	&__info {
		max-width: 450px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		div {
			background-color: rgb(82, 82, 216);
			padding: 8px 12px;
			color: #ececec;
			border-radius: 10px;
		}
	}

	&__title {
		font-size: 27px;
		font-weight: 600;
		line-height: 30px;
	}

	&__body {
		max-width: 450px;
		width: 100%;
		h2 {
			font-size: 26px;
		}
		h4 {
			font-size: 20px;
		}
		ul {
			padding: 0;
			list-style: none;
			counter-reset: li;
			li {
				position: relative;
				padding: 12px 20px 20px 28px;
				margin-left: 40px;
				transition-duration: 0.3s;
			}
			li:before {
				border: 6px solid transparent;
				line-height: 30px;
				position: absolute;
				top: 0;
				left: -30px;
				width: 42px;
				text-align: center;
				font-size: 13px;
				font-weight: bold;
				color: #adcee9;
				counter-increment: li;
				content: counter(li);
				transition-duration: 0.3s;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
			}
			li:hover:before {
				color: #337ab7;
			}
			li:after {
				position: absolute;
				top: 0;
				left: -30px;
				width: 42px;
				height: 42px;
				border: 6px solid #dddddd;
				border-radius: 50%;
				content: '';
				opacity: 0.5;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
			}
			li:hover:after {
				animation: 500ms ease-in-out 0s bounceIn;
				opacity: 1;
				border: 6px solid #adcee9;
			}
		}

		@keyframes bounceIn {
			0% {
				opacity: 0;
				transform: scale3d(0.3, 0.3, 0.3);
			}
			20% {
				transform: scale3d(1.3, 1.3, 1.3);
			}
			40% {
				transform: scale3d(0.9, 0.9, 0.9);
			}
			60% {
				opacity: 1;
				transform: scale3d(1.03, 1.03, 1.03);
			}
			80% {
				transform: scale3d(0.97, 0.97, 0.97);
			}
			to {
				opacity: 1;
				transform: scale3d(1, 1, 1);
			}
		}
	}
}
</style>
