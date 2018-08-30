<template>
  <div class="view-login">
    <h1>{{ $t('login.title') }}</h1>
    <i18n path="login.subtitle" tag="p" class="subtitle">
      <router-link to="register">{{ $t('login.register') }}</router-link>
    </i18n>
    <form v-on:submit.prevent="login()">
      <b-field :label="$t('login.label_email')">
        <b-input placeholder="someone@email.com"
                 v-model="email"></b-input>
      </b-field>
      <b-field :label="$t('login.label_pass')">
        <b-input type="password"
                 placeholder="·····"
                 v-model="password"
                 password-reveal></b-input>
      </b-field>
      <b-field class="additional-property">
        <b-checkbox v-model="rememberMe">{{ $t('login.remember') }}</b-checkbox>
        <router-link to="reset" class="pull-right forgot-password">{{ $t('login.forgot_password')}}</router-link>
      </b-field>
      <div class="auth-form-actions">
        <p class="control">
          <button class="button is-primary">{{ $t('login.button')}}</button>
        </p>
        <div class="social-buttons">
          <span>{{ $t('login.social_buttons')}}</span>
          <a v-on:click="oauth('facebook')"><i class="fa fa-facebook"></i></a>
          <a v-on:click="oauth('google')"><i class="fa fa-google"></i></a>
        </div>
      </div>
      <div class="privacy-policy">
        <i18n path="login.privacy_policy" tag="p">
          <router-link to="tos">{{ $t('auth.tos') }}</router-link>
          <router-link to="privacy_policy">{{ $t('auth.privacy_policy') }}</router-link>
        </i18n>
      </div>
    </form>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import { mapModels } from '../store';

  const { mapActions } = createNamespacedHelpers('user');

  export default {
    name: 'view-login',
    computed: {
      ...mapModels(['email', 'password', 'rememberMe'], 'user'),
    },
    methods: {
      oauth(provider) {
        this.$auth.oauth2({ provider, rememberMe: this.rememberMe });
      },
      ...mapActions(['login']),
    },
  };
</script>

<style lang="scss">

</style>
