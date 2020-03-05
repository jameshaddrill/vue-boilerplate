import Vue from 'vue';
import VueRouter from 'vue-router';
import VueHead from 'vue-head';
import App from './views/App.vue';
import routeData from './routes/routes';

Vue.use(VueRouter);

Vue.use(VueHead, {
	separator: '|',
	complement: 'My Complement'
});

const routes = routeData;

const router = new VueRouter({
	// mode: 'history' is needed for prerendering to work
	// don't remove if you want to successfully pre-render!
	mode: 'history',
	routes
});

window.onload = function loaded() {
	/* eslint-disable-next-line no-new */
	new Vue({
		router,
		el: '#app',
		render: h => h(App),
		mounted() {
			// You'll need this to use renderAfterDocumentEvent when prerendering the site
			document.dispatchEvent(new Event('render-event'));
		}
	});
};
