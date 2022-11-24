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

    <ion-content :fullscreen="true">
      <!-- <ion-spinner v-if="loading"></ion-spinner> -->
      <div class="audioPlayer">
        <div class="audioPlayerUI" :class="{ isDisabled: isPlaylistActive }">
          <div class="audioAlbumSize">
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
              <div class="loader" :key="currentSong">Loading...</div>
            </div>
            <div class="albumDetails">
              <transition name="slide-fade" mode="out-in">
                <p class="title" :key="currentSong">
                  {{ musicPlaylist[currentSong].title }}
                </p>
              </transition>
              <transition name="slide-fade" mode="out-in">
                <p class="artist" :key="currentSong">
                  {{ musicPlaylist[currentSong].artist }}
                </p>
              </transition>
            </div>
          </div>

          <div class="playerButtons">
            <div class="currentTimeContainer" style="text-align: center">
              <span class="currentTime">{{ currentTimeFormated }}</span>
              <span class="totalTime"> {{ trackDurationFormated }}</span>
            </div>
            <div class="track-skipper">
              <input
                v-model="value"
                type="range"
                @input="mSet"
                min="0"
                step="1"
                :max="trackDuration"
                ref="input"
                style="width: 100%"
              />
            </div>
            <a
              class="button"
              :class="{ isDisabled: currentSong == 0 }"
              v-on:click="prevSong()"
              title="Previous Song"
            >
              <svg style="width: 50px; height: 50px" viewBox="0 0 24 24">
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
                  <play-circle-icon :size="80" v-show="!currentlyPlaying" />

                  <pause-circle-icon :size="80" v-show="currentlyPlaying" />
                </div>
              </transition>
            </a>
            <a
              class="button"
              :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
              v-on:click="nextSong()"
              title="Next Song"
            >
              <svg style="width: 50px; height: 50px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z"
                />
              </svg>
            </a>

            <a
              class="button"
              :class="{ isDisabled: currentSong == 0 }"
              v-on:click="prevSong()"
              title="Previous Song"
            >
              <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3Z"
                />
              </svg>
            </a>
            <a
              class="button"
              :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
              v-on:click="nextSong()"
              title="Next Song"
            >
              <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                />
              </svg>
            </a>
            <a
              class="button"
              :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
              v-on:click="nextSong()"
              title="Next Song"
            >
              <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11.5,3C6.85,3 2.92,6.03 1.53,10.22L3.9,11C4.95,7.81 7.96,5.5 11.5,5.5C13.46,5.5 15.23,6.22 16.62,7.38L14,10H21V3L18.4,5.6C16.55,4 14.15,3 11.5,3M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
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
} from "@ionic/vue";

import { defineComponent } from "vue";

