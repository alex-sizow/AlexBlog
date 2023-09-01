<script setup></script>

<template>
	<div>
		<Header />
		<div class="main"><slot /></div>
		<Footer />
	</div>
</template>

<style lang="scss">
.main {
	padding: 30px;
}
</style>
