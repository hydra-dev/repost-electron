<template>
  <v-toolbar dark color="teal">
    <v-toolbar-title>Search</v-toolbar-title>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items.sync="items"
      item-text="name"
      clearable
      :search-input.sync="search"
      return-object
      no-filter
      class="mx-3"
      flat
      hide-no-data
      hide-details
      label="What kind of finding are you looking?"
      solo-inverted
    >
      <template v-slot:item="{ item }">
        <v-list-tile-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >{{ item.name.charAt(0) }}</v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </v-autocomplete>
  </v-toolbar>
</template>

<script>
import { query } from "./../local-finding-index";

export default {
  data() {
    return {
      select: null,
      loading: false,
      items: [],
      search: null
    };
  },

  watch: {
    search(newSearch) {
      if (newSearch) {
        this.loading = true;
        const res = query(newSearch);
        this.items = res.map(x => {
          return {
            id: x.id,
            name: x.name
          };
        });
        this.loading = false;
      }
    },

    select(newSelected) {
      console.log(newSelected);
      this.$router.push(`/finding/${newSelected.id}`);
    }
  }
};
</script>

<style>
</style>


