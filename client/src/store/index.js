import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router/index';
import { defaultClient as apolloClient } from '@/main';
import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER, SIGNUP_USER } from '@/queries';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		posts: [],
		loading: false,
		error: null,
	},
	mutations: {
		setUser: (state, payload) => (state.user = payload),
		setPosts: (state, payload) => (state.posts = payload),
		setLoading: (state, payload) => (state.loading = payload),
		setError: (state, payload) => (state.error = payload),
		clearUser: (state) => (state.user = null),
		clearError: (state) => (state.error = null),
	},
	actions: {
		getCurrentUser: ({ commit }) => {
			commit('setLoading', true);

			apolloClient
				.query({
					query: GET_CURRENT_USER,
				})
				.then(({ data }) => {
					commit('setLoading', false);
					commit('setUser', data.getCurrentUser);
					console.log('data.getCurrentUser', data.getCurrentUser);
				})
				.catch((err) => {
					commit('setLoading', false);
					console.error(err);
				});
		},

		getPosts: ({ commit }) => {
			commit('setLoading', true);
			apolloClient
				.query({
					query: GET_POSTS,
				})
				.then(({ data }) => {
					commit('setPosts', data.getPosts);
					commit('setLoading', false);
				})
				.catch((err) => {
					commit('setLoading', false);
					console.error(err);
				});
		},

		signinUser: ({ commit }, payload) => {
			commit('clearError');
			commit('setLoading', true);
			localStorage.setItem('token', '');
			apolloClient
				.mutate({
					mutation: SIGNIN_USER,
					variables: payload,
				})
				.then(({ data }) => {
					commit('setLoading', false);
					localStorage.setItem('token', data.signinUser.token);
					router.go();
				})
				.catch((err) => {
					commit('setError', err);
					commit('setLoading', false);
					console.error(err.message);
				});
		},

		signupUser: ({ commit }, payload) => {
			commit('clearError');
			commit('setLoading', true);
			apolloClient
				.mutate({
					mutation: SIGNUP_USER,
					variables: payload,
				})
				.then(({ data }) => {
					commit('setLoading', false);
					localStorage.setItem('token', data.signupUser.token);
					// to make sure created method is run in main.js (we run getCurrentUser), reload the page
					router.go();
				})
				.catch((err) => {
					commit('setLoading', false);
					commit('setError', err);
					console.error(err);
				});
		},

		signoutUser: async ({ commit }) => {
			commit('clearUser');
			localStorage.setItem('token', '');
			// end session
			await apolloClient.resetStore();
			router.push('/');
		},
	},
	getters: {
		user: (state) => state.user,
		posts: (state) => state.posts,
		loading: (state) => state.loading,
		error: (state) => state.error,
	},
});
