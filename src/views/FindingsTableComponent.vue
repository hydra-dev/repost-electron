<template>
  <div>
    <h3>All findings</h3>
    <v-divider></v-divider>

    <v-data-table :loading="loading" :headers="headers" :items="findings" class="elevation-1">
      <template v-slot:body="{ items }">
        <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td class="text-xs">
          <span
            v-if="getNumberOfLanguages(item) === 1"
          >{{ item.name[getDefaultLanguage(item)] }}</span>
          <span
            v-if="getNumberOfLanguages(item) === 2"
          >{{ item.name.en }} / {{item.name.nl}}</span>
        </td>
        <td class="text-xs">{{Object.keys(item.name)}}</td>
        <td class="text-xs">
          <v-btn @click="editFinding(item)" fab dark small color="primary">
            <v-icon dark>edit</v-icon>
          </v-btn>
        </td>
        </tr>
      </template>
    </v-data-table>

    <v-fab-transition>
      <v-btn @click="goToCreate" bottom relative right fab dark small color="indigo">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  name: "FindingsTable",

  data() {
    return {
      findings: [],
      loading: true,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Languages", value: null },
        { text: "Actions", value: null }
      ]
    };
  },

  methods: {
    goToCreate() {
      this.$router.push("/finding/create");
    },

    getNumberOfLanguages(finding) {
      return Object.keys(finding.finding).length;
    },

    getDefaultLanguage(finding) {
      return Object.keys(finding.finding)[0];
    },

    editFinding(finding) {
      this.$router.push(`/finding/${finding.id}/edit`)
    }
  },

  mounted() {
    this.$http.get("/api/v1/finding").then(response => {
      this.findings = response.data.data;
      this.loading = false;
    });
  }
};
</script>

<style>
</style>


