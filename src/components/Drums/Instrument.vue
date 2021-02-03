<template>
  <div>
    <v-btn
      block
      height="100"
      x-large
      ref="audioButton"
      @click="playSound()"
      :elevation="audioPlayingButtonElevation"
    >
      {{ keyCode }}
    </v-btn>
    <audio
      ref="audioElement"
      :src="require(`@/assets/Drums/${fileName}.mp3`)"
      type="audio/mp3"
    ></audio>
  </div>
</template>

<script>
import CompUtil from "../../Utility/CompUtil.js";

export default {
  name: "Instrument",
  props: {
    keyCode: String,
    fileName: String,
    initSound: Boolean,
    instrumentStyle: String,
  },
  data: function () {
    return {
      animationRequestCount: 0,
      audioPlayingButtonElevation: 4,
    };
  },
  watch: {
    initSound: function () {
      if (this.initSound == true) {
        this.playSound();
      }
    },
  },
  methods: {
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
      this.audioPlayingButtonElevation = 2;

      setTimeout(() => {
        if (this.animationRequestCount == 1) {
          this.audioPlayingButtonElevation = 4;
          this.firstAnimationPlaying = false;
          this.animationRequestCount = 0;
        } else {
          this.animationRequestCount--;
        }
      }, duration * 1000);
    },
  },
};
</script>

<style>
/* .instrumentButton {
  transition: 0.3s !important;
  transition-timing-function: ease !important;
}

.instrumentButton:hover,
.instrumentButton:active {
  opacity: 0.8 !important;
  transition: 0.3s !important;
  transition-timing-function: ease !important;
}

.audioPlaying {
  background-color: red !important;
} */
</style>