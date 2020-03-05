<template>
	<div class="hello">
		<h1>Hello world!</h1>
		<div v-for="(item, index) in data" class="hello__block" :class="'--' + item.class" :key="index">
			<h1>{{item.title}}</h1>
			<p>{{item.text}}</p>
		</div>
	</div>
</template>

<script>
import json from '../../data/data.json';

export default {
	head: {
		title: {
			inner: 'Hello Page',
			id: 'page-title'
		}
	},
	data() {
		return {
			data: json
		}
	}
}
</script>

<style lang="scss" scoped>
	@import 'hello.scss';
</style>
