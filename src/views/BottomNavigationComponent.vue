<template>
  <v-bottom-navigation v-model="bottomNav" fixed>
    <v-btn @click="goTo('search')" value="search">
      <span>Search</span>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn @click="goTo('all-findings')" value="findings">
      <span>Findings</span>
      <v-icon>list</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "search"
    };
  },

  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    }
  }
};
</script>

<style>
</style>


