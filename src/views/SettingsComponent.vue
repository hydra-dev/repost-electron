<template>
  <div>
    <h2>Settings</h2>

    <v-text-field
      v-model="settings.api_url"
      :error-messages="apiUrlErrors"
      :counter="150"
      label="API Url"
      required
      @input="$v.settings.api_url.$touch()"
      @blur="$v.settings.api_url.$touch()"
    ></v-text-field>

    <v-btn block @click="saveSettings">Save settings</v-btn>
  </div>
</template>

<script>
import { required, url, maxLength } from "vuelidate/lib/validators";
import { EventBus } from "./../event-bus"

export default {
  data() {
    return {
      settings: {
        api_url: null
      }
    };
  },

  validations: {
    settings: {
      api_url: {
        required,
        url,
        maxLength: maxLength(150)
      }
    }
  },

  methods: {
    saveSettings() {
      this.$store.commit("updateSettings", this.settings);
      EventBus.$emit('snackbar', {
          text: 'Settings have been stored'
      })
    }
  },

  computed: {
    apiUrlErrors() {
      const errors = [];
      if (!this.$v.settings.api_url.$dirty) return errors;
      !this.$v.settings.api_url.required && errors.push("API Url is required.");
      !this.$v.settings.api_url.url && errors.push("Must be URL.");
      return errors;
    }
  },

  mounted() {
    this.settings = this.$store.state.settings;
    console.log(this.settings);
  }
};
</script>

<style>
</style>


