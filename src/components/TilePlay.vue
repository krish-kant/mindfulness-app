<template>
  <ion-grid class="ion-margin-start ion-margin-end">
    <ion-row>
      <ion-col
        size="12"
        size-sm="6"
        size-lg="4"
        v-for="(items, index) in musicPlaylist"
        :key="items.title"
        class="container"
      >
        <div style="position: relative">
          <ion-img
            class="item-image"
            :src="musicPlaylist[index].imageUrl"
            :key="currentAudio"
            @ionImgDidLoad="ionImgDidLoad"
            @click="navigateTo(index)"
          />

          <div @click.stop="playAudioPreview(index)" class="play-item-bg">
            <div class="play-item">
              <svg
                style="width: 28px; height: 28px"
                viewBox="0 0 24 24"
                v-if="!isPlaying || index !== itemIndex"
              >
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
              <svg
                style="width: 24px; height: 24px"
                viewBox="0 0 24 24"
                v-if="isPlaying && index == itemIndex && !audioBuffering"
              >
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>

              <ion-spinner
                style="transform: scale(0.8); color: #ffffff"
                v-if="isPlaying && index == itemIndex && audioBuffering"
              >
              </ion-spinner>
            </div>
            <div
              style="font-size: x-small; font-family: Brandon-regular"
              class="play-item-preview"
              v-if="isPlaying && index == itemIndex"
            >
              preview
            </div>
          </div>
        </div>

        <ion-item lines="none">
          <ion-label class="ion-text-wrap">
            <p style="font-size: medium; font-family: Brandon-regular">
              {{ musicPlaylist[index].duration }}
            </p>
            <ion-text style="font-size: large">{{ musicPlaylist[index].title }}</ion-text>
          </ion-label>
          <svg
            style="width: 25px; height: 25px; cursor: pointer; color: gray"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"
            />
          </svg>
        </ion-item>
        <div class="spinner" v-if="!imgLoaded">
          <ion-spinner name="lines" />
        </div>

        <div class="lock-icon">
          <ion-badge color="warning">
            <ion-icon :icon="lockClosedOutline"></ion-icon>
          </ion-badge>
        </div>
        <div class="item-type">
          {{ musicPlaylist[index].type }}
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup>
import {
  IonGrid,
  IonItem,
  IonRow,
  IonCol,
  IonLabel,
  IonBadge,
  IonImg,
  IonSpinner,
  IonText,
  IonIcon,
} from "@ionic/vue";
import { lockClosedOutline } from "ionicons/icons";
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

const router = useRouter();

const props = defineProps({
  musicPlaylist: Array,
});

let isPlaying = ref(false);
let imgLoaded = ref(false);
let audio = new Audio();
let itemIndex = ref(-1);
let audioBuffering = ref(false);
let audioStopTimeout = null;

const ionImgDidLoad = function () {
  console.log("image loaded");
  imgLoaded.value = true;
};

const navigateTo = (index) => {
  isPlaying.value = false;
  clearTimeout(audioStopTimeout);
  audio.pause();
  audio.src = "";
  router.push({
    path: `/tabs/item-details/${props.musicPlaylist[index].title}`,
  });
};

const handleWaiting = function () {
  audioBuffering.value = true;
  console.log("waiting");
};

const handlePlaying = function () {
  setTimeout(() => {
    audioBuffering.value = false;
  }, 500);
};

const playAudioPreview = async function (index) {
  await Haptics.impact({ style: ImpactStyle.Light });
  audio.pause();
  audio.src = "";
  clearTimeout(audioStopTimeout);
  if (isPlaying.value == true && itemIndex.value == index) {
    isPlaying.value = false;
  } else {
    itemIndex.value = -1;

    itemIndex.value = index;
    isPlaying.value = true;

    audio.src = props.musicPlaylist[index].mediaUrl;
    audio.addEventListener("waiting", handleWaiting());
    audio.addEventListener("playing", handlePlaying());
    audio.play();

    console.log("audio playing");

    audioStopTimeout = setTimeout(() => {
      audio.pause();
      audio.src = "";
      isPlaying.value = false;
      console.log("audio ended");
    }, 30000);
  }
};
</script>

<style scoped>
.item-image {
  border-radius: 5px !important;
  overflow: hidden;
  z-index: 10;
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: 50% 50%;
  margin-bottom: 2px;
  /* filter: brightness(70%); */
  cursor: pointer;
}

.play-item {
  flex-grow: 0;
  flex-shrink: 0;
  color: #ffffffd9;
  align-self: center;
  margin-top: 6px;
}
.play-item-preview {
  position: absolute;
  top: 6px;
  left: 35px;
  background-color: #000000a5;
  padding: 4px;

  text-transform: uppercase;
  border-radius: 0px 2px 2px 0px;
  color: #ffffff;
}

.play-item-bg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 75%;
  left: 3%;
  padding: 0px;
  width: 35px;
  height: 35px;
  background-color: #000000a5;
  border-radius: 5px;
  flex-grow: 0;
  flex-shrink: 0;
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

ion-grid {
  --ion-grid-column-padding: 10px;
}

.container {
  position: relative;
}

.lock-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 10;
}

.spinner {
  position: absolute;
  right: 45%;
  top: 35%;
  z-index: 10;
}

.item-type {
  position: absolute;
  left: 3px;
  top: 20px;
  z-index: 10;
  background-color: var(--ion-color-secondary);
  border-radius: 2px;
  padding: 0 5px;
  font-size: small;
  color: white;
  text-transform: uppercase;
  font-family: Brandon-regular;
}

ion-badge {
  border-radius: 2px;
  padding: 2px 3px;
}

ion-label {
  margin: 0.5px;
}
</style>
