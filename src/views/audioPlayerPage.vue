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

        <ion-grid>
          <ion-row class="ion-align-items-center ion-justify-content-center">
            <ion-col>
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
                <ion-item lines="none" class="header">
                  <ion-label class="ion-text-wrap">
                    <ion-text style="font-size: x-large; color: white">{{
                      dataList[currentAudio].title
                    }}</ion-text>
                    <p
                      style="
                        text-transform: uppercase;
                        color: white;
                        margin-top: 20px;
                        font-family: Brandon-regular;
                      "
                    >
                      {{ dataList[currentAudio].type }}
                    </p>
                  </ion-label>
                </ion-item>
              </div>
            </ion-col>
          </ion-row>
          <ion-row
            class="ion-align-items-center ion-justify-content-center ion-margin"
            style="margin-top: 0px"
          >
            <ion-col size-sm="8">
              <ion-item lines="none">
                <ion-label slot="start">
                  <p style="text-transform: uppercase; font-family: Brandon-regular">
                    {{ currentTimeFormated }}
                  </p>
                </ion-label>
                <ion-label slot="end">
                  <p style="text-transform: uppercase; font-family: Brandon-regular">
                    {{ trackDurationFormated }}
                  </p>
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
                <a class="button" v-on:click="prevSkip()">
                  <rewind30-icon :size="50" />
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
                  <fast-forward30-icon :size="50" />
                </a>
              </div>
              <div class="buttons-container">
                <a class="button">
                  <!-- <account-voice-icon :size="40" /> -->
                  <ion-avatar>
                    <img
                      alt="Silhouette of a person's head"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=20"
                      style="width: 50px; height: 50px; border-radius: 50%"
                    />
                  </ion-avatar>
                </a>
                <a class="button" title="Next Song" slot="end" style="margin-top: 10px">
                  <cards-heart-outline-icon :size="40" />
                </a>
                <!-- <div
                  id="overlay"
                  v-on:click="overlay = 'none'"
                  :style="{ display: overlay }"
                >
                  <div id="text">
                    {{ trackDurationRemaining }}
                  </div>
                </div> -->
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
  IonAvatar,
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
    IonLabel,
    // IonText,
    IonBadge,
    IonModal,
    IonButton,
    IonTitle,
    IonText,
    IonAvatar,
    PlayCircleIcon,
    PauseCircleIcon,
    FastForward30Icon,
    Rewind30Icon,
    CardsHeartOutlineIcon,
    // AccountVoiceIcon,
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

    // on: function () {
    //   this.overlay = "block";
    // },

    // off: function () {
    //   this.overlay = "none";
    // },

    presentActionSheet: async function () {
      this.hapticsImpactLight();
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
    },

    handlePlaying: function () {
      this.currentlyPlaying = true;
      clearInterval(this.overlayInterval);
      this.audioBuffering = false;
      this.overlayInterval = setInterval(() => {
        this.overlay = "block";
      }, this.overlayTimer);
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
    },

    togglePlaylist: function () {
      this.isPlaylistActive = !this.isPlaylistActive;
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
        this.audio.play();
        setTimeout(() => {
          this.stopAudio();
        }, 100);
      }
    },

    changeSong: function () {
      clearInterval(this.overlayInterval);
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
      return this.dataList[currentAudio].mediaUrl;
    },
    playAudio: function () {
      this.hapticsImpactLight();
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
      clearInterval(this.overlayInterval);
    },
    handleEnded: function () {
      this.stopAudio();
      this.value = 0;
      this.audioBuffering = false;
      clearInterval(this.overlayInterval);
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
      this.value = this.currentTime;
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
  /* opacity: 0.95; */
  transform: scale(0.99);
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
  margin-bottom: 20px;
}

ion-grid {
  height: 80%;
}

/* .first-row-grid-1 {
  min-height: 40%;
} */

img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 5px;
  /* filter: brightness(70%); */
}

ion-label {
  margin: 0;
  z-index: 100;
}

ion-grid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    height: 300px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 5px;
    z-index: 10;
    /* filter: brightness(70%); */
  }
}

ion-badge {
  position: absolute;
  top: 50%;
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
  top: 25%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

@media only screen and (max-width: 600px) {
  #text {
    top: 20%;
  }
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000bc;
  padding: 20px;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  width: 100%;
}

input {
  margin-bottom: 20px;
}
</style>
