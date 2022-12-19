<template>

  <ion-page>

    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/library"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid class="audioPlayerUI ion-margin-start ion-margin-end">
        <ion-row class="ion-align-items-center ion-justify-content-center first-row-grid-1 ion-margin-bottom">
          <ion-col size-lg="8">



            <!-- <Lottie :options="defaultOptions" :height="400" :width="400" class="lottie-animation" /> -->
            <!-- <div class="loader" :key="currentSong">Loading...</div> -->


            <div>
              <div id="container" class="container" :class="currentlyPlaying ? container : ''">
                <div class="circle"></div>

                <ion-label>
                  <ion-text class="text" v-if="currentlyPlaying">
                    <p id="text" style="font: 12px ">{{ text }}</p>
                  </ion-text>
                </ion-label>

                <div class="pointer-container">
                  <span class="pointer" v-if="currentlyPlaying"></span>
                </div>

                <div class="gradient-circle"></div>
              </div>

            </div>



          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center ion-justify-content-center">
          <ion-col size-sm="8" size-lg="6">

            <ion-item lines="none">
              <ion-label slot="start">
                <p>{{ currentTimeFormated }}</p>
              </ion-label>

              <ion-label slot="end">
                <p>{{ trackDurationFormated }}</p>
              </ion-label>
            </ion-item>

            <input v-model="value" type="range" @input="skipTrack" min="0" step="1" :max="trackDuration" ref="input"
              style="width: 100%" />

            <div class="buttons-container">
              <a class="button" v-on:click="prevSkip()">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3Z" />
                </svg>
              </a>
              <a class="button play" v-on:click="playAudio()" title="Play/Pause Song">
                <transition name="slide-fade" mode="out-in">
                  <div>
                    <play-circle-icon :size="90" v-show="!currentlyPlaying" />

                    <pause-circle-icon :size="90" v-show="currentlyPlaying" />
                  </div>
                </transition>
              </a>
              <a class="button" v-on:click="nextSkip()">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M11.5,3C6.85,3 2.92,6.03 1.53,10.22L3.9,11C4.95,7.81 7.96,5.5 11.5,5.5C13.46,5.5 15.23,6.22 16.62,7.38L14,10H21V3L18.4,5.6C16.55,4 14.15,3 11.5,3M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20Z" />
                </svg>
              </a>
            </div>
            <div class="buttons-container">
              <a class="button" v-on:click="prevSkip()">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z" />
                </svg>
              </a>

              <a class="button" v-on:click="nextSong()" title="Next Song" slot="end">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                </svg>
              </a>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  // IonSpinner,
  IonItem,
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
  IonText,

} from "@ionic/vue";

import { defineComponent } from "vue";

import PlayCircleIcon from "vue-material-design-icons/PlayCircle.vue";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle.vue";
import Lottie from "vue-lottie";
import * as animationData from "@/assets/pinjump.json";



import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";

const data = useDataStore();



const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

// breathAnimation();

// function breathAnimation() {
//   text.innerText = "Breathe In!";
//   container.className = "container grow";

//   setTimeout(() => {
//     text.innerText = "Hold";

//     setTimeout(() => {
//       text.innerText = "Breathe Out!";
//       container.className = "container shrink";
//     }, holdTime);
//   }, breatheTime);
// }

// setInterval(breathAnimation, totalTime);

