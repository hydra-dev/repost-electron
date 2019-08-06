<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        Please stand by
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from "../event-bus";
const { ipcRenderer } = require('electron')

export default {
  data(){
    return {
      dialog: false,
    }
  },

  methods: {
    startLoading(){
      this.dialog = true;
    },

    stopLoading(){
      this.dialog = false;
    }
  },

  mounted() {
    ipcRenderer.on('startLoading', (event, args) => {
      this.startLoading()
    })

    ipcRenderer.on('stopLoading', (event, args) => {
      this.stopLoading()
    })

    EventBus.$on("startLoading", () => {
      this.startLoading()
    });

    EventBus.$on("stopLoading", () => {
      this.stopLoading()
    });
  }
};
</script>

