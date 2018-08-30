<template>
  <div>
    <fieldset :disabled=!isTeamAdmin>
      <h1>Users</h1>
      <table>
        <thead>
        <tr>
          <th>User</th>
          <th>Admin</th>
          <th>Remove</th>
        </tr>
        </thead>
        <tbody>
          <team-user-table-item v-for="record in list" :record="record" :key="record.id"/>
        </tbody>
      </table>
    </fieldset>
    <paginator :collection="teamUsers" :itemsPerPage="2" :page.sync="list"/>
  </div>
</template>

<script>
  import TeamUserTableItem from './TeamUserTableItem';
  import Paginator from './Paginator';
  import { mapModels } from '../store';

  export default {
    name: 'team-user-table',
    data() {
      return {
        list: [],
      };
    },
    components: {
      TeamUserTableItem,
      Paginator,
    },
    computed: {
      ...mapModels(['isTeamAdmin', 'teamUsers'], 'team'),
    },
    async mounted() {
      await this.$store.dispatch('team/getTeamUsers');
    },
  };
</script>
