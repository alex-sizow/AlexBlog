<template>
	<div>
		<Header />
		<div class="main"><slot /></div>
		<Footer />
	</div>
</template>

<style lang="scss" scoped>
.main {
	padding: 30px;
}
</style>
