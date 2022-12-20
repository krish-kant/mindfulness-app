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
                        <ion-segment-button :value="!switchGuided ? 'default' : ''"
                            @click="dataObj.switchGuided = false">
                            <ion-label>Player</ion-label>
                        </ion-segment-button>
                        <ion-segment-button :value="switchGuided ? 'default' : ''" @click="dataObj.switchGuided = true">
                            <ion-label>Guided</ion-label>
                        </ion-segment-button>
                    </ion-segment>
                </ion-item>


                <!-- </ion-item> -->

            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-button id="open-modal" @click="openBreathPlayer" v-show="!dataObj.switchGuided"
                style="width:30%; margin:auto">
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


                    <ion-grid class="audioPlayerUI ion-margin-start ion-margin-end" v-show="!dataObj.switchGuided">


                        <ion-row
                            class="ion-align-items-center ion-justify-content-center first-row-grid-1 ion-margin-bottom">
                            <ion-col size-lg="8">

                                <div class="albumImage">
                                    <!-- <img @load="onImageLoaded()" :src="dataList[currentAudio].imageUrl" :key="currentAudio"
                                                ondragstart="return false;" id="playerAlbumArt" /> -->

                                    <div>
                                        <div id="container" :class="dataObj.container"
                                            :style="{ 'animation-duration': dataObj.animationDurationBreathe }">
                                            <div class=" circle"></div>
                                            <div>
                                                <h1 class="counter text">{{ dataObj.breathCounter + 1 }}</h1>
                                            </div>
                                            <ion-label>
                                                <ion-text class="text">

                                                    <p id="text" style="font: 12px ">{{ dataObj.text }}</p>
                                                </ion-text>
                                            </ion-label>

                                            <div class="pointer-container"
                                                :style="{ 'animation-duration': dataObj.animationDurationTotal }">
                                                <span class="pointer"></span>
                                            </div>

                                            <div class="gradient-circle"></div>
                                        </div>

                                    </div>
                                </div>



                            </ion-col>
                        </ion-row>



                        <div class="close-buttons" v-if="dataObj.closeClicked"
                            style="display:flex; flex-direction:column; justify-content: center;">
                            <ion-button color="success" size="Default" @click="markComplete">
                                <ion-text class="text">Mark Complete</ion-text>
                            </ion-button>
                            <ion-button color="secondary" size="Default" @click="dontMarkComplete">
                                <ion-text class="text">No</ion-text>
                            </ion-button>
                            <ion-button color="medium" sixe="Default" @click="ignoreCancel" style="margin-top:20px">
                                <ion-text class="text">Dismiss</ion-text>
                            </ion-button>

                        </div>

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
            <TilePlay :musicPlaylist="dataList" v-if=dataObj.switchGuided />
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

import { reactive, ref, onMounted } from "vue";
import TilePlay from "@/components/TilePlay.vue";
import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";

const { dataList } = useDataStore();

const totalTime = 12000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
const animationDurationTotal = `${totalTime / 1000}s`;
const animationDurationBreathe = `${((totalTime / 1000) / 5) * 2}s`;


let audioBreatheSrc = require("@/assets/audio/bowl.mp3");
let audioClockSrc = require("@/assets/audio/clock.mp3");
let audioBgSrc = require("@/assets/audio/rain-and-thunder.mp3");

const modal = ref(null);
const page = ref(null);

const dataObj = reactive({
    audio: "",
    container: "",
    breatheInterval: "",
    audioBreathe: "",
    audioBg: "",
    setIntervalRef: "",
    breathCounter: 0,
    switchGuided: false,
    presentingElement: null,
    closeClicked: false,
    animationDurationBreathe: animationDurationBreathe,
    animationDurationTotal: animationDurationTotal,

});

onMounted(() => {
    dataObj.closeClicked = false;
    dataObj.presentingElement = page.value.$el;

});

const openBreathPlayer = function () {
    audioBreatheSrc = require("@/assets/audio/bowl.mp3");
    audioBgSrc = require("@/assets/audio/rain-and-thunder.mp3");
    audioClockSrc = require("@/assets/audio/clock.mp3");
    breathAnimation()
    longForLoop(600);
    dataObj.audioBg = new Audio(audioBgSrc);
    dataObj.audioBg.play();
    dataObj.audioBg.loop = true;
    dataObj.presentingElement = page.value.$el;
};

const dismiss = function () {
    dataObj.closeClicked = true;
};

const markComplete = function () {
    dataObj.audioBg.pause();
    dataObj.audioBreathe.pause();
    audioBreatheSrc = ''
    audioClockSrc = ''
    audioBgSrc = ''
    clearInterval(dataObj.setIntervalRef)
    dataObj.closeClicked = false;
    modal.value.$el.dismiss();
};

const dontMarkComplete = function () {
    dataObj.audioBg.pause();
    dataObj.audioBreathe.pause();
    audioBreatheSrc = ''
    audioClockSrc = ''
    audioBgSrc = ''
    clearInterval(dataObj.setIntervalRef)
    dataObj.closeClicked = false;
    modal.value.$el.dismiss();
};

const ignoreCancel = function () {
    dataObj.closeClicked = false;
};

const shareLink = async function () {
    await Share.share({
        title: "Hey! Check this out on Moby.",
        text: this.dataList[this.currentAudio].title,
        url: window.location.href,
        dialogTitle: "Share with buddies",
    });
};

const breathAnimation = function () {
    dataObj.text = "Breathe In!";
    dataObj.container = "container grow";
    dataObj.audioBreathe = new Audio(audioBreatheSrc);
    dataObj.audioBreathe.play();

    setTimeout(() => {
        dataObj.text = "Hold";
        dataObj.audioBreathe = new Audio(audioClockSrc);
        dataObj.audioBreathe.play();

        setTimeout(() => {
            dataObj.text = "Breathe Out!";
            dataObj.container = "container shrink";
            dataObj.audioBreathe = new Audio(audioBreatheSrc);
            dataObj.audioBreathe.play();
        }, holdTime);
    }, breatheTime);
}

const longForLoop = function (limit) {
    dataObj.breathCounter = 0;
    dataObj.setIntervalRef = setInterval(() => {
        breathAnimation();
        console.log("This is a long for loop. We are at " + ++dataObj.breathCounter);
        if (dataObj.breathCounter == limit) clearInterval(dataObj.setIntervalRef);
    }, totalTime);
};




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

@media only screen and (min-width: 600px) {

    ion-modal {
        --height: 80%;
    }

    .close-buttons {
        margin-left: 50px;
        margin-right: 50px;

    }

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
