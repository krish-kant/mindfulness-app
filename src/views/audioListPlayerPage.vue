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
        <ion-row
          class="ion-align-items-center ion-justify-content-center first-row-grid-1 ion-margin-bottom"
        >
          <ion-col size-lg="8">
            <ion-item lines="none"></ion-item>
            <div class="albumImage">
              <transition
                name="ballmove"
                enter-active-class="animated zoomIn"
                leave-active-class="animated fadeOutDown"
                mode="out-in"
              />
              <transition name="slide-fade" mode="out-in">
                <img
                  @load="onImageLoaded()"
                  :src="dataList[currentSong].imageUrl"
                  :key="currentSong"
                  ondragstart="return false;"
                  id="playerAlbumArt"
                />
              </transition>
              <!-- <div class="loader" :key="currentSong">Loading...</div> -->
            </div>
            <ion-item lines="none">
              <ion-label class="ion-text-wrap">
                <h3>{{ dataList[currentSong].title }}</h3>
                <p>{{ dataList[currentSong].type }}</p>
              </ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center ion-justify-content-center"
          ><ion-col size-sm="8" size-lg="6">
            <ion-item lines="none">
              <ion-label slot="start">
                <p>{{ currentTimeFormated }}</p>
              </ion-label>

              <ion-label slot="end">
                <p>{{ trackDurationFormated }}</p>
              </ion-label>
            </ion-item>

            <input
              v-model="value"
              type="range"
              @input="skipTrack"
              min="0"
              step="1"
              :max="trackDuration"
              ref="input"
              style="width: 100%" />

            <div class="buttons-container">
              <a
                class="button"
                :class="{ isDisabled: currentSong == 0 }"
                v-on:click="prevSong()"
                title="Previous Song"
              >
                <svg style="width: 60px; height: 60px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z"
                  />
                </svg>
              </a>
              <a
                class="button play"
                v-on:click="playAudio()"
                title="Play/Pause Song"
              >
                <transition name="slide-fade" mode="out-in">
                  <div>
                    <play-circle-icon :size="90" v-show="!currentlyPlaying" />

                    <pause-circle-icon :size="90" v-show="currentlyPlaying" />
                  </div>
                </transition>
              </a>
              <a
                class="button"
                :class="{ isDisabled: currentSong == dataList.length - 1 }"
                v-on:click="nextSong()"
                title="Next Song"
              >
                <svg style="width: 60px; height: 60px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z"
                  />
                </svg>
              </a>
            </div>
            <div class="buttons-container">
              <a class="button" v-on:click="prevSkip()">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3Z"
                  />
                </svg>
              </a>

              <a class="button" v-on:click="nextSkip()">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M11.5,3C6.85,3 2.92,6.03 1.53,10.22L3.9,11C4.95,7.81 7.96,5.5 11.5,5.5C13.46,5.5 15.23,6.22 16.62,7.38L14,10H21V3L18.4,5.6C16.55,4 14.15,3 11.5,3M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20Z"
                  />
                </svg>
              </a></div></ion-col
        ></ion-row>
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
} from "@ionic/vue";

import { defineComponent } from "vue";

import PlayCircleIcon from "vue-material-design-icons/PlayCircle.vue";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle.vue";
import { Share } from "@capacitor/share";
import { useRouter, useRoute } from "vue-router";
import { useDataStore } from "@/stores/data";

const data = useDataStore();

const url = new URL("https://w.com/#about");

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
    };
  },

  mounted: function () {
    this.getUrlQueryParams();
    this.changeSong();
    this.audio.loop = false;
  },

  methods: {
    getUrlQueryParams: async function () {
      await this.$router.isReady();
      // this.currentSong = this.$route.query.index;
      // this.index = this.$route.query.index;
      this.dataLoaded = true;

      // console.log(this.$route.query);
      // console.log(this.currentSong);
      this.title = this.dataList.filter(
        (item) => item.title === this.$route.params.title
      )[0].title;
      console.log(this.title);
      console.log(
        this.dataList.filter((item) => item.title === this.title)[0].id
      );
      this.index = this.dataList.findIndex((item) => item.title === this.title);
      this.currentSong = this.index;
      console.log(this.currentSong);
    },

    // shareLink: async function () {
    //   await Share.share({
    //     title: "Hey! Check this out on Moby.",
    //     text: this.dataList[this.currentSong].title,
    //     url: window.location.href,
    //     dialogTitle: "Share with buddies",
    //   });
    // },

    skipTrack: function () {
      this.audio.currentTime = this.value;
    },
    togglePlaylist: function () {
      this.isPlaylistActive = !this.isPlaylistActive;
    },
    nextSong: function () {
      if (this.currentSong < this.dataList.length - 1) {
        this.changeSong(this.currentSong + 1);
        this.value = 0;
        this.currentTime = 0;
      }
    },

    prevSong: function () {
      if (this.currentSong > 0) {
        this.changeSong(this.currentSong - 1);
        this.value = 0;
        this.currentTime = 0;
      }
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

    changeSong: function (index) {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;

      if (index !== undefined) {
        this.stopAudio();
        this.currentSong = index;
      }

      this.audioFile = this.dataList[this.currentSong].mediaUrl;
      this.audio = new Audio(this.audioFile);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function () {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
      if (wasPlaying) {
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
      return this.dataList[currentSong].url;
    },
    playAudio: function () {
      if (
        this.currentlyStopped == true &&
        this.currentSong + 1 == this.dataList.length
      ) {
        this.currentSong = 0;
        this.changeSong();
      }
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
      if (this.currentSong + 1 == this.dataList.length) {
        this.stopAudio();
        this.currentlyPlaying = false;
        this.currentlyStopped = true;
      } else {
        this.currentlyPlaying = false;
        this.currentSong++;
        this.changeSong();
        this.playAudio();
      }
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

img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 5px;
  filter: brightness(70%);
}
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
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 5px;
    z-index: 10;
    filter: brightness(70%);
  }

  .audioPlayerUI {
    /* margin-top: 1.5rem; */
    will-change: transform, filter;
    transition: 0.5s;
  }

  input {
    z-index: 10;
  }
}
</style>
