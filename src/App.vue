<template>
  <div id="app">
    <instrument-container/>
  </div>
</template>

<script>
import InstrumentContainer from './components/InstrumentContainer.vue';

export default {
  name: "App",
  components: {
    InstrumentContainer
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
