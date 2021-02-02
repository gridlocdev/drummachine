<template>
  <div class="instrumentContainer">
    <div class="row" v-for="chunk in instrumentChunks" :key="chunk.id">
      <!-- [3], [2] -->
      <div class="column" v-for="instrument in chunk" :key="instrument.id">
        <instrument
          :fileName="instrument.name"
          :keyCode="instrument.keyCode"
          @click="initSound = true"
          :initSound="instrument.initSound"
        ></instrument>
      </div>
    </div>

    <div v-for="instrument in instruments" :key="instrument.id"></div>
  </div>
</template>

<script>
import Instrument from "./Instrument.vue";

export default {
  name: "InstrumentContainer",
  components: {
    Instrument,
  },
  computed: {
    instrumentChunks: function () {
      // Re-organizes the display order of the displayed instruments inside column-count grid.
      return this.chunk(this.instruments, 3);
    },
  },
  data: function () {
    return {
      instruments: [
        {
          id: 0,
          name: "1 - 808 1",
          description: "",
          keyCode: "q",
          initSound: false,
        },
        {
          id: 1,
          name: "2 - 808 2",
          description: "",
          keyCode: "w",
          initSound: false,
        },
        {
          id: 2,
          name: "3 - Triangle",
          description: "",
          keyCode: "e",
          initSound: false,
        },
        {
          id: 3,
          name: "4 - Closed hat",
          description: "",
          keyCode: "a",
          initSound: false,
        },
        {
          id: 4,
          name: "5 - Clap",
          description: "",
          keyCode: "s",
          initSound: false,
        },
        {
          id: 5,
          name: "6 - Perc",
          description: "",
          keyCode: "d",
          initSound: false,
        },
        {
          id: 6,
          name: "7 - Kick",
          description: "",
          keyCode: "z",
          initSound: false,
        },
        {
          id: 7,
          name: "8 - Hi hat",
          description: "",
          keyCode: "x",
          initSound: false,
        },
        {
          id: 8,
          name: "9 - Snare",
          description: "",
          keyCode: "c",
          initSound: false,
        },
      ],
    };
  },
  methods: {
    handleKeyPress(event) {
      const key = event.key;

      for (var i = 0; i < this.instruments.length; i++) {
        // If the key that was pressed corresponds to an instrument's keyCode
        if (this.instruments[i].keyCode == key) {
          // Update initSound, so the child method is triggered.
          this.instruments[i].initSound = true;
          console.log("SUCCESS!");
          // Set initSound back to false on the next tick, so that it can be re-triggered.
          this.$nextTick(() => {
            this.instruments[i].initSound = false;
          });
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
.instrumentContainer {
  border: 2px solid black;
  border-radius: 5px;

  padding: 3vw;

  width: 50vw;
  margin: auto;
  row-gap: 55px;
}
.row {
  column-count: 3;
}
</style>