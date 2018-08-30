<template>
  <div class="view-reset">
    <h1>{{ $t('reset.title') }}</h1>
    <i18n path="reset.subtitle" tag="p" class="subtitle">
      <router-link to="login">{{ $t('reset.login') }}</router-link>
    </i18n>
    <form v-if="$route.params.token" v-on:submit.prevent="change()">
      <b-field class="reset-password" :label="$t('reset.label_password')">
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
          <button class="button is-primary">{{ $t('reset.button_change')}}</button>
        </p>
      </div>
    </form>
    <form v-else v-on:submit.prevent="reset()">
      <b-field class="reset-password" :label="$t('login.label_email')">
        <b-input placeholder="someone@email.com"
                 v-model="email"></b-input>
      </b-field>
      <div class="auth-form-actions">
        <p class="control">
          <button class="button is-primary">{{ $t('reset.button')}}</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import { mapModels } from '../store';

  const { mapActions } = createNamespacedHelpers('user');

  export default {
    name: 'view-reset',
    computed: {
      ...mapModels(['email', 'password', 'rememberMe'], 'user'),
    },
    methods: {
      async change() {
        await this.changePassword(this.$route.params.token);
        this.$router.replace({ path: '/dashboard' });
      },
      ...mapActions(['reset', 'changePassword']),
    },
    created() {
      if (this.$auth.check()) {
        this.$router.replace({ path: '/dashboard' });
      }
    },
  };
</script>
