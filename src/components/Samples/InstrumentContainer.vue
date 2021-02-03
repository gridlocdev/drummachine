<template>
  <div class="instrumentContainer">
    <v-sheet class="ma-5 pa-5" elevation="5" rounded>
      <v-row no-gutters>
        <v-col class="my-auto" align="center">
          <p class="font-weight-bold text-uppercase">Samples</p>
        </v-col>
        <v-col class="px-auto" align="center">
          <v-row justify="center">
            <v-switch v-model="loopToggle" label="Loop" left-label></v-switch>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mb-5"></v-divider>
      <v-row class="row" v-for="chunk in instrumentChunks" :key="chunk.id">
        <!-- [3], [2] -->
        <v-col
          no-gutters
          class="column"
          v-for="instrument in chunk"
          :key="instrument.id"
        >
          <instrument
            :id="instrument.id"
            :loopToggle="loopToggle"
            :fileName="instrument.name"
            :keyCode="instrument.keyCode"
            @click.native="startInstrumentSound(instrument.id)"
            :initSound="instrument.initSound"
            :stopSound="instrument.stopSound"
          ></instrument>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import Instrument from "./Instrument.vue";

export default {
  name: "InstrumentContainer",
  components: {
    Instrument,
  },
  props: {
    columnCount: Number,
  },
  data: function () {
    return {
      loopToggle: true,
      instruments: [
        {
          id: 0,
          name: "untitled18",
          description: "",
          keyCode: "t",
          initSound: false,
          stopSound: false,
        },
        {
          id: 1,
          name: "untitled31",
          description: "",
          keyCode: "y",
          initSound: false,
          stopSound: false,
        },
        {
          id: 2,
          name: "untitled44",
          description: "",
          keyCode: "u",
          initSound: false,
          stopSound: false,
        },
        {
          id: 3,
          name: "untitled45",
          description: "",
          keyCode: "g",
          initSound: false,
          stopSound: false,
        },
        {
          id: 4,
          name: "untitled66",
          description: "",
          keyCode: "h",
          initSound: false,
          stopSound: false,
        },
        {
          id: 5,
          name: "untitled86",
          description: "",
          keyCode: "j",
          initSound: false,
          stopSound: false,
        },
        {
          id: 6,
          name: "untitled104",
          description: "",
          keyCode: "b",
          initSound: false,
          stopSound: false,
        },
        {
          id: 7,
          name: "untitled105",
          description: "",
          keyCode: "n",
          initSound: false,
          stopSound: false,
        },
        {
          id: 8,
          name: "untitled146",
          description: "",
          keyCode: "m",
          initSound: false,
          stopSound: false,
        },
      ],
    };
  },
  computed: {
    instrumentChunks: function () {
      // Re-organizes the display order of the displayed instruments inside column-count grid.
      return this.chunk(this.instruments, this.columnCount);
    },
  },
  methods: {
    stopAllInstrumentSounds: function () {
      for (var i = 0; i < this.instruments.length; i++) {
        console.log("this.instruments[i].stopSound = true;");
        // Update stopSound, so the child method is triggered.
        this.instruments[i].stopSound = true;
        // Set stopSound back to false on the next tick, so that it can be re-triggered.
      }
      this.$nextTick(() => {
        for (var i = 0; i < this.instruments.length; i++) {
          console.log("this.instruments[i].stopSound = false;");
          this.instruments[i].stopSound = false;
        }
      });
    },
    startInstrumentSound: async function (instrumentID) {
      await this.stopAllInstrumentSounds();

      console.log("StartInstrumentSound() hit.");
      // Update initSound, so the child method is triggered.
      console.log("this.instruments[instrumentID].initSound = true;");
      this.instruments[instrumentID].initSound = true;
      // Set initSound back to false on the next tick, so that it can be re-triggered.
      this.$nextTick(() => {
        console.log("this.instruments[instrumentID].initSound = false;");
        this.instruments[instrumentID].initSound = false;
      });
    },
    handleKeyPress(event) {
      this.$emit("keypressed", event.key);
      const key = event.key;

      for (var i = 0; i < this.instruments.length; i++) {
        // If the key that was pressed corresponds to an instrument's keyCode
        if (this.instruments[i].keyCode == key) {
          this.startInstrumentSound(this.instruments[i].id);
          break;
        }
      }
    },
    chunk(collection, size) {
      var result = [];

      // default size to two item
      size = parseInt(size) || 2;

      // add each chunk to the result
      for (var x = 0; x < Math.ceil(collection.length / size); x++) {
        var start = x * size;
        var end = start + size;

        result.push(collection.slice(start, end));
      }

      return result;
    },
  },
  created: function () {
    window.addEventListener("keydown", this.handleKeyPress);
  },
};
</script>

<style scoped>
</style>