<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-banner>
      <span v-html="dataInMarkdown"></span>

      <template v-slot:actions>
        <v-btn text @click="copyToClipboard" color="deep-purple accent-4">Copy</v-btn>
      </template>
    </v-banner>
  </v-card>
</template>

<script>
import showdown from "showdown";
import { EventBus } from './../event-bus';

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      dataInMarkdown: null
    };
  },

  watch: {
    body(newBody) {
      this.dataInMarkdown = this.convertToMarkdown(newBody);
    }
  },

  methods: {
    copyToClipboard() {
      this.$copyText(this.body).then(
        function(e) {
          EventBus.$emit("snackbar", {
            text: "Copied to clipboard"
          });
        },
        function(e) {
          EventBus.$emit("snackbar", {
            text: "Failed to copy to clipboard"
          });
        }
      );
    },

    convertToMarkdown(text) {
      const converter = new showdown.Converter();
      return converter.makeHtml(text);
    }
  }
};
</script>

<style scoped>
</style>