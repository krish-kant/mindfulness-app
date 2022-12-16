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
                            <transition name="ballmove" enter-active-class="animated zoomIn"
                                leave-active-class="animated fadeOutDown" mode="out-in" />

                            <!-- <img
                  @load="onImageLoaded()"
                  src="https://lottiefiles.com/11353-breathe"
                  :key="currentSong"
                  ondragstart="return false;"
                  id="playerAlbumArt"
                /> -->

                            <!-- <iframe
                class="iframe"
                src="https://embed.lottiefiles.com/animation/11353"
                frameborder="0"
              ></iframe> -->
                            <Lottie :options="defaultOptions" :height="400" :width="400" class="lottie-animation" />
                            <!-- <div class="loader" :key="currentSong">Loading...</div> -->
                        </div>
                        <!-- <ion-item lines="none">
              <ion-label class="ion-text-wrap">
                <ion-text class="heading">{{
                  dataList[currentSong].title
                }}</ion-text>
                <p>{{ dataList[currentSong].type }}</p>
              </ion-label>
            </ion-item> -->
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

                        <input v-model="value" type="range" @input="skipTrack" min="0" step="1" :max="trackDuration"
                            ref="input" style="width: 100%" />

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

<script setup>
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
    // IonText,
} from "@ionic/vue";

import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";

import PlayCircleIcon from "vue-material-design-icons/PlayCircle.vue";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle.vue";
import Lottie from "vue-lottie";
import * as animationData from "@/assets/pinjump.json";



import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";


const data = useDataStore();
const defaultOptions = { animationData: animationData };




let currentlyPlaying = ref(false);
let currentlyStopped = ref(false);
let currentTimeRef = ref(0);
let checkingCurrentPositionInTrack = ref("");
let trackDuration = ref(0);
let currentProgressBar = ref(0);

let currentSong = ref(0);

let value = ref(0);
let audioFile = data.dataList[1].mediaUrl;

let audio = new Audio(audioFile);




onMounted(() => {
    trackDuration.value = audio.duration;
    currentTimeRef.value = audio.currentTime;
    // audio.addEventListener("timeupdate", () => {
    //     currentTime.value = audio.currentTime;
    //     currentProgressBar.value = (currentTime.value / trackDuration.value) * 100;
    // });
    value.value = currentTimeRef.value;
    console.log("audio", audio);
    console.log("audioFile", audioFile);
    console.log("trackDuration", trackDuration.value);
    console.log("currentTime", currentTimeRef.value);


})

onBeforeUnmount(() => {
    audio.removeEventListener("ended", handleEnded);
    audio.removeEventListener("loadedmetadata", handleEnded);

    clearTimeout(checkingCurrentPositionInTrack);
});




const shareLink = async function () {
    await Share.share({
        title: "Hey! Check this out on Moby.",
        text: data.dataList[currentSong].title,
        url: window.location.href,
        dialogTitle: "Share with buddies",
    });
};

const skipTrack = function () {
    console.log(value.value)
    audio.currentTime = value.value;

};


const prevSkip = function () {
    value.value -= 30;
    audio.currentTime = value.value;
    if (audio.currentTime < 0) {
        audio.currentTime = 0;
        value.value = 0;
    }
};

const nextSkip = function () {
    value.value += 30;
    audio.currentTime = value.value;
    if (audio.currentTime >= audio.duration) {
        audio.currentTime = 0;
        value.value = 0;
        stopAudio();
    }
};



const playAudio = function () {
    if (!currentlyPlaying.value) {

        currentlyPlaying.value = true;
        audio.play();
    } else {
        stopAudio();
    }
    currentlyStopped.value = false;
};

const stopAudio = function () {
    audio.pause();
    currentlyPlaying.value = false;
    pausedMusic();
};

const handleEnded = function () {
    stopAudio();
    value.value = 0;
};


const pausedMusic = function () {
    clearTimeout(checkingCurrentPositionInTrack.value);
};

const fancyTimeFormat = function (s) {
    if (s < 0) s = 0;
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
};


const trackDurationFormated = computed({
    get() {
        return fancyTimeFormat(trackDuration.value)
    },
})

const currentTimeFormated = computed({
    get() {
        return fancyTimeFormat(currentTimeRef.value)
    },
})

watch(currentTimeRef => {

    // audio.currentTime = currentTimeRef.value;
})

watch(value => {
    // currentTime.value = value.value;
    // audio.currentTime = Math.round(value.value);
    console.log("value", value.value);
})
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

iframe {
    width: 100%;
    height: 320px;
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
    iframe {
        width: 100%;
        height: 250px;
    }

    .audioPlayerUI {
        /* margin-top: 1.5rem; */
        will-change: transform, filter;
        transition: 0.5s;
    }

    input {
        z-index: 10;
    }

    .heading {
        font-size: large;
    }

    .lottie-animation {
        padding-right: 80px;
        max-height: 250px;
    }
}
</style>
