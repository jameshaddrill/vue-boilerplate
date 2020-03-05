<template>
	<div class="test">
		<h1>This is an example component</h1>
		<p>{{ text }}</p>
	</div>
</template>
<script>
export default {
	data: function() {
		return [{
			text: 'This text was passed in via data!'
		}]
	}
}
</script>

<style lang="scss" scoped>
	@import 'example.scss';
</style>