import PlayCircleIcon from "vue-material-design-icons/PlayCircle.vue";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle.vue";

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
    PlayCircleIcon,
    PauseCircleIcon,
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
          image: "https://source.unsplash.com/crs2vlkSe98/400x400",
        },
        {
          title: "Meadowlark",
          artist: "Daniel Simion",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          image: "https://source.unsplash.com/35bE_njbG9E/400x400",
        },
        {
          title: "Hyena Laughing",
          artist: "Daniel Simion",
          url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          image: "https://source.unsplash.com/Esax9RaEl2I/400x400",
        },
        {
          title: "Creepy Background",
          artist: "Daniel Simion",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          image: "https://source.unsplash.com/BjNXpLGnJI0/400x400",
        },
      ],
      audioFile: "",
      // loading: false,
    };
  },

  mounted: function () {
    this.changeSong();
    this.audio.loop = false;
  },

  // mounted: function () {
  //     this.changeSong();
  //     this.audio.loop = false;
  //     this.audio.preload = "metadata";

  //     this.audio.play();
  //     setTimeout(() => {
  //       this.audio.pause();
  //     }, "10");

  //     this.loading = true;
  //     setTimeout(() => {
  //       this.loading = false;
  //     }, "5000");
  //   },

  methods: {
    mSet: function () {
      this.audio.currentTime = this.value;
    },
    togglePlaylist: function () {
      this.isPlaylistActive = !this.isPlaylistActive;
    },
    nextSong: function () {
      if (this.currentSong < this.musicPlaylist.length - 1) {
        this.changeSong(this.currentSong + 1);
        this.value = 0;
        this.currentTime = 0;
      }
    },

    //     nextSong: function () {
    //   this.audio.pause();
    //   if (this.currentSong < this.musicPlaylist.length - 1) {
    //     this.changeSong(this.currentSong + 1);
    //     this.value = 0;
    //     this.currentTime = 0;
    //     this.audio.preload = "metadata";

    //     this.audio.play();
    //     setTimeout(() => {
    //       this.audio.pause();
    //     }, "10");
    //     this.currentlyPlaying = false;
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //     }, "5000");
    //   }
    // },

    prevSong: function () {
      if (this.currentSong > 0) {
        this.changeSong(this.currentSong - 1);
        this.value = 0;
        this.currentTime = 0;
      }
    },

    //     prevSong: function () {
    //   this.audio.pause();
    //   if (this.currentSong > 0) {
    //     this.changeSong(this.currentSong - 1);
    //     this.value = 0;
    //     this.currentTime = 0;

    //     this.audio.preload = "metadata";

    //     this.audio.play();
    //     setTimeout(() => {
    //       this.audio.pause();
    //     }, "10");
    //     this.currentlyPlaying = false;
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //     }, "5000");
    //   }
    // },

    changeSong: function (index) {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;
      if (index !== undefined) {
        this.stopAudio();
        this.currentSong = index;
      }
      this.audioFile = this.musicPlaylist[this.currentSong].url;
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
      return this.musicPlaylist[currentSong].url;
    },
    playAudio: function () {
      if (
        this.currentlyStopped == true &&
        this.currentSong + 1 == this.musicPlaylist.length
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
      if (this.currentSong + 1 == this.musicPlaylist.length) {
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
.audioPlayer {
  position: relative;
  /* background-color: #eceff1; */
  min-height: 25rem;
  /* width: 20rem; */
  overflow: hidden;
  padding: 1.5rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  /* box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); */
  /* user-select: none; */
}

.audioPlayer .title {
  /* color: rgba(0, 0, 0, 1); */
  color: var(--ion-text-color);
  font-size: 1rem;
  /* margin-bottom: 0.75rem; */
}
.audioPlayer .artist {
  /* color: rgba(0, 0, 0, 0.5); */
  color: var(--ion-text-color);
  font-size: 0.8rem;
}

.audioPlayer .audioPlayerUI {
  /* margin-top: 1.5rem; */
  will-change: transform, filter;
  transition: 0.5s;
}
.audioPlayer .audioPlayerUI.isDisabled {
  transform: scale(0.75) translateX(100%);
  filter: blur(5px) grayscale(100%);
}
.audioPlayer .audioPlayerUI .albumDetails {
  /* text-align: center; */
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.audioPlayer .audioPlayerUI .albumDetails p {
  margin: 0px;
}
.audioPlayer .audioPlayerUI .albumDetails p.title {
  font-size: 1rem;
  /* color: rgba(0, 0, 0, 1); */
  color: var(--ion-text-color);
}
.audioPlayer .audioPlayerUI .albumDetails p.artist {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: none;
  /* color: rgba(0, 0, 0, 0.75); */
  color: var(--ion-text-color);
  transition-delay: 100ms;
}
.audioPlayer .audioPlayerUI .albumImage {
  width: 20rem;
  height: 12rem;
  overflow: hidden;
  margin: 0 auto;
}
.audioPlayer .audioPlayerUI .albumImage img {
  width: 100%;
  height: 100%;
  z-index: 10;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 0.5rem;
}
.audioPlayer .audioPlayerUI .playerButtons {
  position: relative;
  margin: 0 auto;
  text-align: center;
}
.audioPlayer .audioPlayerUI .playerButtons .button {
  font-size: 2rem;
  display: inline-block;
  vertical-align: middle;
  padding: 0.5rem;
  margin: 0 0.25rem;
  /* color: rgba(0, 0, 0, 0.75); */
  /* --color:--ion-text-color */
  color: var(--ion-color-dark);
  border-radius: 50%;
  outline: 0;
  text-decoration: none;
  cursor: pointer;
  transition: 0.5s;
}
.audioPlayer .audioPlayerUI .playerButtons .button.play {
  font-size: 4rem;
  margin: 0 1.5rem;
}
.audioPlayer .audioPlayerUI .playerButtons .button:active {
  opacity: 0.75;
  transform: scale(0.75);
}
.audioPlayer .audioPlayerUI .playerButtons .button.isDisabled {
  /* color: rgba(0, 0, 0, 0.2); */
  color: var(--ion-color-light-shade);
  cursor: initial;
}
.audioPlayer .audioPlayerUI .playerButtons .button.isDisabled:active {
  transform: none;
}
.audioPlayer .audioPlayerUI .currentTimeContainer {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.audioPlayer .audioPlayerUI .currentTimeContainer .currentTime,
.audioPlayer .audioPlayerUI .currentTimeContainer .totalTime {
  /* font-size: 0.5rem;
  font-family: monospace; */
  /* color: rgba(0, 0, 0, 0.75); */
  color: var(--ion-color-dark);
  /* padding-bottom: 10px; */
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
}
</style>