export default defineComponent({
  name: "App",
  components: {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    // IonSpinner,
    IonItem,
    IonGrid,
    IonCol,
    IonRow,
    PlayCircleIcon,
    PauseCircleIcon,
    IonLabel,
    IonText,
    // Lottie,
  },
  data: function () {
    return {
      audio: "",
      imgLoaded: false,
      currentlyPlaying: false,
      currentlyStopped: false,
      currentTime: 0,
      checkingCurrentPositionInTrack: "",
      trackDuration: 0,
      currentProgressBar: 0,
      isPlaylistActive: false,
      currentSong: 0,
      debug: false,
      value: 0,
      audioFile: "",
      index: 0,
      dataList: data.dataList,
      title: "",
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      totalTime: totalTime,
      breatheTime: breatheTime,
      holdTime: holdTime,
      text: "",
      container: "",
    };
  },

  mounted: function () {
    // this.getUrlQueryParams();
    this.changeSong();
    this.audio.loop = false;
    this.breathAnimation
    setInterval(this.breathAnimation, this.totalTime);
  },

  methods: {
    getUrlQueryParams: function () {
      this.currentSong = 0;
    },

    breathAnimation: function () {
      this.text = "Breathe In!";
      this.container = "container grow";

      setTimeout(() => {
        this.text = "Hold";

        setTimeout(() => {
          this.text = "Breathe Out!";
          this.container = "container shrink";
        }, this.holdTime);
      }, this.breatheTime);
    },

    shareLink: async function () {
      await Share.share({
        title: "Hey! Check this out on Moby.",
        text: this.dataList[this.currentSong].title,
        url: window.location.href,
        dialogTitle: "Share with buddies",
      });
    },

    skipTrack: function () {
      this.audio.currentTime = this.value;
    },
    togglePlaylist: function () {
      this.isPlaylistActive = !this.isPlaylistActive;
    },

    prevSkip: function () {
      this.value -= 30;
      this.audio.currentTime = this.value;
      if (this.audio.currentTime < 0) {
        this.audio.currentTime = 0;
        this.value = 0;
      }
    },

    nextSkip: function () {
      this.value += 30;
      this.audio.currentTime = this.value;
      if (this.audio.currentTime >= this.audio.duration) {
        this.audio.currentTime = 0;
        this.value = 0;
        this.stopAudio();
      }
    },

    changeSong: function () {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;

      this.currentSong = 0;

      this.audioFile = this.dataList[this.currentSong].mediaUrl;
      this.audio = new Audio(this.audioFile);
      console.log("this.audioFile", this.audioFile);
      console.log("this.index", this.index);
      console.log(" this.currentSong", this.currentSong);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function () {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
      if (wasPlaying && this.currentlyStopped) {
        this.playAudio();
      }
    },
    isCurrentSong: function (index) {
      if (this.currentSong == index) {
        return true;
      }
      return false;
    },
    getCurrentSong: function (currentSong) {
      return this.dataList[currentSong].mediaUrl;
    },
    playAudio: function () {

      // setInterval(this.breathAnimation, this.totalTime);
      // this.breatheTime = 0
      if (!this.currentlyPlaying) {
        this.getCurrentTimeEverySecond(true);
        this.currentlyPlaying = true;
        this.audio.play();
      } else {
        this.stopAudio();

      }
      this.currentlyStopped = false;
    },
    stopAudio: function () {
      this.audio.pause();
      this.currentlyPlaying = false;
      this.pausedMusic();
    },
    handleEnded: function () {
      this.stopAudio();
      this.value = 0;
    },
    onImageLoaded: function () {
      this.imgLoaded = true;
    },
    getCurrentTimeEverySecond: function (startStop) {
      var localThis = this;
      this.checkingCurrentPositionInTrack = setTimeout(
        function () {
          localThis.currentTime = localThis.audio.currentTime;
          localThis.currentProgressBar =
            (localThis.audio.currentTime / localThis.trackDuration) * 100;
          localThis.getCurrentTimeEverySecond(true);
        }.bind(this),
        1000
      );
    },
    pausedMusic: function () {
      clearTimeout(this.checkingCurrentPositionInTrack);
    },

    fancyTimeFormat: function (s) {
      if (s < 0) s = 0;
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    },
  },
  computed: {
    currentTimeFormated() {
      return this.fancyTimeFormat(this.currentTime);
    },
    trackDurationFormated() {
      return this.fancyTimeFormat(this.trackDuration);
    },
    // animationPointer() {
    //   return 'animation: rotate 7.5s linear forwards infinite;';
    // },


  },




  watch: {
    currentTime: function () {
      this.currentTime = Math.round(this.currentTime);
      this.value = this.currentTime;
    },
    value: function () {
      this.currentTime = this.value;
    },
  },

  beforeUnmount: function () {
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("loadedmetadata", this.handleEnded);

    clearTimeout(this.checkingCurrentPositionInTrack);
  },
});
</script>

<style scoped>
body {
  position: absolute;
}

.button {
  color: var(--ion-color-dark);
  display: flex;
  z-index: 10;
}

.button:active {
  opacity: 0.95;
  transform: scale(0.95);
}

.button.isDisabled {
  color: var(--ion-color-light-shade);
  cursor: initial;
}

.button.isDisabled:active {
  transform: none;
}

.buttons-container {
  display: flex;

  justify-content: space-around;
  align-items: center;

  margin-top: 10px;
}

ion-grid {
  height: 100%;
}

.first-row-grid-1 {
  min-height: 52%;
}

/* iframe {
  width: 100%;
  height: 320px;
} */

ion-label {
  margin: 0;
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 0px;
  --padding-start: 0px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --background: none;
  --inner-padding-top: 0px;
}

@media only screen and (max-width: 600px) {
  /* iframe {
    width: 100%;
    height: 250px;
  } */

  /* .audioPlayerUI {

    will-change: transform, filter;
    transition: 0.5s;
  } */

  input {
    z-index: 10;
  }

  /* .heading {
    font-size: large;
  } */

  .lottie-animation {
    padding-right: 80px;
    max-height: 250px;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 130px;
    width: 130px;
    position: relative;
    transform: scale(1);
  }

  .circle {
    background-color: #0997bb;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .gradient-circle {
    background: conic-gradient(var(--ion-color-secondary) 0%,
        var(--ion-color-secondary) 40%,
        var(--ion-color-medium) 40%,
        var(--ion-color-medium)60%,
        var(--ion-color-secondary-shade) 60%,
        var(--ion-color-secondary-shade) 100%);
    height: 150px;
    width: 150px;
    z-index: -2;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    left: -10px;
  }

  .pointer {
    background-color: var(--ion-color-warning-shade);
    border-radius: 50%;
    height: 10px;
    width: 10px;
    display: block;
  }

  .pointer-container {
    position: absolute;
    top: -10px;
    /* left: 140px; */
    width: 20px;
    height: 75px;
    animation: rotate 7.5s linear forwards infinite;
    transform-origin: bottom center;
  }

  .text {
    color: #ffffff;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .container.grow {
    animation: grow 3s linear forwards;
  }

  @keyframes grow {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(2);
    }
  }

  .container.shrink {
    animation: shrink 3s linear forwards;
  }

  @keyframes shrink {
    from {
      transform: scale(2);
    }

    to {
      transform: scale(1);
    }
  }
}
</style>
