<template>
  <div class="view-throttling">
    <h1 class="title">{{ $t('throttling.title') }}</h1>
    <p class="subtitle">{{ $t('throttling.subtitle') }}</p>
    <p class="label-period">{{ $t('throttling.label') }}</p>
    <b-field class="view-throttling-content">
      <v-select class="select-throttling"
                v-model="throttling_at"
                :get-option-label="translateOptions"
                :options="throttlingPeriods">
      </v-select>
      <div class="action-button">
        <button class="button is-link" v-on:click="changePeriod">{{ $t('throttling.save') }}</button>
      </div>
    </b-field>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import { mapModels } from '../store';

  const { mapActions } = createNamespacedHelpers('user');

  const throttlingPeriods = ['oneMonths', 'threeMonths', 'sixMonths', 'oneYear'];

  export default {
    name: 'view-throttling',
    data() {
      return {
        throttling_at: '',
        throttlingPeriods: throttlingPeriods.map(value => ({ label: value, value })),
      };
    },
    computed: {
      ...mapModels(['userSettings'], 'user'),
    },
    methods: {
      async changePeriod() {
        await this.changeDigestPeriod(Object.assign({}, this.userSettings, { throttling_at: this.throttling_at }));
      },
      translateOptions({ value }) {
        return this.$i18n.t(`throttling.${value}`);
      },
      ...mapActions(['changeDigestPeriod']),
    },
    mounted() {
      this.throttling_at = {
        label: this.$i18n.t(`throttling.${this.userSettings.throttling_at}`),
        value: this.userSettings.throttling_at,
      };
    },
  };
</script>

<style lang="scss">
  @import "../assets/scss/core";
  .view-throttling {
    background: #fafaf9;
    padding: em(80) 5% em(120);
    margin: 0 em(-40);
    .title {
      font-family: $heading-family;
      font-weight: 400;
    }
    .subtitle {
      font-size: em(20);
      padding-top: em(20);
      margin-bottom: em(20);
    }
    .label-period {
      font-size: em(17);
      font-family: $font-family3;
      margin-bottom: em(5, 17);
    }
    &-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .select-throttling {
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
