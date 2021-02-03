<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col> </v-col>
        <v-col>
          <div class="header"><h2>Drum Machine</h2></div>
        </v-col>
        <v-col>
          <v-btn
            class="darkModeButton"
            v-if="$vuetify.theme.dark == true"
            @click="$vuetify.theme.dark = false"
            fab
          >
            <v-icon> mdi-weather-night </v-icon>
          </v-btn>
          <v-btn
            class="darkModeButton"
            v-if="$vuetify.theme.dark == false"
            @click="$vuetify.theme.dark = true"
            fab
          >
            <v-icon> mdi-white-balance-sunny </v-icon>
          </v-btn>
        </v-col>
      </v-row>
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
  padding-top: 10px;
}
#app p {
  margin: 0 !important;
}
.darkModeButton:focus::before {
  opacity: 0 !important;
}
</style>
