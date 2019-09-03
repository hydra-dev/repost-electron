<template>
  <div>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="templates"
      :items-per-page="15"
      class="elevation-1"
    ></v-data-table>

    <v-divider></v-divider>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">What kind of template?</v-card-title>

        <v-list rounded>
          <v-list-item v-for="(item, i) in templateStyles" :key="i" @click="goToCreate(item)">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <!-- <v-btn @click="openInNewWindow">Test external window</v-btn> -->

    <v-btn class="mx-2" fab dark @click="promptTemplateDialog" color="indigo">
      <v-icon dark>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name", sortable: true },
        { text: "Actions", value: null }
      ],
      templates: [],
      loading: true,
      templateStyles: [
        { text: "Finding", icon: "assignment_late" },
        { text: "Proposal", icon: "assignment_ind" },
        { text: "Report", icon: "assignment" }
      ]
    };
  },

  methods: {
    goToCreate(style) {
      console.log(style);
      this.$router.push({ name: "create-template", params: {style: style.text }});
    },

    promptTemplateDialog() {
      this.dialog = true;
    },

    openInNewWindow(){
        ipcRenderer.send('newWindow', {args: 'test'})
    }
  },

  mounted() {
    this.$http.get("/api/v1/templates").then(response => {
      this.templates = response.data.data;
    });
  }
};
</script>

<style>
</style>


