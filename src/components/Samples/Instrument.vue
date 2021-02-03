<template>
  <div>
    <v-btn
      block
      height="100"
      x-large
      ref="audioButton"
      @click="playSound()"
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
    loopToggle: Boolean,
  },
  data: function () {
    return {
      animationRequestCount: 0,
      audioPlayingButtonElevation: 4,
      testColor: "",
    };
  },
  watch: {
    initSound: function () {
      if (this.initSound == true) {
        this.animationRequestCount = 0;
        this.playSound();
      }
    },
    loopToggle: function () {
      this.stopSound();
    },
  },
  methods: {
    stopSound() {
      this.$refs.audioElement.pause();
      this.$refs.audioElement.currentTime = 0;

      this.audioPlayingButtonElevation = 4;
      this.firstAnimationPlaying = false;
      this.animationRequestCount = 0;
      this.testColor = "";
    },
    // playSoundLooped() {
    //   if (this.loopToggle == true) {
    //     console.log(
    //       "playAnimation hit. Playing Sound: " + this.animationRequestCount
    //     );
    //     this.playSound();
    //   } else {
    //     console.log("I've been hit. AAAAAAAAAAAA");
    //     this.$emit("stoppedSound", this.id);
    //   }
    // },
    playSound() {
      if (this.initSound == true) {
        CompUtil.ripple(this.$refs.audioButton.$el);
      }

      this.$refs.audioElement.pause();
      this.$refs.audioElement.currentTime = 0;
      this.$refs.audioElement.play();
      this.playAnimation(this.$refs.audioElement.duration);
    },
    playAnimation(duration) {
      this.animationRequestCount++;
      this.audioPlayingButtonElevation = 0;
      this.testColor = "green";
      setTimeout(() => {
        if (this.animationRequestCount == 1) {
          this.audioPlayingButtonElevation = 4;
          this.firstAnimationPlaying = false;
          this.animationRequestCount = 0;
          this.testColor = "";
        } else {
          this.animationRequestCount--;
        }
      }, duration * 1000);
    },
  },
};
</script>

<style>
</style>