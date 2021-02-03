<template>
  <v-app>
    <v-container>
      <div class="header"><h2>Drum Machine</h2></div>
      <v-row>
        <v-col
          v-if="orientation == 'landscape'"
          cols="8"
          align="center"
          justify="center"
        >
          <drums-instrument-container :columnCount="3" />
        </v-col>
        <v-col v-if="orientation == 'portrait'" align="center" justify="center">
          <drums-instrument-container :columnCount="3" />
        </v-col>
        <v-col
          cols="4"
          v-if="orientation == 'landscape'"
          align="center"
          justify="center"
        >
          <samples-instrument-container :columnCount="2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="orientation == 'portrait'" align="center" justify="center">
          <samples-instrument-container :columnCount="5" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import DrumsInstrumentContainer from "./components/Drums/InstrumentContainer.vue";
import SamplesInstrumentContainer from "./components/Samples/InstrumentContainer.vue";

export default {
  name: "App",
  components: {
    DrumsInstrumentContainer,
    SamplesInstrumentContainer,
  },
  computed: {
    orientation: function () {
      if (this.$vuetify.breakpoint.width >= this.$vuetify.breakpoint.height) {
        // The screen is in Landscape mode
        return "landscape";
      } else {
        // The screen is in Portrait mode
        return "portrait";
      }
    },
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
  margin-top: 10px;
}
#app p {
  margin: 0 !important;
}
</style>
