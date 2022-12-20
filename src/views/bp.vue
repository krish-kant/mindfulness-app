<template>
    <ion-page ref="page">
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <!-- <ion-item lines="none"> -->
                <ion-buttons>
                    <ion-back-button defaultHref="/tabs/home"></ion-back-button>
                </ion-buttons>
                <ion-item lines="none">
                    <ion-segment value="default" mode="ios">
                        <ion-segment-button :value="!switchGuided ? 'default' : ''" @click="switchGuided = false">
                            <ion-label>Player</ion-label>
                        </ion-segment-button>
                        <ion-segment-button :value="switchGuided ? 'default' : ''" @click="switchGuided = true">
                            <ion-label>Guided</ion-label>
                        </ion-segment-button>
                    </ion-segment>
                </ion-item>


                <!-- </ion-item> -->

            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-button id="open-modal" @click="openBreathPlayer" v-show="!switchGuided" style="width:30%; margin:auto">
                Open
            </ion-button>

            <ion-modal ref="modal" trigger="open-modal" :presenting-element="presentingElement">
                <ion-header>
                    <ion-toolbar>

                        <ion-buttons slot="end">
                            <ion-button @click="dismiss()">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">


                    <ion-grid class="audioPlayerUI ion-margin-start ion-margin-end" v-show="!switchGuided">


                        <ion-row
                            class="ion-align-items-center ion-justify-content-center first-row-grid-1 ion-margin-bottom">
                            <ion-col size-lg="8">

                                <div class="albumImage">
                                    <!-- <img @load="onImageLoaded()" :src="dataList[currentAudio].imageUrl" :key="currentAudio"
                                                ondragstart="return false;" id="playerAlbumArt" /> -->

                                    <div>
                                        <div id="container" class="container"
                                            :class="currentlyPlaying ? container : container"
                                            :style="{ 'animation-duration': animationDurationBreathe }">
                                            <div class=" circle"></div>
                                            <div>
                                                <h1 class="counter text">{{ breathCounter + 1 }}</h1>
                                            </div>
                                            <ion-label>
                                                <ion-text class="text">

                                                    <p id="text" style="font: 12px ">{{ text }}</p>
                                                </ion-text>
                                            </ion-label>

                                            <div class="pointer-container"
                                                :style="{ 'animation-duration': animationDurationTotal }">
                                                <span class="pointer"></span>
                                            </div>

                                            <div class="gradient-circle"></div>
                                        </div>

                                    </div>
                                </div>



                            </ion-col>
                        </ion-row>

                        <ion-row class="ion-align-items-center ion-justify-content-center" v-if="!closeClicked">
                            <ion-col size-sm="8" size-lg="6">
                                <ion-item lines="none">
                                    <ion-label slot="start">
                                        <p>{{ currentTimeFormated }}</p>
                                    </ion-label>
                                    <ion-label slot="end">
                                        <p>{{ trackDurationFormated }}</p>
                                    </ion-label>
                                </ion-item>
                                <progress :value="value" type="range" @input="skipTrack" min="0" step="1"
                                    :max="trackDuration" ref="input" style="width: 100%" />
                                <div class="buttons-container">
                                    <a class="button" v-on:click="prevSkip()">
                                        <rewind30-icon :size="40" />
                                    </a>
                                    <a class="button play" v-on:click="playAudio()" title="Play/Pause Song">

                                        <div>
                                            <play-circle-icon :size="90" v-show="!currentlyPlaying" />

                                            <pause-circle-icon :size="90" v-show="currentlyPlaying" />
                                        </div>

                                    </a>

                                    <a class="button" v-on:click="nextSkip()">
                                        <fast-forward30-icon :size="40" />
                                    </a>
                                </div>
                                <div class="buttons-container loading-container">
                                    <!-- <a class="button">
                                        <account-voice-icon :size="40" />
                                    </a> -->
                                    <ion-badge color="medium">
                                        <ion-spinner v-if="audioBuffering"></ion-spinner>
                                    </ion-badge>
                                    <!-- <a class="button" title="Next Song" slot="end">
                                        <cards-heart-outline-icon :size="40" />
                                    </a> -->
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row v-if="closeClicked">
                            <ion-col>
                                <div style="display:flex; flex-direction:column; justify-content: center;">
                                    <ion-button color="success" size="Default" @click="markComplete">
                                        <ion-text class="text">Mark Complete</ion-text>
                                    </ion-button>
                                    <ion-button color="secondary" size="Default" @click="dontMarkComplete">
                                        <ion-text class="text">Don't Mark
                                            Complete</ion-text>
                                    </ion-button>
                                    <ion-button color="medium" sixe="Default" @click="ignoreCancel"
                                        style="margin-top:20px">
                                        <ion-text class="text">Dismiss</ion-text>
                                    </ion-button>

                                </div>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-content>
            </ion-modal>


            <!-- <ion-item button detail="true" v-for="rec in bookmarks" :key="rec.title" @click="
                () => {
            
                    router.push(`/tabs/item-details/${rec.title}`);
            
                }
            " v-show="switchGuided">


                <ion-thumbnail slot="start"
                    style="height:80px; width:80px; margin-left:5px; margin-right:5px;margin-top:10px; ">
                    <img alt="Silhouette of mountains" :src="rec.imageUrl" />
                </ion-thumbnail>

                <ion-label>
                    <h3>{{ rec.title }}</h3>
                    <p>{{ rec.title }}</p>
                </ion-label>

            </ion-item> -->
            <TilePlay :musicPlaylist="dataList" />
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
    IonSegment,
    IonSegmentButton,
    // IonThumbnail,
    IonModal,
    IonButton,
} from "@ionic/vue";

