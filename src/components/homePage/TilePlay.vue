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
        <ion-img
          class="item-image"
          :src="musicPlaylist[index].imageUrl"
          :key="currentSong"
          @click="
            () => {
              if (!isPlaying) {
                router.push({
                  path: '/tabs/tab2/item-details',
                  query: { index: index },
                });
              }
            }
          "
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
} from "@ionic/vue";
import { lockClosedOutline, bookmarkOutline } from "ionicons/icons";
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  musicPlaylist: Array,
});

let isPlaying = ref(false);
let currentIndex = ref(0);

const onImageLoaded = function () {
  console.log("image loaded");
};

const playItem = function (index) {
  isPlaying.value = true;
  currentIndex.value = index;
  router.push({
    path: "",
  });

  const audio = new Audio(props.musicPlaylist[index].mediaUrl);
  audio.play();

  setTimeout(() => {
    audio.pause();
    isPlaying.value = false;
    currentIndex.value = 0;
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
  margin-bottom: 2px;
  filter: brightness(70%);
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

.item-type {
  position: absolute;
  left: 5px;
  top: 20px;
  z-index: 10;
}

.play-item {
  position: absolute;
  left: 15px;
  top: 145px;
}

.play-item-bg {
  position: absolute;
  left: 23px;
  top: 153px;

  /* background-color: var(--ion-color-light); */
  background-color: whitesmoke;

  width: 24px;
  height: 24px;
  padding: 0px;
  margin: 0px;
}

ion-badge {
  border-radius: 2px;
  padding: 2px 3px;
}
ion-label {
  margin: 0.5px;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  pointer-events: auto;
  /* opacity: 0.5; */

  color: var(--ion-color-medium);
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
  height: 2px;
  width: 93%;
  position: absolute;
  left: 10px;
  top: 190px;
  margin: 1px 2px;
}
.in {
  animation: fill 10s linear 1;
  height: 100%;
  background-color: var(--ion-color-dark);
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
