<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab2"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid class="audioPlayerUI ion-margin-start ion-margin-end">
        <ion-row
          class="ion-align-items-center ion-justify-content-center first-row-grid-1 ion-margin-bottom"
        >
          <ion-col size-lg="8">
            <ion-item lines="none"
              ><svg
                slot="end"
                style="width: 24px; height: 24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z"
                /></svg
            ></ion-item>
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
                  :src="musicPlaylist[currentSong].image"
                  :key="currentSong"
                  ondragstart="return false;"
                  id="playerAlbumArt"
                />
              </transition>
              <!-- <div class="loader" :key="currentSong">Loading...</div> -->
            </div>
            <ion-item lines="none">
              <ion-label class="ion-text-wrap">
                <h3>{{ musicPlaylist[currentSong].title }}</h3>
                <p>{{ musicPlaylist[currentSong].artist }}</p>
              </ion-label>
              <a
                class="button"
                :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
                v-on:click="nextSong()"
                title="Next Song"
                slot="end"
              >
                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                  />
                </svg>
              </a>
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
              style="width: 100%"
            />

            <div class="buttons-container">
              <!-- <a
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
              </a> -->
              <a class="button" v-on:click="prevSkip()">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3Z"
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
              <a class="button" v-on:click="nextSkip()">
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M11.5,3C6.85,3 2.92,6.03 1.53,10.22L3.9,11C4.95,7.81 7.96,5.5 11.5,5.5C13.46,5.5 15.23,6.22 16.62,7.38L14,10H21V3L18.4,5.6C16.55,4 14.15,3 11.5,3M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20Z"
                  />
                </svg>
              </a>
              <!-- <a
                class="button"
                :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
                v-on:click="nextSong()"
                title="Next Song"
              >
                <svg style="width: 60px; height: 60px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z"
                  />
                </svg>
              </a> -->
            </div>
          </ion-col></ion-row
        >
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

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

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
      musicPlaylist: [
        {
          title:
            "Service Bell Service Bell Service Bell Service Bell Bell Service Bell",
          artist: "Daniel Simion",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          image: "https://picsum.photos/550/600",
        },
        {
          title: "Meadowlark",
          artist: "Daniel Simion",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          image: "https://picsum.photos/700/600",
        },
        {
          title: "Hyena Laughing",
          artist: "Daniel Simion",
          url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          image: "https://picsum.photos/500/620",
        },
        {
          title: "Creepy Background",
          artist: "Daniel Simion",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          image: "https://picsum.photos/1000/600",
        },
      ],
      audioFile: "",
      index: 0,
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
      this.currentSong = this.$route.query.index;
      this.index = this.$route.query.index;
      this.dataLoaded = true;
      // console.log(this.$route.query);
      // console.log(this.currentSong);
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

      this.index = this.$route.query.index;
      this.currentSong = this.index;

      this.audioFile = this.musicPlaylist[this.currentSong].url;
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
      return this.musicPlaylist[currentSong].url;
    },
    playAudio: function () {
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
  object-position: bottom;
  border-radius: 5px;
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
