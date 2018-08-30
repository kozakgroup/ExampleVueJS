<template>
  <div class="view-invintation">
      <h1 class="title">{{ $t('invintation.title') }}</h1>
      <p class="subtitle">{{ $t('invintation.subtitle') }}</p>
    <div class="actions">
      <button class="button is-primary" v-on:click="accept()">{{ $t('invintation.accept') }}</button>
      <button class="button is-danger" v-on:click="decline()">{{ $t('invintation.decline') }}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'view-oauth2',
    methods: {
      /* eslint camelcase: "off" */
      async accept() {
        const { invite_id } = this.$route.params;
        if (!this.$auth.check()) {
          localStorage.setItem('invite_id', invite_id);
          this.$router.push({ name: 'login' });
        } else {
          try {
            const { data } = await this.$http.post(`https://localhost:3000/api/team/${invite_id}/accept`, {});
            localStorage.setItem('teamId', data.teamId);
          } finally {
            localStorage.removeItem('invite_id');
            this.$router.push({ name: 'dashboard' });
          }
        }
      },
      decline() {
        localStorage.removeItem('invite_id');
        this.$router.push({ name: 'dashboard' });
      },
    },
  };
</script>

<style lang="scss">
@import "../assets/scss/core";
@import "../assets/scss/auth";
.view-invintation {
  background-color: $background-color1;
  padding: em(80) em(20) em(180);
  margin: 0 em(-40);
  text-align: center;
  .title {
    font-weight: 400;
    color: $secondary-color;
  }
  .subtitle {
    font-size: em(20);
    padding-top: em(15, 20);
  }
}
.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: em(500);
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $white;
    font-family: $font-family1;
    font-size: em(20);
    transition: background-color .25s ease;
    width: em(200, 20);
    margin: em(10, 20);
    &.is-primary {
      background-color: $brand-color1;
      &:hover {
        background-color: darken($brand-color1, 10%);
      }
    }
  }
}
</style>
