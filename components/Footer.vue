<template>
	<footer class="footer">
		<div class="footer__section">
			<h3 class="footer__title">Links</h3>
			<ul class="footer__list">
				<a
					href="https://twitter.com/AlexSizow"
					target="_blank"
					>Twitter</a
				>
				<a
					href="https://twitter.com/AlexSizow"
					target="_blank"
					>Mastodon</a
				>
				<a
					href="https://t.me/Sizifalex"
					target="_blank"
					>Telegram</a
				>
				<a
					href="https://www.linkedin.com/in/alex-sizow/"
					target="_blank"
					>LinkedIn</a
				>
			</ul>
		</div>
		<div class="footer__section">
			<h3 class="footer__title">Email</h3>
			<ul class="footer__list">
				<a href="mailto:alex_sizow@outlook.com"
					>alex_sizow@outlook.com</a
				>
			</ul>
		</div>
		<div class="footer__section">
			<h3 class="footer__title">Credits</h3>
			<ul class="footer__list">
				<a
					href="https://github.com/alex-sizow"
					target="_blank"
					>Github</a
				>
				<li>
					Designed by
					<div>Andrey</div>
				</li>
			</ul>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	border-top: 2px solid var(--color-text);
	padding: 55px 30px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
	&__section {
	}

	&__title {
		font-size: 30px;
	}

	&__list {
		margin-top: 11px;
		display: flex;
		flex-direction: column;
		gap: 11px;
	}
}

@media screen and (max-width: 390px) {
	.footer {
		justify-content: center;
		&__title {
			text-align: center;
			font-size: 30px;
		}
		&__list {
			text-align: center;
		}
	}
}
</style>