import { defineComponent } from "vue";

import PlayCircleIcon from "vue-material-design-icons/PlayCircle.vue";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle.vue";

import CardsHeartOutlineIcon from "vue-material-design-icons/CardsHeartOutline.vue";
import AccountVoiceIcon from "vue-material-design-icons/AccountVoice.vue";
import FastForward30Icon from "vue-material-design-icons/FastForward30.vue";
import Rewind30Icon from "vue-material-design-icons/Rewind30.vue";

import TilePlay from "@/components/TilePlay.vue";
import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";

import { useBookmarksStore } from "@/stores/bookmarks";


const { bookmarks } = useBookmarksStore();

const { dataList } = useDataStore();

const totalTime = 12000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
const animationDurationTotal = `${totalTime / 1000}s`;
const animationDurationBreathe = `${((totalTime / 1000) / 5) * 2}s`;


const audioBreatheSrc = require("@/assets/audio/bowl.mp3");
const audioClockSrc = require("@/assets/audio/clock.mp3");
const audioBgSrc = require("@/assets/audio/rain-and-thunder.mp3");



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
        IonSegment,
        IonSegmentButton,
        // IonThumbnail,
        IonModal,
        IonButton,
        PlayCircleIcon,
        PauseCircleIcon,
        FastForward30Icon,
        Rewind30Icon,
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
            dataList: dataList,
            title: "",
            audioBuffering: false,
            params: "",
            totalTime: totalTime,
            breatheTime: breatheTime,
            holdTime: holdTime,
            text: "",
            container: "",
            breatheInterval: "",
            animationDurationTotal: animationDurationTotal,
            animationDurationBreathe: animationDurationBreathe,
            audioBreathe: "",
            audioBg: "",
            audioBreatheSrc: audioBreatheSrc,
            audioClockSrc: audioClockSrc,
            audioBgSrc: audioBgSrc,
            setIntervalRef: "",
            breathCounter: 0,
            switchGuided: false,
            bookmarks: bookmarks,
            presentingElement: null,
            closeClicked: false,


        };
    },

    mounted: function () {

        this.changeSong();
        this.audio.loop = false;
        this.audio.addEventListener("waiting", this.handleWaiting);
        this.audio.addEventListener("playing", this.handlePlaying);
        this.closeClicked = false;


    },

    methods: {

        openBreathPlayer: function () {
            this.audioBreatheSrc = require("@/assets/audio/bowl.mp3");
            this.audioBgSrc = require("@/assets/audio/rain-and-thunder.mp3");
            this.audioClockSrc = require("@/assets/audio/clock.mp3");
            this.breathAnimation()
            this.longForLoop(600);
            this.audioBg = new Audio(this.audioBgSrc);
            this.audioBg.play();
            this.audioBg.loop = true;
            this.presentingElement = this.$refs.page.$el;

        },

        dismiss() {
            // alert("Do you want to stop the current song?");
            // this.stopAudio();
            // this.audioBg.pause();
            // this.audioBreathe.pause();
            // this.audioBreatheSrc = ''
            // this.audioClockSrc = ''
            // this.audioBgSrc = ''
            // clearInterval(this.setIntervalRef)
            // this.$refs.modal.$el.dismiss();
            this.closeClicked = true;
        },
        markComplete: function () {
            this.stopAudio();
            this.audioBg.pause();
            this.audioBreathe.pause();
            this.audioBreatheSrc = ''
            this.audioClockSrc = ''
            this.audioBgSrc = ''
            clearInterval(this.setIntervalRef)
            this.closeClicked = false;
            this.$refs.modal.$el.dismiss();
        },

        dontMarkComplete: function () {
            this.stopAudio();
            this.audioBg.pause();
            this.audioBreathe.pause();
            this.audioBreatheSrc = ''
            this.audioClockSrc = ''
            this.audioBgSrc = ''
            clearInterval(this.setIntervalRef)
            this.closeClicked = false;
            this.$refs.modal.$el.dismiss();
        },

        ignoreCancel: function () {
            this.closeClicked = false;
        },

        shareLink: async function () {
            await Share.share({
                title: "Hey! Check this out on Moby.",
                text: this.dataList[this.currentAudio].title,
                url: window.location.href,
                dialogTitle: "Share with buddies",
            });
        },
        breathAnimation: function () {
            this.text = "Breathe In!";
            this.container = "container grow";
            this.audioBreathe = new Audio(this.audioBreatheSrc);
            this.audioBreathe.play();

            setTimeout(() => {
                this.text = "Hold";
                this.audioBreathe = new Audio(this.audioClockSrc);
                this.audioBreathe.play();

                setTimeout(() => {
                    this.text = "Breathe Out!";
                    this.container = "container shrink";
                    this.audioBreathe = new Audio(this.audioBreatheSrc);
                    this.audioBreathe.play();
                }, this.holdTime);
            }, this.breatheTime);
        },

        longForLoop: function (limit) {
            this.breathCounter = 0;
            this.setIntervalRef = setInterval(() => {
                this.breathAnimation();
                console.log("This is a long for loop. We are at " + ++this.breathCounter);
                if (this.breathCounter == limit) clearInterval(this.setIntervalRef);
            }, this.totalTime);
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
            this.currentAudio = 0;

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
            // if (this.breatheInterval) { clearInterval(this.breatheInterval); }
            // if (this.currentlyPlaying) {
            //     this.breathAnimation
            //     this.breatheInterval = setInterval(this.breathAnimation, this.totalTime);
            // }
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

    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 5px;
    filter: brightness(70%);
}

ion-label {
    margin: 0;
}

/* ion-item {
    --padding-bottom: 0px;
    --padding-top: 0px;
    --padding-end: 0px;
    --padding-start: 0px;
    --inner-padding-start: 0px;
    --inner-padding-end: 0px;
    --inner-padding-bottom: 0px;
    --background: none;
    --inner-padding-top: 0px;
} */

@media only screen and (max-width: 600px) {
    img {

        object-fit: cover;
        object-position: 50% 50%;
        border-radius: 5px;
        z-index: 10;
        filter: brightness(70%);
    }
}




input {
    z-index: 10;
}

.heading {
    font-size: medium;
}


.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 130px;
    width: 130px;
    position: relative;
    transform: scale(1);
}

