<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <!-- <ion-title>App</ion-title> -->
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div id="open-modal" />

      <ion-modal
        backdropDismiss="false"
        ref="modal"
        trigger="open-modal"
        :presenting-element="presentingElement"
      >
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <h2 style="color: white">Player</h2>
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
        <ion-content class="ion-padding">
          <ion-grid class="audioPlayerUI ion-margin-start ion-margin-end">
            <ion-row
              class="ion-align-items-center ion-justify-content-center first-row-grid-1 ion-margin-bottom"
            >
              <ion-col class="ion-align-self-center">
                <div class="albumImage">
                  <div
                    id="container"
                    :class="dataObj.container"
                    :style="{
                      'animation-duration': dataObj.animationDurationBreathe,
                    }"
                  >
                    <div class="circle"></div>
                    <div>
                      <h1 class="counter text">
                        {{ dataObj.breathCounter + 1 }}
                      </h1>
                    </div>
                    <ion-label>
                      <ion-text class="text">
                        <p id="text" style="font: 12px">{{ dataObj.text }}</p>
                      </ion-text>
                    </ion-label>
                    <div
                      class="pointer-container"
                      :style="{
                        'animation-duration': dataObj.animationDurationTotal,
                      }"
                    >
                      <span class="pointer"></span>
                    </div>
                    <div class="gradient-circle"></div>
                  </div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-content>
      </ion-modal>
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
  IonModal,
  IonButton,
  IonTitle,
  actionSheetController,
} from "@ionic/vue";

import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
let presentingElement = ref(null);

const router = useRouter();
const totalTime = 12000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
const animationDurationTotal = `${totalTime / 1000}s`;
const animationDurationBreathe = `${(totalTime / 1000 / 5) * 2}s`;
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
  closeClicked: false,
  animationDurationBreathe: animationDurationBreathe,
  animationDurationTotal: animationDurationTotal,
});

onMounted(() => {
  dataObj.closeClicked = false;
  presentingElement.value = page.value.$el;
  document.getElementById("open-modal").click();
  openBreathPlayer();
});

const openBreathPlayer = function () {
  audioBreatheSrc = require("@/assets/audio/bowl.mp3");
  audioBgSrc = require("@/assets/audio/rain-and-thunder.mp3");
  audioClockSrc = require("@/assets/audio/clock.mp3");
  breathAnimation();
  breathCycles(100);
  dataObj.audioBg = new Audio(audioBgSrc);
  dataObj.audioBg.play();
  dataObj.audioBg.loop = true;
  presentingElement.value = page.value.$el;
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
};

const breathCycles = function (limit) {
  dataObj.breathCounter = 0;
  dataObj.setIntervalRef = setInterval(() => {
    breathAnimation();
    console.log("Breath cycle-" + ++dataObj.breathCounter);
    if (dataObj.breathCounter == limit) clearInterval(dataObj.setIntervalRef);
  }, totalTime);
};

const presentActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: "Mark as complete for progress?",
    // subHeader: 'Example subheader',
    buttons: [
      {
        text: "Yes",
        // role: 'destructive',
        handler: () => {
          dataObj.audioBg.pause();
          dataObj.audioBreathe.pause();
          audioBreatheSrc = "";
          audioClockSrc = "";
          audioBgSrc = "";
          clearInterval(dataObj.setIntervalRef);
          dataObj.closeClicked = false;
          modal.value.$el.dismiss();
          router.go(-1);
        },
      },
      {
        text: "No",
        handler: () => {
          dataObj.audioBg.pause();
          dataObj.audioBreathe.pause();
          audioBreatheSrc = "";
          audioClockSrc = "";
          audioBgSrc = "";
          clearInterval(dataObj.setIntervalRef);
          dataObj.closeClicked = false;
          modal.value.$el.dismiss();
          router.go(-1);
        },
      },
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          dataObj.closeClicked = false;
        },
      },
    ],
  });

  await actionSheet.present();
  const res = await actionSheet.onDidDismiss();
};
</script>

/********************************** CSS ***********************************/

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
  min-height: 40%;
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

@media only screen and (max-width: 600px) {
  img {
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 5px;
    z-index: 10;
    filter: brightness(70%);
  }
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
  background: conic-gradient(
    var(--ion-color-secondary) 0%,
    var(--ion-color-secondary-shade) 40%,
    var(--ion-color-medium) 40%,
    var(--ion-color-medium) 60%,
    var(--ion-color-secondary) 60%,
    var(--ion-color-secondary-shade) 100%
  );
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

ion-grid {
  height: 100%;
}

.counter {
  font-weight: 700;
}

.container.grow {
  /* animation: grow 3s linear forwards; */
  animation: grow linear forwards;
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

code {
  white-space: pre-wrap;
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
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes grow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(2);
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
