/* eslint-disable no-param-reassign */
import team from '../../api/team';

export default {
  namespaced: true,
  state: {
    currentUid: '',
    teams: [],
    activeTeam: {},
    isTeamAdmin: false,
    teamUsers: [],
  },
  mutations: {
    update(state, payload) {
      state[payload.key] = payload.value;
    },
    selectTeam(state, payload) {
      state.activeTeam = state.teams.find(({ id }) => payload === id);
      state.isTeamAdmin = state.activeTeam.isAdmin;
    },
    updateUser(state, payload) {
      const record = state.teamUsers.find(({ id }) => id === payload.id);
      Object.assign(record, payload, { isAdmin: payload.type === 'admin' });
    },
  },
  actions: {
    async inviteUser(context, payload) {
      await team.inviteUser(context.rootState.teamId, { email: payload, type: 'member' });
    },
    async updateUserRecord(context, payload) {
      if (!(payload.userId === context.state.currentUid || payload.user.id === context.state.activeTeam.ownerId)) {
        const { data } = await team.updateUserRecord(context.rootState.teamId, payload.id, {
          type: payload.type === 'admin' ? 'member' : 'admin',
        });
        context.commit('updateUser', data);
      }
    },
    async deleteUserRecord(context, payload) {
      if (!(payload.userId === context.state.currentUid || payload.user.id === context.state.activeTeam.ownerId)) {
        await team.deleteUserRecord(context.rootState.teamId, payload.id);
      }
    },
    async selectTeam(context, payload) {
      context.commit({
        type: 'update',
        key: 'currentUid',
        value: context.rootState.user.id,
      });
      context.commit('selectTeam', payload);
      context.commit({
        type: 'selectTeam',
        value: payload,
      }, { root: true });
    },
    async getTeamUsers(context) {
      const { data } = await team.getUsers(context.rootState.teamId);
      context.commit({
        type: 'update',
        key: 'teamUsers',
        value: data,
      });
    },
    async getTeams(context) {
      const { data } = await team.getTeams(context.rootState.teamId);
      context.commit({
        type: 'update',
        key: 'teams',
        value: data,
      });
    },
  },
  getters: {
    userId(state) {
      return state.currentUid;
    },
  },
};