.circle {
    background-color: #1177b6;
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
            var(--ion-color-secondary-shade) 40%,
            var(--ion-color-medium) 40%,
            var(--ion-color-medium)60%,
            var(--ion-color-secondary) 60%,
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
    /* animation: rotate 7.5s linear forwards infinite; */
    animation: rotate linear forwards infinite;
    transform-origin: bottom center;
}

.text {
    color: #ffffff;

}

.counter {

    font-weight: 700;


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
    /* animation: grow 3s linear forwards; */
    animation: grow linear forwards;
}


ion-toolbar {
    position: relative;
}

ion-buttons {
    position: absolute;
    top: 0%;
    left: 0%;
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
    /* animation: shrink 3s linear forwards; */
    animation: shrink linear forwards;
}

ion-item {
    --padding-bottom: 0px;
    --padding-top: 0px;
    --padding-end: 5px;
    --padding-start: 5px;
    --inner-padding-start: 0px;
    --inner-padding-end: 0px;
    --inner-padding-bottom: 0px;
    --inner-padding-top: 0px;
    --background: none !important;
}

img {
    z-index: 10;
    object-fit: cover;
    object-position: 50% 50%;
    filter: brightness(70%);
}


@keyframes shrink {
    from {
        transform: scale(2);
    }

    to {
        transform: scale(1);
    }
}
</style>
