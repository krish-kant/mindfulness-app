<template>
  <div v-for="(rec, index) in bookmarks" :key="rec.title" @click="navigateTo(index)">
    <div class="bookmarks-list">
      <ion-icon
        class="bookmarks-items"
        v-if="!deletePlaylistItem"
        slot="start"
        color="danger"
        style="margin-right: 10px; width: 28px; height: 28px"
        :icon="removeCircleOutline"
        @click="deleteItemfromBookmarks(rec.title)"
      ></ion-icon>
      <ion-thumbnail class="bookmarks-items">
        <img alt="Silhouette of mountains" :src="rec.imageUrl" />
        <div
          style="font-size: x-small"
          class="play-item-preview"
          v-if="isPlaying && index == itemIndex"
        >
          preview
        </div>
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
        </div>
      </ion-thumbnail>
      <ion-label style="margin-left: 10px; margin-top: 5px">
        <ion-text>{{ rec.title }}</ion-text>
        <p style="font-size: small; text-transform: uppercase">
          {{ rec.type }}
        </p>
        <p style="font-size: small; text-transform: uppercase">
          {{ rec.duration }}
        </p>
      </ion-label>
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="arrow-icon">
        <path
          fill="#ccc"
          d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
        />
      </svg>
    </div>
    <div class="hr" />
  </div>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonItem,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
  IonReorderGroup,
  IonSegment,
  IonSegmentButton,
  IonReorder,
  IonSearchbar,
  IonBadge,
  IonSpinner,
  IonText,
  IonThumbnail,
} from "@ionic/vue";
import { createOutline, removeCircleOutline, searchOutline } from "ionicons/icons";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBookmarksStore } from "@/stores/bookmarks";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

let bookmarks = useBookmarksStore().bookmarksList;

let title = ref("");

const router = useRouter();
const route = useRoute();
let deletePlaylistItem = ref(true);
let playlistLength = ref(0);
let bookmarksLength = ref(0);
let switchBookmarks = ref(false);
let isPlaying = ref(false);
let audio = new Audio();

let itemIndex = ref(-1);
let audioBuffering = ref(false);

let audioStopTimeout = null;
onMounted(() => {
  //   getUrlQueryParams();
});

// const getUrlQueryParams = async function () {
//   await router.isReady();

//   title.value = bookmarks.filter(
//     (item) => item.title === route.params.title
//   )[0].title;
//   console.log(title.value);
// };

const navigateTo = (index) => {
  isPlaying.value = false;
  clearTimeout(audioStopTimeout);
  audio.pause();
  audio.src = "";
  router.push({
    path: `/tabs/item-details/${bookmarks[index].title}`,
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

    audio.src = bookmarks[index].mediaUrl;
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
ion-thumbnail {
  --size: 100px;
  --border-radius: 10px;
  position: relative;
}
.bookmarks-list {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content: start;
}

.arrow-icon {
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: auto;
  opacity: 0.5;
}

.bookmarks-items {
  flex-grow: 0;
  flex-shrink: 0;
}

@media (prefers-color-scheme: dark) {
  ion-toolbar {
    --ion-color-whale: #0a1629;
  }
}

.hr {
  border-bottom: 1px solid #ccc;
  margin: 20px 0px;
  opacity: 0.2;
  width: 100%;
  display: block;
}

.play-item {
  flex-grow: 0;
  flex-shrink: 0;
  color: #ffffffd9;
  align-self: center;
  margin-top: 5px;
}
.play-item-preview {
  position: absolute;
  background-color: #000000a5;
  padding: 4px;
  top: 64%;
  left: 9%;
  text-transform: uppercase;
  border-radius: 2px 0px 0px 2px;
  color: #ffffff;
}

.play-item-bg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 58%;
  left: 58%;
  padding: 0px;
  width: 35px;
  height: 35px;
  background-color: #000000a5;
  border-radius: 5px;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
