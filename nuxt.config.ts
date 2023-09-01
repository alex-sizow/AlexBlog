// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: [
		'@/assets/css/main.css',
		'@/assets/css/color.css',
		'@/assets/css/fonts.css',
		'@/assets/css/theme.css',
	],
	modules: ['@nuxt/content', '@nuxtjs/color-mode'],
	content: {
		highlight: {
			theme: 'light-plus',
		},
	},
	colorMode: {
		preference: 'system',
		fallback: 'light',
		hid: 'nuxt-color-mode-script',
		globalName: '__NUXT_COLOR_MODE__',
		componentName: 'ColorScheme',
		classPrefix: '',
		classSuffix: '-mode',
		storageKey: 'nuxt-color-mode',
	},
});
