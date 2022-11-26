<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid class="ion-margin">
        <ion-row>
          <ion-col
            size="12"
            size-sm="4"
            v-for="(items, index) in musicPlaylist"
            :key="items.title"
            class="container"
          >
            <ion-img
              class="item-image"
              :src="musicPlaylist[index].imageUrl"
              :key="currentSong"
              id=""
            />
            <div v-if="index == currentIndex && isPlaying" class="bar">
              <div class="in"></div>
            </div>
            <ion-item lines="none">
              <ion-label class="ion-text-wrap">
                <p>{{ musicPlaylist[index].duration }}</p>
                <h3>{{ musicPlaylist[index].title }}</h3>
              </ion-label>
              <ion-icon :icon="bookmarkOutline" />
            </ion-item>
            <div class="lock-icon">
              <ion-badge color="warning"
                ><ion-icon :icon="lockClosedOutline"></ion-icon
              ></ion-badge>
            </div>
            <div class="item-type">
              <ion-badge color="secondary">
                {{ musicPlaylist[index].type }}</ion-badge
              >
            </div>
            <div class="play-item-bg"></div>

            <div class="play-item">
              <button
                class="play-icon"
                :style="[
                  index == currentIndex && isPlaying
                    ? {
                        color: 'grey',
                      }
                    : {},
                ]"
                @click="playItem(index)"
                :disabled="isPlaying"
              >
                <svg style="width: 40px; height: 40px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3M10 16V8L15 12"
                  />
                </svg>
              </button>
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
  IonHeader,
  IonToolbar,
  IonGrid,
  IonItem,
  IonRow,
  IonCol,
  IonLabel,
  IonBadge,
} from "@ionic/vue";
import { lockClosedOutline, bookmarkOutline } from "ionicons/icons";
import { ref } from "vue";

let isPlaying = ref(false);
let currentIndex = ref(0);

const musicPlaylist = ref([
  {
    title:
      "Service Bell Service Bell Service Bell Service Bell Bell Service Bell",
    type: "Yoga",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://source.unsplash.com/crs2vlkSe98/900x1000",
    duration: "1 hour",
  },
  {
    title: "Meadowlark",
    type: "Sleep",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "https://source.unsplash.com/35bE_njbG9E/400x400",
    duration: "30 min",
  },
  {
    title: "Hyena Laughing",
    type: "Meditation",
    mediaUrl: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
    imageUrl: "https://source.unsplash.com/Esax9RaEl2I/400x600",
    duration: "4 min",
  },
  {
    title: "Creepy Background",
    type: "Breethe",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    imageUrl: "https://source.unsplash.com/BjNXpLGnJI0/500x400",
    duration: "5 min",
  },
]);

const onImageLoaded = function () {
  console.log("image loaded");
};

const playItem = function (index) {
  this.isPlaying = true;
  this.currentIndex = index;

  const audio = new Audio(this.musicPlaylist[index].mediaUrl);
  audio.play();

  setTimeout(() => {
    audio.pause();
    this.isPlaying = false;
    this.currentIndex = 0;
  }, "10000");
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

.container {
  position: relative;
}

.lock-icon {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 10;
}

.item-type {
  position: absolute;
  left: -2px;
  top: 20px;
  z-index: 10;
}

.play-item {
  position: absolute;
  left: 10px;
  top: 140px;
}

.play-item-bg {
  position: absolute;
  left: 18px;
  top: 148px;

  background-color: var(--ion-color-light);

  width: 24px;
  height: 24px;
  padding: 0px;
  margin: 0px;
}

ion-badge {
  border-radius: 2px;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  pointer-events: auto;
  /* opacity: 0.5; */

  color: var(--ion-color-primary);
  margin: 0px;
  padding: 0px;
  z-index: 10;
}

button:disabled {
  cursor: not-allowed;
  pointer-events: none;
  color: "grey";
}

.bar {
  /* border: 1px solid #666; */
  height: 10px;
  width: 100%;
}
.in {
  animation: fill 10s linear 1;
  height: 100%;
  background-color: var(--ion-color-primary);
  border-radius: 2px;
}

@keyframes fill {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
