// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	experimental: {
		viewTransition: true,
	},

	css: [
		'@/assets/css/main.css',
		'@/assets/css/color.css',
		'@/assets/css/fonts.css',
		'@/assets/css/theme.css',
		'@/assets/css/content.scss',
	],
	modules: ['@nuxt/content', '@nuxtjs/color-mode'],
	content: {
		highlight: {
			theme: 'light-plus',
		},
	},
});
