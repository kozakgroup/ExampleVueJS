/* eslint-disable no-param-reassign */
import user from '../../api/user';

export default {
  namespaced: true,
  state: {
    id: '',
    email: '',
    password: '',
    rememberMe: true,
    userSettings: {},
  },
  mutations: {
    update(state, payload) {
      state[payload.key] = payload.value;
    },
    login(state, payload) {
      state.id = payload.data.id;
      state.username = payload.data.name;
      state.email = payload.data.email;
      state.userSettings = payload.data.userSettings;
    },
    clear(state) {
      state.id = '';
      state.username = '';
      state.password = '';
    },
  },
  actions: {
    async login(context) {
      await user.login({
        data: context.getters.loginBody,
        rememberMe: context.state.rememberMe,
        success({ data }) {
          const refreshToken = data.refreshToken;
          this.$auth.user({ id: data.userId });
          localStorage.setItem('default_refresh_token', refreshToken.id);
          if (localStorage.getItem('invite_id')) {
            this.$router.back();
          }
        },
      });
    },
    async register(context) {
      await user.create({
        data: context.getters.registerBody,
        rememberMe: context.state.rememberMe,
      });
      localStorage.removeItem('invite_id');
    },
    async reset(context) {
      const email = context.state.email;
      await user.reset({ email });
      context.commit({
        type: 'success',
        message: 'Password reset request was send, please check your email for future instructions',
      }, { root: true });
    },
    async changePassword(context, payload) {
      const password = context.state.password;
      const { data } = await user.changePassword({ password, token: payload });
      localStorage.setItem('default_refresh_token', data.refreshToken.id);
      user.rememberMe(context.state.rememberMe);
      await user.refresh();
      await user.fetch({});
    },
    async oauth2(context, payload) {
      const inviteId = localStorage.getItem('invite_id');
      const { provider, code, rememberMe } = payload;
      const { data } = await user.oauth2({
        provider,
        code,
        rememberMe,
        inviteId,
      });
      const { refreshToken, accessToken, userId, isNew } = data;
      localStorage.setItem('default_refresh_token', refreshToken.id);
      localStorage.removeItem('invite_id');
      user.rememberMe(rememberMe);
      await user.fetch({
        id: userId,
        token: accessToken.id,
      });
      return !isNew && inviteId ? { path: `/invintation/${inviteId}` } : { path: '/dashboard' };
    },
    logout(context) {
      localStorage.removeItem('default_refresh_token');
      context.commit('clear');
      context.commit('clear', {}, { root: true });
      user.logout();
    },
    async switchPassword(context, payload) {
      const { data } = await user.switchPassword(payload);
      localStorage.setItem('default_refresh_token', data.refreshToken.id);
      user.rememberMe(context.state.rememberMe);
      await user.refresh();
      await user.fetch({});
    },
    async changeDigestPeriod(context, payload) {
      const { data } = await user.updateSettings(payload.userId, payload);
      context.commit({
        type: 'update',
        key: 'userSettings',
        value: data,
      });
    },
  },
  getters: {
    loginBody(state) {
      return {
        email: state.email,
        password: state.password,
      };
    },
    registerBody(state) {
      return {
        name: state.username,
        password: state.password,
        email: state.username,
        inviteId: localStorage.getItem('invite_id'),
      };
    },
  },
};
