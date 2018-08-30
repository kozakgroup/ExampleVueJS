<template>
  <div class="view-register">
    <h1>{{ $t('register.title') }}</h1>
    <i18n path="register.subtitle" tag="p" class="subtitle">
      <router-link to="login">{{ $t('register.login') }}</router-link>
    </i18n>
    <form v-on:submit.prevent="register()">
      <b-field :label="$t('login.label_email')">
        <b-input placeholder="someone@email.com"
                 v-model="username"></b-input>
      </b-field>
      <b-field :label="$t('register.choose_pass')">
        <b-input type="password"
                 placeholder="·····"
                 v-model="password"
                 password-reveal></b-input>
      </b-field>
      <b-field class="additional-property">
        <b-checkbox v-model="rememberMe">{{ $t('login.remember') }}</b-checkbox>
      </b-field>
      <div class="auth-form-actions">
        <p class="control">
          <button class="button is-primary">{{ $t('register.button')}}</button>
        </p>
        <div class="social-buttons">
          <span>{{ $t('login.social_buttons')}}</span>
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-google"></i></a>
        </div>
      </div>
      <div class="privacy-policy">
        <i18n path="register.privacy_policy" tag="p">
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
    name: 'view-register',
    computed: {
      ...mapModels(['username', 'password', 'rememberMe'], 'user'),
    },
    methods: {
      ...mapActions(['register']),
    },
  };
</script>

<style lang="scss">

</style>
