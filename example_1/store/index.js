/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import nest from './modules/nest';
import user from './modules/user';
import flock from './modules/flock';
import team from './modules/team';

Vue.use(Vuex);

export const mapModels = (keys, namespace) => {
  const computed = {};
  keys.forEach((key) => {
    computed[key] = {
      get() {
        if (namespace) {
          return this.$store.state[namespace][key];
        }
        return this.$store.state[key];
      },
      set(value) {
        this.$store.commit({
          type: namespace ? `${namespace}/update` : 'update',
          key,
          value,
        });
      },
    };
  });
  return computed;
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    error: '',
    success: '',
    teamId: localStorage.getItem('teamId'),
  },
  mutations: {
    error(state, { message } = { message: 'Something Went Wrong!' }) {
      state.error = message;
    },
    success(state, { message } = { message: 'Success' }) {
      state.success = message;
    },
    clearMessage(state, payload) {
      state[payload] = null;
    },
    selectTeam(state, payload) {
      state.teamId = payload.value;
      localStorage.setItem('teamId', payload.value);
    },
    clear(state) {
      state.error = null;
      state.success = null;
      state.teamId = null;
      localStorage.removeItem('teamId');
    },
  },
  actions: {
    async checkTeam(context) {
      const { teamId } = context.state;
      if (teamId) {
        await this.dispatch('team/getTeams');
        await this.dispatch('team/selectTeam', teamId);
      }
    },
  },
  modules: {
    nest,
    user,
    flock,
    team,
  },
});
