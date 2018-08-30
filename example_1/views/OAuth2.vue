<template>
  <i class="fa fa-spinner fa-pulse"></i>
</template>

<script>
  export default {
    name: 'view-oauth2',
    beforeRouteEnter(to, from, next) {
      next(async (vm) => {
        const { rememberMe } = JSON.parse(to.query.state);
        const provider = to.params.provider;
        const code = to.query.code;
        const route = await vm.$store.dispatch({
          type: 'user/oauth2',
          provider,
          code,
          rememberMe,
        });
        next(route);
      });
    },
  };
</script>
