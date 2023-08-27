<template>
	<footer class="footer">
		<div class="footer__section">
			<h3 class="footer__title">Links</h3>
			<ul class="footer__list">
				<li>Twitter</li>
				<li>Mastodon</li>
				<li>Telegram</li>
				<li>LinkedIn</li>
			</ul>
		</div>
		<div class="footer__section">
			<h3 class="footer__title">Email</h3>
			<ul class="footer__list">
				<li>alex_sizow@outlook.com</li>
			</ul>
		</div>
		<div class="footer__section">
			<h3 class="footer__title">Credits</h3>
			<ul class="footer__list">
				<li>Github</li>
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
	border-top: 2px solid black;
	padding: 55px 30px;
	display: flex;
	justify-content: space-between;
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
</style>
