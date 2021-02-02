<template>
  <v-app>
    <v-container>
      <div class="header"><h2>Drum Machine</h2></div>
      <v-row>
        <v-col align="center" justify="center">
          <instrument-container :columnCount="3" />
        </v-col>
        <!-- <v-col>
          <instrument-container :columnCount="9" />
        </v-col> -->
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import InstrumentContainer from "./components/InstrumentContainer.vue";

export default {
  name: "App",
  components: {
    InstrumentContainer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
