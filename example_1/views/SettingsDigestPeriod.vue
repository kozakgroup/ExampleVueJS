<template>
  <div class="view-digest-period">
    <h1 class="title">{{ $t('digestPeriod.title') }}</h1>
    <p class="subtitle">{{ $t('digestPeriod.subtitle') }}</p>
    <router-link class="sample-digest" to="/">{{ $t('digestPeriod.sampleDigest') }}</router-link>
    <p class="label-digest-period">{{ $t('digestPeriod.label') }}</p>
    <b-field class="view-digest-period-content">
      <v-select class="select-digest"
                v-model="digest_at"
                :get-option-label="translateOptions"
                :options="periods">
      </v-select>
      <div class="action-button">
        <button class="button is-link" v-on:click="changePeriod">{{ $t('digestPeriod.save') }}</button>
      </div>
    </b-field>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import { mapModels } from '../store';

  const { mapActions } = createNamespacedHelpers('user');

  const periods = ['never', 'day', 'week', 'month'];

  export default {
    name: 'view-digest-period',
    data() {
      return {
        digest_at: {},
        periods: periods.map(value => ({ label: value, value })),
      };
    },
    computed: {
      ...mapModels(['userSettings'], 'user'),
    },
    methods: {
      async changePeriod() {
        await this.changeDigestPeriod(Object.assign({}, this.userSettings, { digest_at: this.digest_at.value }));
      },
      translateOptions({ value }) {
        return this.$i18n.t(`digestPeriod.${value}`);
      },
      ...mapActions(['changeDigestPeriod']),
    },
    mounted() {
      this.digest_at = {
        label: this.$i18n.t(`digestPeriod.${this.userSettings.digest_at}`),
        value: this.userSettings.digest_at,
      };
    },
  };
</script>

<style lang="scss">
  @import "../assets/scss/core";

  .view-digest-period {
    background: #fafaf9;
    padding: em(80) 5% em(120);

    .title {
      font-family: $heading-family;
      font-weight: 400;
    }

    .subtitle {
      font-size: em(20);
      padding-top: em(20);
      margin-bottom: em(20);
    }

    .sample-digest {
      font-family: $font-family1;
      font-size: em(20);
      color: $info-color;
    }

    .label-digest-period {
      font-size: em(17);
      font-family: $font-family3;
      margin: em(20, 17) 0 em(5, 17);
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .select-digest {
        background-color: $white;
        width: 250px;
        margin: 0 em(30) em(30) 0;
        font-family: $font-family4;

        .dropdown-toggle {
          display: flex;
          align-items: center;
          &:focus,
          &:hover {
            border-color: $info-color;
            transition: all .25s ease;
          }

          input {
            height: em(50);
          }

          .selected-tag {
            font-size: em(20);
            border: none;
            margin: 0 0 0 em(10, 20);
            position: absolute;
          }
        }

        .dropdown-menu {
          overflow-y: hidden;
          padding: 0;
          li {
            border-top: em(1) solid #e0e0db;
            a {
              font-size: em(20);
              padding: em(11, 20) 0 em(10, 20) em(15, 20);
              color: #474646;
              background: transparent;
              &:hover {
                background-color: #ecf4fb;
              }
            }
          }
        }

        .open-indicator {
          height: em(29);
          right: em(15);
          &::before {
            border-color: $info-color;
            border-width: em(4) em(4) 0 0;
            width: em(12);
            height: em(12);
          }
        }

        .clear {
          display: none;
        }
      }
    }

    .action-button {
      margin-bottom: em(30);
      button.is-link {
        font-size: em(22);
        padding: 0 em(33, 22);
        background-color: $brand-color1;
        font-family: $font-family1;
      }
    }
  }
</style>
