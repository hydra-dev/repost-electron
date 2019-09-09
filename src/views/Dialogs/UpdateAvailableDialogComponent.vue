<template>
  <v-dialog v-model="dialog" v-if="dialog">
    <v-card>
      <v-card-title class="headline">New update available - {{update.latest}}</v-card-title>

      <v-card-text>
        {{update.changelog}}
        Sha-1: {{update.sha}}
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="ignoreUpdate">Ignore</v-btn>

        <v-btn color="green darken-1" text @click="installUpdate">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  data() {
    return {
      dialog: false,
      update: null
    };
  },

  methods: {
    ignoreUpdate() {
      this.dialog = false;
    },

    installUpdate() {
      ipcRenderer.send("downloadUpdate", this.update.download);
      this.dialog = false;
    }
  },

  mounted() {
    console.log("Here");
    ipcRenderer.on("updateAvailable", (event, args) => {
      this.update = args;
      this.dialog = true;
    });
  }
};
</script>

<style scoped>
</style>