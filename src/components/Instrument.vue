<template>
  <div>
    <button ref="audioButton" @click="playSound()" class="instrumentButton">
      {{ keyCode }}
    </button>
    <audio
      ref="audioElement"
      :src="require(`@/assets/${fileName}.mp3`)"
      type="audio/mp3"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "Instrument",
  props: {
    keyCode: String,
    fileName: String,
    initSound: Boolean,
  },
  data: function () {
    return {
      animationRequestCount: 0,
    };
  },
  watch: {
    initSound: function () {
      console.log(`@/assets/${this.fileName}.mp3`);
      if (this.initSound == true) {
        this.playSound();
      }
    },
  },
  methods: {
    playSound() {
      this.$refs.audioElement.pause();
      this.$refs.audioElement.currentTime = 0;
      this.$refs.audioElement.play();
      this.playAnimation(this.$refs.audioElement.duration);
    },
    playAnimation(duration) {
      this.animationRequestCount++;
      console.log("Audio playing for: " + duration * 1000);

      this.$refs.audioButton.classList = "instrumentButton audioPlaying";

      setTimeout(() => {
        if (this.animationRequestCount == 1) {
          this.$refs.audioButton.classList = "instrumentButton";
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
.instrumentButton {
  transition: 0.3s;
  transition-timing-function: ease;

  margin: 1vw 0;
  width: 100%;
  height: 12.5vw;

  background-color: rgb(0, 98, 204);

  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);

  font-size: 1em;
  color: rgb(232, 230, 227);
}
.instrumentButton:hover,
.instrumentButton:active {
  opacity: 0.8;
  transition: 0.3s;
  transition-timing-function: ease;
}
.instrumentButton:focus {
  outline-width: 0px;
}

.audioPlaying {
  background-color: red;
}
</style>