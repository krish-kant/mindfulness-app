<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="position: relative">
        <ion-item lines="none">
          <ion-segment mode="ios" value="default">
            <ion-segment-button
              :value="!switchBookmarks ? 'default' : ''"
              @click="
                () => {
                  switchBookmarks = false;
                  hapticsImpactLight();
                }
              "
            >
              <ion-label style="font-size: small; margin: 0px 10px">Playlist</ion-label>
            </ion-segment-button>
            <ion-segment-button
              :value="switchBookmarks ? 'default' : ''"
              @click="
                () => {
                  switchBookmarks = true;
                  hapticsImpactLight();
                }
              "
            >
              <ion-label style="font-size: small; margin: 0px 10px">Bookmarks</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-item>
        <ion-icon
          @click="() => (deletePlaylistItem = !deletePlaylistItem)"
          :icon="createOutline"
          size="large"
          class="edit-icon"
        >
        </ion-icon>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <ion-item lines="none">
        <ion-icon
          @click="() => (deletePlaylistItem = !deletePlaylistItem)"
          :icon="createOutline"
          slot="end"
          style="margin-right: 10px"
        >
        </ion-icon>
      </ion-item> -->

      <ion-grid v-if="!switchBookmarks">
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-list
              button
              v-if="playlistLength"
              color="none"
              style="background: transparent"
            >
              <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
              <ion-reorder-group
                :disabled="false"
                @ionItemReorder="handleReorder($event)"
              >
                <ion-item
                  button
                  detail="false"
                  v-for="rec in playlist"
                  :key="rec.title"
                  @click="
                    () => {
                      if (deletePlaylistItem)
                        router.push({
                          path: `/tabs/audiolist-player/${rec.title}`,
                        });
                    }
                  "
                >
                  <ion-icon
                    v-if="!deletePlaylistItem"
                    slot="start"
                    color="danger"
                    :icon="removeCircleOutline"
                    @click="deleteItemfromPlaylist(rec.title)"
                  ></ion-icon>

                  <ion-thumbnail slot="start">
                    <img alt="Silhouette of mountains" :src="rec.imageUrl" />
                  </ion-thumbnail>
                  <ion-label>
                    <p style="font-size: medium; font-family: Brandon-regular">
                      {{ rec.type }}
                    </p>
                    <ion-text style="">{{ rec.title }}</ion-text>
                    <ion-label>
                      <p style="font-size: medium; font-family: Brandon-regular">
                        {{ rec.duration }}
                      </p>
                    </ion-label>
                  </ion-label>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
              </ion-reorder-group>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div button v-if="bookmarksLength && switchBookmarks" style="margin: 30px 10px">
        <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->

        <div
          v-for="(rec, index) in bookmarks"
          :key="rec.title"
          @click="navigateTo(index)"
          style="cursor: pointer"
        >
          <div
            class="bookmarks-list ion-activatable ripple-parent rounded-rectangle"
            style="position: relative; overflow: hidden"
          >
            <ion-icon
              class="bookmarks-items"
              v-if="!deletePlaylistItem"
              slot="start"
              color="danger"
              style="margin-right: 10px; width: 28px; height: 28px"
              :icon="removeCircleOutline"
              @click.stop="deleteItemfromBookmarks(rec.title)"
            ></ion-icon>
            <!-- <IonRippleEffect
              style="overflow: hidden"
              :style="
                iOSplatform
                  ? {
                      margin: '4px 0px',
                      'border-radius': '12px',
                      'border-top-right-radius': '0px',
                      'border-bottom-right-radius': '0px',
                    }
                  : ''
              "
            /> -->
            <ion-thumbnail class="bookmarks-items thumbnail-bookmarks">
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
              <p style="font-size: medium; font-family: Brandon-regular">
                {{ rec.type }}
              </p>
              <ion-text style="font-size: large">{{ rec.title }}</ion-text>

              <p style="font-size: medium; font-family: Brandon-regular">
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
      </div>
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
  IonIcon,
  IonThumbnail,
  IonSpinner,
  IonRippleEffect,
  isPlatform,
} from "@ionic/vue";
import { createOutline, removeCircleOutline, searchOutline } from "ionicons/icons";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePlaylistStore } from "@/stores/playlist";
import { useBookmarksStore } from "@/stores/bookmarks";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

let iOSplatform = isPlatform("ios"); // returns true when running on a iOS device

let playlist = usePlaylistStore().playList;
let bookmarks = useBookmarksStore().bookmarksList;

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

const handleReorder = (event) => {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log("Dragged from index", event.detail.from, "to", event.detail.to);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete();
};

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

onMounted(() => {
  // deletePlaylistItem.value == true;
  playlistLength.value = playlist.length;
  bookmarksLength.value = bookmarks.length;
  switchBookmarks.value = false;
});

const deleteItemfromPlaylist = (item) => {
  playlist = playlist.filter((e) => e.title !== item);
  console.log(playlist.length);
  playlistLength.value = playlist.length;
  hapticsImpactLight();
};

const deleteItemfromBookmarks = (item) => {
  bookmarks = bookmarks.filter((e) => e.title !== item);
  console.log(bookmarks.length);
  bookmarksLength.value = bookmarks.length;
  hapticsImpactLight();
};

watch(playlistLength, async () => {
  try {
    if (playlistLength.value == 0) alert("Please add some items! ");
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      console.log("route changed");
      deletePlaylistItem.value = true;
    }, 500);
  }
);

watch(bookmarksLength, async () => {
  try {
    if (bookmarksLength.value == 0) alert("Please add some items! ");
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
ion-segment {
  --background: var(--ion-color-light-shade);
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 0px;
  --padding-start: 0px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --inner-padding-top: 0px;
  --background: none !important;
}

.edit-icon {
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 100;
  color: white;
  font-size: 20px;
}

img {
  z-index: 10;
  object-fit: cover;
  object-position: 50% 50%;
}

ion-button {
  margin-right: 20px;
  --box-shadow: none !important;
}

ion-toolbar {
  --background: var(--ion-color-whale);
}

.thumbnail-bookmarks {
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
  margin-top: 6px;
  margin-right: 1px;
}
.play-item-preview {
  position: absolute;
  background-color: #000000a5;
  padding: 4px;
  top: 64%;
  left: 7%;
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
