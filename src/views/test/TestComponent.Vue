<template>
	<div class="test">
		<h1>This is the test page</h1>
		<p>Your ID is: {{$route.params.id}}</p>
	</div>
</template>
<script>
export default {
	head: {
		title: function () {
			return {
				inner: this.$route.params.id + "'s account",
				id: 'page-title'
			}

		}
	}
}
</script>

<style lang="scss" scoped>
	@import url(test.scss);
</style>
