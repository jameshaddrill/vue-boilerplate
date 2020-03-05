<template>
	<div class="test">
		<h1>This is the home page</h1>
		<example-component></example-component>
	</div>
</template>
<script>
	import ExampleComponent from '../../components/example/ExampleComponent.vue';
	export default {
		head: {
			title: {
				inner: 'Home Page',
				id: 'page-title'
			}
		},
		components: {
			'example-component': ExampleComponent
		}
	}
</script>

<style lang="scss" scoped>
</style>
