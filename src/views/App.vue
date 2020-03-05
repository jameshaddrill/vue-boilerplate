<template>
	<div>
		<router-link to="/">Go to Home</router-link>
		<router-link to="/hello">Go to Hello</router-link>
		<router-link to="/test/123">Go to Test</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
	@import '../styles/main.scss';
</style>
