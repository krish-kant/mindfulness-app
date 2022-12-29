<template>
  <ion-page ref="page">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-buttons style="color: white">
          <ion-back-button mode="md" defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons> -->
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="open-modal" style="width: 1px" />
      <ion-modal
        ref="modal"
        backdropDismiss="false"
        trigger="open-modal"
        :presenting-element="presentingElement"
      >
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <ion-text style="color: white"></ion-text>
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="presentActionSheet"
                ><svg style="width: 30px; height: 30px" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                  /></svg
              ></ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <div id="overlay" v-on:click="overlay = 'none'" :style="{ display: overlay }">
          <div id="text">
            {{ trackDurationRemaining }}
          </div>
        </div>

        <ion-grid class="audioPlayerUI ion-margin-start ion-margin-end">
          <ion-row
            class="ion-align-items-center ion-justify-content-center first-row-grid-1 ion-margin-bottom"
          >
            <ion-col>
              <div class="albumImage">
                <div style="position: relative">
                  <img
                    @load="onImageLoaded()"
                    :src="dataList[currentAudio].imageUrl"
                    :key="currentAudio"
                    ondragstart="return false;"
                    id="playerAlbumArt"
                  />
                  <ion-badge color="medium">
                    <ion-spinner v-if="audioBuffering"></ion-spinner>
                  </ion-badge>
                </div>
              </div>
              <ion-item lines="none">
                <ion-label class="ion-text-wrap">
                  <ion-text style="font-size: medium">{{
                    dataList[currentAudio].title
                  }}</ion-text>
                  <p style="text-transform: uppercase">
                    {{ dataList[currentAudio].type }}
                  </p>
                </ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row class="ion-align-items-center ion-justify-content-center">
            <ion-col size-sm="8">
              <ion-item lines="none">
                <ion-label slot="start">
                  <p style="text-transform: uppercase">{{ currentTimeFormated }}</p>
                </ion-label>
                <ion-label slot="end">
                  <p style="text-transform: uppercase">{{ trackDurationFormated }}</p>
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
                <a
                  class="button"
                  :class="{ isDisabled: currentAudio == 0 }"
                  v-on:click="prevSong()"
                  title="Previous Song"
                >
                  <svg style="width: 60px; height: 60px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
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
                <a
                  class="button"
                  :class="{ isDisabled: currentAudio == dataList.length - 1 }"
                  v-on:click="nextSong()"
                  title="Next Song"
                >
                  <svg style="width: 60px; height: 60px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
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
                <a class="button" v-on:click="prevSkip()">
                  <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z"
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
                </a>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-modal>
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
  IonModal,
  IonButton,
  IonTitle,
  actionSheetController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import PlayCircleIcon from "vue-material-design-icons/PlayCircle.vue";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle.vue";
import CardsHeartOutlineIcon from "vue-material-design-icons/CardsHeartOutline.vue";
import AccountVoiceIcon from "vue-material-design-icons/AccountVoice.vue";
import FastForward30Icon from "vue-material-design-icons/FastForward30.vue";
import Rewind30Icon from "vue-material-design-icons/Rewind30.vue";
import { useDataStore } from "@/stores/data";
import { useRouter } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const data = useDataStore();
const router = useRouter();

