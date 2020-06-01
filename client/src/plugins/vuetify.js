import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'fa',
		values: {
			search: 'fas fa-search',
			chat: 'fas fa-comment-alt',
			lock_open: 'fas fa-lock-open',
			create: 'fas fa-pen',
			user: 'fas fa-user',
			lock: 'fas fa-lock',
			star: 'fas fa-star',
			profile: 'fas fa-id-card',
			signOut: 'fas fa-sign-out-alt',
		},
	},

	theme: {
		themes: {
			light: {
				primary: '#009688',
				secondary: '#00bcd4',
				accent: '#ff5722',
				error: '#f44336',
				warning: '#ffc107',
				info: '#03a9f4',
				success: '#8bc34a',
			},
		},
	},
});
