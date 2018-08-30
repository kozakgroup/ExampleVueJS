<template>
    <tr>
      <td>
        {{record.user.email}}
      </td>
      <td>
        <input v-on:change="updateUserRecord(record)"
               :disabled="disabledRecord"
               v-bind:checked="record.isAdmin"
               type="checkbox"/>
      </td>
      <td>
        <button v-on:click="deleteUserRecord(record)" :disabled="disabledRecord">Remove</button>
      </td>
    </tr>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { mapModels } from '../store';

const { mapActions, mapGetters } = createNamespacedHelpers('team');

export default {
  name: 'team-user-table-item',
  props: {
    record: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapModels(['activeTeam'], 'team'),
    ...mapGetters(['userId']),
    disabledRecord() {
      return this.record.userId === this.userId || this.record.user.id === this.activeTeam.ownerId;
    },
  },
  methods: {
    ...mapActions(['updateUserRecord', 'deleteUserRecord']),
  },
};
</script>