export default defineComponent({
  name: "App",
  components: {
    IonPage,
    IonContent,
    // IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonSpinner,
    IonItem,
    IonGrid,
    IonCol,
    IonRow,
    PlayCircleIcon,
    PauseCircleIcon,
    IonLabel,
    IonText,
    IonBadge,
    IonModal,
    IonButton,
    IonTitle,
    // PlayCircleIcon,
    // PauseCircleIcon,
    // FastForward30Icon,
    // Rewind30Icon,
    // CardsHeartOutlineIcon,
    // AccountVoiceIcon
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
      presentingElement: null,
      overlay: "",
      overlayInterval: null,
      overlayTimer: 10000,
    };
  },

  mounted: function () {
    this.presentingElement = this.$refs.page.$el;
    document.getElementById("open-modal").click();
    this.getUrlQueryParams();
    this.changeSong();
    this.audio.loop = false;
    // this.audio.addEventListener("waiting", this.handleWaiting);
    // this.audio.addEventListener("playing", this.handlePlaying);
    clearInterval(this.overlayInterval);
  },

  methods: {
    hapticsImpactLight: async () => {
      await Haptics.impact({ style: ImpactStyle.Light });
    },

    presentActionSheet: async function () {
      const actionSheet = await actionSheetController.create({
        header: "Mark as complete for progress?",
        // subHeader: 'Example subheader',
        buttons: [
          {
            text: "Yes",
            // role: 'destructive',
            handler: () => {
              // console.log(this.$route)
              this.$router.go(-1);
              this.$refs.modal.$el.dismiss();
              this.stopAudio();
            },
          },
          {
            text: "No",
            handler: () => {
              this.$router.go(-1);
              this.$refs.modal.$el.dismiss();
              this.stopAudio();
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
          },
        ],
      });

      await actionSheet.present();
      const res = await actionSheet.onDidDismiss();
    },

    getUrlQueryParams: async function () {
      await this.$router.isReady();
      this.params = this.$route;
      this.dataLoaded = true;
      this.title = this.dataList.filter(
        (item) => item.title === this.$route.params.title
      )[0].title;
      console.log(this.title);
      console.log(this.dataList.filter((item) => item.title === this.title)[0].id);
      this.index = this.dataList.findIndex((item) => item.title === this.title);
      this.currentAudio = this.index;
      console.log(this.dataList.findIndex((item) => item.title === this.title));
    },

    handleWaiting: function () {
      this.audioBuffering = true;
      clearInterval(this.overlayInterval);
      console.log("handleWaiting activated");
    },

    handlePlaying: function () {
      this.currentlyPlaying = true;
      clearInterval(this.overlayInterval);
      this.audioBuffering = false;
      this.overlayInterval = setInterval(() => {
        this.overlay = "block";
      }, this.overlayTimer);
      console.log("handlePlaying activated");
    },

    skipTrack: function () {
      clearInterval(this.overlayInterval);
      this.hapticsImpactLight();
      this.audio.currentTime = this.value;
      if (this.currentlyPlaying == true) {
        this.overlayInterval = setInterval(() => {
          this.overlay = "block";
        }, this.overlayTimer);
      }
      console.log("skipTrack activated");
    },

    togglePlaylist: function () {
      this.isPlaylistActive = !this.isPlaylistActive;
    },

    nextSong: function () {
      this.hapticsImpactLight();
      this.stopAudio();
      if (this.currentAudio < this.dataList.length - 1) {
        this.changeSong(this.currentAudio + 1);
        this.value = 0;
        this.currentTime = 0;
      }
      clearInterval(this.overlayInterval);
    },

    prevSong: function () {
      this.hapticsImpactLight();
      this.stopAudio();
      if (this.currentAudio > 0) {
        this.changeSong(this.currentAudio - 1);
        this.value = 0;
        this.currentTime = 0;
      }
      clearInterval(this.overlayInterval);
    },

    prevSkip: function () {
      clearInterval(this.overlayInterval);
      if (this.currentlyPlaying == true) {
        this.overlayInterval = setInterval(() => {
          this.overlay = "block";
        }, this.overlayTimer);
      }
      this.hapticsImpactLight();
      this.value -= 30;
      this.audio.currentTime = this.value;
      if (this.audio.currentTime < 0) {
        this.audio.currentTime = 0;
        this.value = 0;
      }
    },

    nextSkip: function () {
      clearInterval(this.overlayInterval);
      if (this.currentlyPlaying == true) {
        this.overlayInterval = setInterval(() => {
          this.overlay = "block";
        }, this.overlayTimer);
      }
      this.hapticsImpactLight();
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

      this.title = this.dataList.filter(
        (item) => item.title === this.$route.params.title
      )[0].title;

      this.index = this.dataList.findIndex((item) => item.title === this.title);
      this.currentAudio = this.index;

      if (index !== undefined) {
        this.stopAudio();
        this.currentAudio = index;
      }

      this.audioFile = this.dataList[this.currentAudio].mediaUrl;
      this.audio = new Audio(this.audioFile);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function () {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
      if (wasPlaying) {
        this.playAudio();
      }
      this.audio.addEventListener("waiting", this.handleWaiting);
      this.audio.addEventListener("playing", this.handlePlaying);
    },

    iscurrentAudio: function (index) {
      if (this.currentAudio == index) {
        return true;
      }
      return false;
    },
    getcurrentAudio: function (currentAudio) {
      return this.dataList[currentAudio].url;
    },
    playAudio: function () {
      this.hapticsImpactLight();
      if (
        this.currentlyStopped == true &&
        this.currentAudio + 1 == this.dataList.length
      ) {
        this.currentAudio = 0;
        this.changeSong();
      }
      if (!this.currentlyPlaying) {
        this.getCurrentTimeEverySecond(true);
        this.currentlyPlaying = true;
        // this.changeSong();
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
      clearInterval(this.overlayInterval);
    },

    handleEnded: function () {
      this.audioBuffering = false;
      clearInterval(this.overlayInterval);
      if (this.currentAudio + 1 == this.dataList.length) {
        this.stopAudio();
        this.currentlyPlaying = false;
        this.currentlyStopped = true;
        this.value = 0;
        this.audioBuffering = false;
        this.currentTime = 0;
      } else {
        this.currentlyPlaying = false;
        // this.currentAudio++;
        // this.changeSong();
        // this.playAudio();
        this.stopAudio();
        this.currentlyPlaying = false;
        this.currentlyStopped = true;
        this.value = 0;
        this.audioBuffering = false;
        this.currentTime = 0;
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
    trackDurationRemaining() {
      let timeRemaining = this.trackDuration - this.currentTime;
      if (
        timeRemaining < 0 ||
        this.currentTime < 0 ||
        timeRemaining == this.trackDuration
      )
        timeRemaining = 0;
      return this.fancyTimeFormat(timeRemaining);
    },
  },
  watch: {
    currentTime: function () {
      this.currentTime = Math.round(this.currentTime);
      this.trackDuration = Math.round(this.trackDuration);
      this.value = this.currentTime;
      if (this.currentTime >= this.trackDuration) {
        this.stopAudio();
        this.value = 0;
        this.currentTimeFormated = 0;
      }
      if (this.trackDuration - this.currentTime <= 1) {
        setTimeout(() => {
          this.overlay = "none";
        }, 1100);
      }
    },

    value: function () {
      this.currentTime = this.value;
    },
  },

  beforeUnmount: function () {
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("loadedmetadata", this.handleEnded);
    clearInterval(this.overlayInterval);
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

  margin-top: 2px;
}

ion-grid {
  height: 100%;
}

.first-row-grid-1 {
  min-height: 40%;
}

img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 5px;
  /* filter: brightness(70%); */
  margin-top: 20px;
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
    /* filter: brightness(70%); */
  }
}

.albumImage {
  position: relative;
}

ion-badge {
  position: absolute;
  top: 55%;
  left: 50%;
  z-index: 10;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

input {
  z-index: 10;
}

code {
  white-space: pre-wrap;
}

@media only screen and (min-width: 600px) {
  ion-modal {
    --height: 80%;
  }
}
#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000d2;
  z-index: 100;
  cursor: pointer;
}

#text {
  position: absolute;
  top: 20%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

@media only screen and (max-width: 600px) {
  #text {
    top: 18%;
  }
}
</style>
