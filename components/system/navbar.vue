<script setup></script>

<template>
	<nav class="navbar">
		<ul class="navbar__menu">
			<li class="navbar__item">
				<NuxtLink
					:to="'/'"
					class="navbar__link"
					><font-awesome-icon :icon="['fas', 'house']" /><span
						>Home</span
					></NuxtLink
				>
			</li>
			<li class="navbar__item">
				<a
					href="#"
					class="navbar__link"
					><font-awesome-icon :icon="['fas', 'book']" /><span
						>Messages</span
					></a
				>
			</li>
			<li class="navbar__item">
				<a
					href="#"
					class="navbar__link"
					><font-awesome-icon :icon="['fas', 'heart']" /><span
						>Customers</span
					></a
				>
			</li>
			<li class="navbar__item">
				<a
					href="#"
					class="navbar__link"
					><font-awesome-icon :icon="['fas', 'code']" /><span
						>Code</span
					></a
				>
			</li>
			<li class="navbar__item">
				<a
					href="#"
					class="navbar__link"
					><font-awesome-icon
						:icon="['fas', 'list-check']" /><span
						>Resources</span
					></a
				>
			</li>
			<li class="navbar__item">
				<a
					href="#"
					class="navbar__link"
					><font-awesome-icon
						:icon="['fas', 'address-card']" /><span
						>absolute</span
					></a
				>
			</li>
			<li class="navbar__item">
				<a
					href="#"
					class="navbar__link"
					><font-awesome-icon
						:icon="['fas', 'bookmark']" /><span
						>Bookmarks</span
					></a
				>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
$borderRadius: 10px;
$spacer: 1rem;
$primary: #406ff3;
$text: #6a778e;
$linkHeight: $spacer * 3.5;
$timing: 250ms;
$transition: $timing ease all;

@mixin gooeyEffect($i) {
	@keyframes gooeyEffect-#{$i} {
		0% {
			transform: scale(1, 1);
		}
		50% {
			transform: scale(0.5, 1.5);
		}
		100% {
			transform: scale(1, 1);
		}
	}
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');
body {
	background: #eaeef6;
	font-family: 'Open Sans', sans-serif;
}
.navbar {
	z-index: 50;
	$ref: &;
	position: fixed;
	top: $spacer;
	left: $spacer;
	background: #fff;
	border-radius: $borderRadius;
	padding: $spacer 0;
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	height: calc(100vh - #{$spacer * 2});
	&__link {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: $linkHeight;
		width: $spacer * 5.5;
		color: $text;
		transition: $transition;
		span {
			position: absolute;
			left: 100%;
			transform: translate(-($spacer * 3));
			margin-left: 1rem;
			opacity: 0;
			pointer-events: none;
			color: $primary;
			background: #fff;
			padding: $spacer * 0.75;
			transition: $transition;
			border-radius: $borderRadius * 1.75;
		}
		&:hover {
			color: #fff;
		}
		.navbar:not(:hover) &:focus,
		&:hover {
			span {
				opacity: 1;
				transform: translate(0);
			}
		}
	}
	&__menu {
		position: relative;
	}
	&__item {
		&:last-child {
			&:before {
				content: '';
				position: absolute;
				opacity: 0;
				z-index: -1;
				top: 0;
				left: $spacer;
				width: $linkHeight;
				height: $linkHeight;
				background: $primary;
				border-radius: $borderRadius * 1.75;
				transition: $timing cubic-bezier(1, 0.2, 0.1, 1.2) all;
			}
		}

		@for $i from 1 to 12 {
			&:first-child:nth-last-child(#{$i}),
			&:first-child:nth-last-child(#{$i}) ~ li {
				&:hover {
					~ li:last-child:before {
						opacity: 1;
					}
				}
				&:last-child:hover:before {
					opacity: 1;
				}
				@for $j from 1 to $i {
					&:nth-child(#{$j}):hover {
						~ li:last-child:before {
							@include gooeyEffect($j);
							top: (100% / $i) * ($j - 1);
							animation: gooeyEffect-#{$j} $timing 1;
						}
					}
				}
				&:last-child:hover:before {
					@include gooeyEffect($i);
					top: (100% / $i) * ($i - 1);
					animation: gooeyEffect-#{$i} $timing 1;
				}
			}
		}
	}
}
</style>
