<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>REPO</span>
        <span class="font-weight-light">ST</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
      <GlobalSnackbarComponent />
    </v-content>
    <UpdateAvailableDialogComponent />
    <BottomNavigationComponent />
    <LoadingOverlayComponent />
  </v-app>
</template>

<script>
import LoadingOverlayComponent from "./views/LoadingOverlayComponent";
import BottomNavigationComponent from "./views/BottomNavigationComponent";
import GlobalSnackbarComponent from "./views/GlobalSnackbarComponent";
import UpdateAvailableDialogComponent from "./views/Dialogs/UpdateAvailableDialogComponent";
const { ipcRenderer } = require("electron");

export default {
  name: "App",
  components: {
    LoadingOverlayComponent,
    BottomNavigationComponent,
    GlobalSnackbarComponent,
    UpdateAvailableDialogComponent
  },
  data() {
    return {
      //
    };
  },

  mounted() {
    console.log(this.$store.state.auth);

    ipcRenderer.on("settings", (event, args) => {
      console.log("here");
      this.$router.push("/settings");
    });
  }
};
</script>
