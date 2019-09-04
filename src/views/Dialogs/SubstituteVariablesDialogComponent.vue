<template>
    <v-dialog
      v-model="dialog"
      persistent=""
    >
      <v-card>
        <v-card-title class="headline">Substitute variables</v-card-title>

        <v-text-field
            v-for="(variable, idx) in value"
            :key="idx"
            v-model="value[idx].substitutedValue"
            :label="variable.label"
        ></v-text-field>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="green darken-1"
            text
            @click="substitute"
          >
            Apply substitution
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: function() { return []; }
        },

        dialog: {
            type: Boolean,
            default: false,
        }
    },

    methods: {
        substitute(){
            this.$emit('hideDialog')
        }
    }
}
</script>

<style scoped>

</style>