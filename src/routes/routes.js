/* eslint-disable */
import HomeComponent from '../views/home/HomeComponent.vue';
import HelloComponent from '../views/hello/HelloComponent.vue';
import TestComponent from '../views/test/TestComponent.vue';
/* eslint-enable */

export default [
	{ path: '/', component: HomeComponent },
	{ path: '/hello', component: HelloComponent },
	{ path: '/test/:id', component: TestComponent }
];
