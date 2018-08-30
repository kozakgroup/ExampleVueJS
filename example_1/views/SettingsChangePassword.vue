<template>
  <div class="view-change-password">
      <h1 class="title">{{ $t('switchPassword.title') }}</h1>
      <form>
        <p class="label-change-password">{{ $t('switchPassword.oldPassword') }}</p>
        <b-field class="password-wrapper">
          <div class="input-wrapper">
            <b-input placeholder="........"
                     type="password"
                     v-model="oldPassword">

            </b-input>
          </div>
        </b-field>
        <p class="label-change-password">{{ $t('switchPassword.newPassword') }}</p>
        <b-field class="password-wrapper">
          <div class="input-wrapper">
            <b-input placeholder="........"
                     type="password"
                     v-model="newPassword"
                     v-on:focus="passWasFocused = true"
                     password-reveal>
            </b-input>
          </div>
          <span v-if="showLengthError">{{ $t('switchPassword.lengthPass', { length: minPasswordLength }) }}
          </span>
        </b-field>
        <p class="label-change-password">{{ $t('switchPassword.confirmPassword') }}</p>
        <b-field class="password-wrapper">
          <div class="input-wrapper">
            <b-input placeholder="........"
                     type="password"
                     v-model="confirmPassword"
                     v-on:focus="confirmationWasFocused = true"
                     password-reveal>
            </b-input>
          </div>
          <span v-if="notMatch">{{ $t('switchPassword.confirmationError') }}</span>
        </b-field>
        <div class="action-button">
          <button class="button is-link" :disabled=disabled
                  v-on:click="switchPassword({oldPassword, newPassword})">
                  {{ $t('switchPassword.buttonSubmit') }}
          </button>
        </div>
      </form>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';

  const { mapActions } = createNamespacedHelpers('user');

  export default {
    name: 'view-oauth2',
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        confirmationWasFocused: false,
        passWasFocused: false,
        minPasswordLength: 8,
      };
    },
    computed: {
      disabled() {
        return this.notMatch || !this.oldPassword || !this.newPassword || !this.confirmPassword;
      },
      notMatch() {
        return this.confirmationWasFocused && this.newPassword !== this.confirmPassword;
      },
      showLengthError() {
        return this.newPassword.length < this.minPasswordLength && this.passWasFocused;
      },
    },
    methods: {
      ...mapActions(['switchPassword']),
    },
  };
</script>

<style lang="scss">
  @import "../assets/scss/core";

  .view-change-password {
    background: #fafaf9;
    padding: em(80) 5% em(120);
    .title {
      font-family: $heading-family;
      font-weight: 400;
    }
    .label-change-password {
      font-size: em(17);
      font-family: $font-family3;
      margin: em(20, 17) 0 em(5, 17);
    }
    .password-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 0;
      .input-wrapper {
        margin-right: em(20);
        width: 400px;
        margin-bottom: em(10);
        input {
          padding: em(25) em(10);
          box-shadow: none;
          border-color: #bdbdb7;
          max-width: 400px;
          &::placeholder {
            color: #8f8f8f;
          }
        }
        .control {
          .icon {
            right: 1%;
            top: 15%;
          }
          .fa {
            color: $brand-color4;
            opacity: .3;
          }
        }
      }
      span {
        color: $brand-color4;
        margin-bottom: em(10);
      }
    }
    .action-button {
      margin-top: em(20);
      .button {
        font-family: $font-family1;
        &.is-link {
          font-size: em(20);
          background-color: $brand-color1;
          padding: 0 em(33, 20);
          margin: em(10, 20) 0;
        }
      }
    }
  }

</style>
