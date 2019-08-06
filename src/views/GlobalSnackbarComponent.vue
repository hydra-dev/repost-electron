<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
    <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { EventBus } from "./../event-bus";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      snackbar: false,
      timeout: 2500,
      text: ""
    };
  },

  mounted() {
    EventBus.$on("snackbar", data => {
        this.text = data.text;
        this.snackbar = true;
    });
  }
};
</script>

<style>
</style>

