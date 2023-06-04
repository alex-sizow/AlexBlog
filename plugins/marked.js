import { marked } from 'marked';

marked.use({
	pedantic: false,
	gfm: true,
	breaks: false,
	sanitize: false,
	smartypants: false,
	xhtml: false,
});

export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: {
			marked: (str) => marked.parse(str),
		},
	};
});
