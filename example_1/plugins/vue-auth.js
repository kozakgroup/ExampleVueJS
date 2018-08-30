import Vue from 'vue';
import VueAuth from '@websanova/vue-auth';
import http from '@websanova/vue-auth/drivers/http/axios.1.x';
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x';
import auth from './vue-auth/customDriver';
import store from '../store/index';
import config from '../../config/private';

Vue.use(VueAuth, {
  auth,
  http,
  router,
  loginData: {
    url: 'user/login',
    redirect: '/dashboard',
  },
  registerData: {
    url: 'user',
    autoLogin: true,
    redirect: '/dashboard',
  },
  fetchData: {
    url: 'user/{id}',
  },
  refreshData: {
    url: 'user/refresh',
    method: 'POST',
    enabled: true,
    interval: 30,
  },
  facebookOauth2Data: {
    url: 'https://www.facebook.com/v2.5/dialog/oauth',
    params: {
      redirect_uri() {
        return `${this.options.getUrl()}/oauth2/facebook`;
      },
      client_id: config.facebook.client_id,
      scope: 'email',
    },
  },
  googleOauth2Data: {
    url: 'https://accounts.google.com/o/oauth2/auth',
    params: {
      redirect_uri() {
        return `${this.options.getUrl()}/oauth2/google`;
      },
      client_id: config.google.client_id,
      scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
    },
  },
  loginPerform(data) {
    const success = data.success;
    Object.assign(data, this.options.loginData, {
      success: (res) => {
        Object.assign(data, { success });
        this.user({ id: res.data.accessToken.userId });
        this.options.loginProcess.call(this, res, data);
      },
    });

    return this.options.http._http.call(this, data);
  },
  fetchPerform(data) {
    const url = this.options.fetchData.url;
    const error = data.error;
    const success = data.success;
    Object.assign(data, this.options.fetchData, {
      url: url.replace('{id}', this.user().id),
      success: (res) => {
        Object.assign(data, { success });
        this.options.fetchProcess.call(this, res, data);
      },
      error: (res) => {
        this.watch.loaded = true;
        if (error) { error.call(this, res); }
      },
    });

    return this.options.http._http.call(this, data);
  },
  refreshPerform(data) {
    const success = data.success;
    Object.assign(data, this.options.refreshData, {
      data: {
        token: localStorage.getItem('default_refresh_token'),
      },
      success: (res) => {
        this.user({ id: res.data.accessToken.userId });
        Object.assign(data, { success });
        this.options.refreshProcess.call(this, res, data);
      },
      error: (res) => {
        this.options.logoutPerform.call(this, res, { redirect: this.options.authRedirect });
      },
    });

    return this.options.http._http.call(this, data);
  },
  parseUserData(data) {
    store.commit({
      type: 'user/login',
      data,
    });
    return data;
  },
});
