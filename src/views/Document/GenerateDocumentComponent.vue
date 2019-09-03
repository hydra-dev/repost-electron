<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" step="1">Select template</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 2" step="2">Variable substitution</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Generate</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-select :items="templates" label="Select template"></v-select>

        <v-btn color="primary" @click="currentStep = 2">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-textarea outlined label="Text Variable 1"></v-textarea>

        <v-switch label="Boolean variable"></v-switch>

        <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-progress-circular :width="3" color="red" indeterminate></v-progress-circular>

        <v-btn color="primary" @click="currentStep = 1">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      templates: ["Template_0.1", "Template_0.2", "WebApp", "Specific Company"]
    };
  }
};
</script>

<style>
</style>


