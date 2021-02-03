<template>
  <div>
    <v-btn
      block
      height="100"
      x-large
      ref="audioButton"
      :color="testColor"
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
      testColor: "",
      loopInterval: "",
      numberOfLoops: 0,
      audioIsPlaying: false,
    };
  },
  watch: {
    initSound: function (newVal) {
      if (newVal == true) {
        this.playSound();
      }
    },
    stopSound: function (newVal) {
      if (newVal == true) {
        console.log("StopSound() hit.");
        this.numberOfLoops = 0;
        this.stopSoundAndAnimation();
        clearInterval(this.loopInterval);
      }
    },
    loopToggle: function () {
      this.numberOfLoops = 0;
      //this.stopSoundAndAnimation();

      this.stopAnimation(
        this.$refs.audioElement.duration - this.$refs.audioElement.currentTime
      );

      clearInterval(this.loopInterval);
    },
  },
  methods: {
    stopAnimation(delay = 0) {
      setTimeout(() => {
        this.audioPlayingButtonElevation = 4;
        this.firstAnimationPlaying = false;
        this.testColor = "";
      }, delay);
    },
    stopSoundAndAnimation() {
      this.audioIsPlaying = false;
      this.$refs.audioElement.pause();
      this.$refs.audioElement.currentTime = 0;

      this.stopAnimation();
    },
    playSoundOnce(duration) {
      console.log("Played sound once");
      if (this.initSound == true) {
        CompUtil.ripple(this.$refs.audioButton.$el);
      }

      this.$refs.audioElement.pause();
      this.$refs.audioElement.currentTime = 0;

      this.audioIsPlaying = true;
      this.$refs.audioElement.play();
      this.playAnimation(duration);
    },
    playSoundLooped(duration) {
      console.log("Duration: " + duration);

      this.playSoundOnce();

      this.loopInterval = setInterval(() => {
        console.log("Number of Loops: " + this.numberOfLoops);

        if (this.loopToggle == false) {
          this.numberOfLoops = 0;
          this.stopSoundAndAnimation();
          clearInterval(this.loopInterval);
        } else {
          this.numberOfLoops++;
          this.playSoundOnce();
        }
      }, duration);
    },
    playSound() {
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
    playAnimation(duration) {
      this.audioPlayingButtonElevation = 0;
      this.testColor = "green";
      if (this.loopToggle == false) {
        setTimeout(() => {
          this.stopSoundAndAnimation();
        }, duration);
      }
    },
  },
};
</script>

<style>
</style>