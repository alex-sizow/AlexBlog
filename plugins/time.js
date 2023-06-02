const createDate = (time, lang) => {
	const date = new Date(time);
	const options = {
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		year: 'numeric',
	};
	const formatter = new Intl.DateTimeFormat(lang, options);
	return formatter.format(date);
};

export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: {
			time: (str, lang) => createDate(str, lang),
		},
	};
});
