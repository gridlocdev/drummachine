<template>
  <div>
    <v-btn
      block
      height="100"
      x-large
      ref="audioButton"
      :color="activeColor"
      class="instrumentButton"
      :elevation="audioPlayingButtonElevation"
    >
      {{ keyCode }}
    </v-btn>
    <audio
      ref="audioElement"
      :src="require(`@/assets/Samples/${fileName}.mp3`)"
      type="audio/mp3"
    ></audio>
  </div>
</template>

<script>
import CompUtil from "../../Utility/CompUtil.js";

export default {
  name: "Instrument",
  props: {
    id: Number,
    keyCode: String,
    fileName: String,
    initSound: Boolean,
    stopSound: Boolean,
    loopToggle: Boolean,
  },
  data: function () {
    return {
      audioPlayingButtonElevation: 4,
      activeColor: "",
      loopIntervalInstance: "",
      numberOfLoops: 0,
      audioIsPlaying: false,
    };
  },
  watch: {
    initSound: function (newVal) {
      if (newVal == true) {
        this.playAnimation();
        this.playInstrumentSound();
      }
    },
    stopSound: function (newVal) {
      if (newVal == true) {
        console.log("StopSound() hit.");
        this.stopAnimation();
        this.stopInstrumentSound();
        this.numberOfLoops = 0;
        clearInterval(this.loopIntervalInstance);
      }
    },
    loopToggle: function (newVal) {
      this.numberOfLoops = 0;
      this.stopAnimation();
      this.stopInstrumentSound();
      if (newVal == true) {
        clearInterval(this.loopIntervalInstance);
      }
    },
  },
  methods: {
    playInstrumentSound() {
      if (this.audioIsPlaying != true) {
        const duration = this.$refs.audioElement.duration * 1000;
        if (this.loopToggle == true) {
          // If loop is true
          this.playSoundLooped(duration);
        } else {
          // else play once
          this.playSoundOnce(duration);
        }
      }
    },
    playSoundOnce(duration = 0) {
      console.log("Played sound once, duration: " + duration);
      if (this.initSound == true) {
        CompUtil.ripple(this.$refs.audioButton.$el);
      }

      this.$refs.audioElement.pause();
      this.$refs.audioElement.currentTime = 0;

      this.audioIsPlaying = true;
      this.$refs.audioElement.play();
      if (this.loopToggle == false) {
        setTimeout(() => {
          this.stopInstrumentSound();
          this.stopAnimation();
        }, duration);
      }
    },
    playSoundLooped(duration) {
      console.log("Duration: " + duration);

      this.playSoundOnce();

      this.loopIntervalInstance = setInterval(() => {
        console.log("Number of Loops: " + this.numberOfLoops);

        if (this.loopToggle == false) {
          this.numberOfLoops = 0;
          this.stopInstrumentSound();
          this.stopAnimation();
          clearInterval(this.loopIntervalInstance);
        } else {
          this.numberOfLoops++;
          this.playSoundOnce();
        }
      }, duration);
    },
    playAnimation() {
      console.log("playAnimation hit. id: " + this.id);
      this.audioPlayingButtonElevation = 0;
      this.activeColor = "green";
    },
    stopInstrumentSound() {
      this.audioIsPlaying = false;
      this.$refs.audioElement.pause();
      this.$refs.audioElement.currentTime = 0;
    },
    stopAnimation() {
      console.log("stopAnimation hit. id: " + this.id);
      this.audioPlayingButtonElevation = 4;
      this.firstAnimationPlaying = false;
      this.activeColor = "";
    },
  },
};
</script>

<style scoped>
.instrumentButton {
  transition: 0.3s ease !important;
}
</style>