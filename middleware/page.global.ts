export default defineNuxtRouteMiddleware((to, from) => {
	const getDepth = (path: any) => {
		return path
			.split('/')
			.filter((seg: any) => seg.length > 0).length;
	};

	const toDepth = getDepth(to.path);
	const fromDepth = getDepth(from.path);

	if (toDepth > fromDepth) {
		to.meta.pageTransition = { name: 'page-left' };
		from.meta.pageTransition = { name: 'page-left' };
	} else {
		to.meta.pageTransition = { name: 'page-right' };
		from.meta.pageTransition = { name: 'page-right' };
	}
});
