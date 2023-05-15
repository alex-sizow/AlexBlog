// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/strapi'],
	strapi: {
		url: 'http://localhost:1337',
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData:
						'@use "@/assets/_global.scss" as *;',
				},
			},
		},
	},
	plugins: [{ src: '@/plugins/ky.js', mode: 'client' }],
	css: ['@fortawesome/fontawesome-svg-core/styles.css'],
});
