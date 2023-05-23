// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	modules: ['@nuxtjs/strapi', '@nuxt/content'],

	strapi: {
		url: process.env.API_BASE_URL,
		prefix: '/api',
	},
	content: {
		documentDriven: true,
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
	css: ['@fortawesome/fontawesome-svg-core/styles.css'],
	runtimeConfig: {
		public: {
			baseApi: process.env.API_BASE_URL,
		},
	},
});
