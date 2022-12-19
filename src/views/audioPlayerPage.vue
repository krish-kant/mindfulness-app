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
            <div class="albumImage">
              <img @load="onImageLoaded()" :src="dataList[currentAudio].imageUrl" :key="currentAudio"
                ondragstart="return false;" id="playerAlbumArt" />
            </div>
            <ion-item lines="none">
              <ion-label class="ion-text-wrap">
                <ion-text class="heading">{{
                    dataList[currentAudio].title
                }}</ion-text>
                <p>{{ dataList[currentAudio].type }}</p>
              </ion-label>

            </ion-item>
            <ion-badge color="medium">
              <ion-spinner v-if="audioBuffering"></ion-spinner>
            </ion-badge>

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
                <rewind30-icon :size="40" />
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
                <fast-forward30-icon :size="40" />
              </a>
            </div>
            <div class="buttons-container">
              <a class="button">
                <account-voice-icon :size="40" />
              </a>
              <a class="button" title="Next Song" slot="end">
                <cards-heart-outline-icon :size="40" />
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
  IonSpinner,
  IonItem,
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
  IonText,
  IonBadge,
} from "@ionic/vue";

import { defineComponent } from "vue";

import PlayCircleIcon from "vue-material-design-icons/PlayCircle.vue";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle.vue";

import CardsHeartOutlineIcon from "vue-material-design-icons/CardsHeartOutline.vue";
import AccountVoiceIcon from "vue-material-design-icons/AccountVoice.vue";
import FastForward30Icon from "vue-material-design-icons/FastForward30.vue";
import Rewind30Icon from "vue-material-design-icons/Rewind30.vue";


import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";

const data = useDataStore();


export default defineComponent({
  name: "App",
  components: {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonSpinner,
    IonItem,
    IonGrid,
    IonCol,
    IonRow,
    IonLabel,
    IonText,
    IonBadge,
    PlayCircleIcon,
    PauseCircleIcon,
    FastForward30Icon,
    Rewind30Icon,
    CardsHeartOutlineIcon,
    AccountVoiceIcon
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
      currentAudio: 0,
      debug: false,
      value: 0,
      audioFile: "",
      index: 0,
      dataList: data.dataList,
      title: "",
      audioBuffering: false,
      params: "",
    };
  },

  mounted: function () {
    this.getUrlQueryParams();
    this.changeSong();
    this.audio.loop = false;
    this.audio.addEventListener("waiting", this.handleWaiting);
    this.audio.addEventListener("playing", this.handlePlaying);
  },

  methods: {
    getUrlQueryParams: async function () {
      await this.$router.isReady();
      this.params = this.$route
      this.dataLoaded = true;
      this.title = this.dataList.filter(
        (item) => item.title === this.$route.params.title
      )[0].title;
      console.log(this.title);
      console.log(
        this.dataList.filter((item) => item.title === this.title)[0].id
      );
      this.index = this.dataList.findIndex((item) => item.title === this.title);
      this.currentAudio = this.index;
      console.log(this.dataList.findIndex((item) => item.title === this.title));
    },
    shareLink: async function () {
      await Share.share({
        title: "Hey! Check this out on Moby.",
        text: this.dataList[this.currentAudio].title,
        url: window.location.href,
        dialogTitle: "Share with buddies",
      });
    },

    handleWaiting: function () {
      this.audioBuffering = true;
    },

    handlePlaying: function () {
      this.audioBuffering = false;
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
        this.audio.play();
        setTimeout(() => {
          this.stopAudio();
        }, 100);




      }
    },

    changeSong: function () {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;
      this.title = this.dataList.filter(
        (item) => item.title === this.$route.params.title
      )[0].title;
      this.index = this.dataList.findIndex((item) => item.title === this.title);
      this.currentAudio = this.index;

      this.audioFile = this.dataList[this.currentAudio].mediaUrl;
      this.audio = new Audio(this.audioFile);
      console.log("this.audioFile", this.audioFile);
      console.log("this.index", this.index);
      console.log(" this.currentAudio", this.currentAudio);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function () {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
      if (wasPlaying && this.currentlyStopped) {
        this.playAudio();
      }
    },
    iscurrentAudio: function (index) {
      if (this.currentAudio == index) {
        return true;
      }
      return false;
    },
    getcurrentAudio: function (currentAudio) {
      return this.dataList[currentAudio].mediaUrl;
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
      this.audioBuffering = false;
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

    $route() {
      if (this.currentlyPlaying) {
        alert("Do you want to stop the current song?");
        this.stopAudio();
      }
    }
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
    height: 220px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 5px;
    z-index: 10;
    filter: brightness(70%);
  }
}


.albumImage {

  position: relative;
}

ion-badge {
  position: absolute;
  top: 35%;
  left: 44%;
  z-index: 10;

}

input {
  z-index: 10;
}

.heading {
  font-size: medium;
}
</style>
