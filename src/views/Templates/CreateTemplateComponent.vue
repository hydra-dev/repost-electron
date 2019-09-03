<template>
  <div>
    <v-text-field
      v-model="name"
      :disabled="storingTemplate"
      :error-messages="nameErrors"
      :counter="50"
      label="Name your template"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-textarea
      :disabled="storingTemplate"
      outlined
      label="Provide your template syntax"
      v-model="syntax"
    ></v-textarea>

    <v-btn
      block
      :loading="storingTemplate"
      :disabled="$v.$invalid"
      color="secondary"
      @click="saveTemplate"
      dark
    >Save template</v-btn>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: null,
      storingTemplate: false,
      syntax:
        "@variables\n@endvariables\n\n@multilang\n@en\n@enden\n\n@nl\n@endnl\n@endmultilang\n\n@finding\n\n@endfinding\n\n@risk\n\n@endrisk\n\n@solution\n\n@endsolution"
    };
  },

  validations: {
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(50)
    }
  },

  methods: {
    saveTemplate() {
      this.storingTemplate = true;
    }
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 50 characters long");
      !this.$v.name.minLength &&
        errors.push("Name must be at least 2 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    }
  },

  mounted() {
    console.log(this.$route.params);
  }
};
</script>

<style>
</style>


