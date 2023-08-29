// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: [
		'@/assets/css/main.css',
		'@/assets/css/color.css',
		'@/assets/css/fonts.css',
	],
	modules: ['@nuxt/content'],
	content: {
		highlight: {
			theme: 'light-plus',
		},
	},
});
