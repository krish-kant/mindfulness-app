<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="position: relative">
        <ion-item lines="none">
          <ion-segment value="default" mode="ios">
            <ion-segment-button
              :value="!switchBookmarks ? 'default' : ''"
              @click="
                () => {
                  switchBookmarks = false;
                  hapticsImpactLight();
                }
              "
            >
              <ion-label style="font-weight: 500; margin: 0px 20px"
                >Playlist</ion-label
              >
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
              <ion-label style="font-weight: 500; margin: 0px 20px"
                >Bookmarks</ion-label
              >
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
            <ion-list button v-if="playlistLength">
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
                    <ion-label>
                      <p style="font-size: small">{{ rec.type }}</p>
                      <p style="font-size: small">{{ rec.duration }}</p>
                    </ion-label>
                    <h3 style="font-weight: 500">{{ rec.title }}</h3>
                  </ion-label>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
              </ion-reorder-group>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid v-if="switchBookmarks">
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <div button v-if="bookmarksLength">
              <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->

              <div
                v-for="rec in bookmarks"
                :key="rec.title"
                @click="
                  () => {
                    if (deletePlaylistItem) {
                      router.push(`/tabs/item-details/${rec.title}`);
                    }
                  }
                "
              >
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
                  <ion-thumbnail class="bookmarks-items" slot="start">
                    <img alt="Silhouette of mountains" :src="rec.imageUrl" />

                    <div class="play-item">
                      <svg
                        style="width: 50px; height: 50px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3M10 16V8L15 12"
                        />
                      </svg>
                    </div>
                    <div class="play-item-bg"></div>
                  </ion-thumbnail>
                  <ion-label style="margin-left: 10px; margin-top: 5px">
                    <ion-text style="font-size: medium">{{
                      rec.title
                    }}</ion-text>
                    <p style="font-size: small">{{ rec.type }}</p>
                    <p style="font-size: small">{{ rec.duration }}</p>
                  </ion-label>
                  <svg
                    style="width: 24px; height: 24px"
                    viewBox="0 0 24 24"
                    class="bookmarks-icon"
                  >
                    <path
                      fill="#ccc"
                      d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                    />
                  </svg>
                </div>
                <div class="hr" />
              </div>
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
} from "@ionic/vue";
import {
  createOutline,
  removeCircleOutline,
  searchOutline,
} from "ionicons/icons";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { usePlaylistStore } from "@/stores/playlist";
import { useBookmarksStore } from "@/stores/bookmarks";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

let playlist = usePlaylistStore().playList;
let bookmarks = useBookmarksStore().bookmarksList;

const router = useRouter();
let deletePlaylistItem = ref(true);
let playlistLength = ref(0);
let bookmarksLength = ref(0);
let switchBookmarks = ref(false);

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

watch(bookmarksLength, async () => {
  try {
    if (bookmarksLength.value == 0) alert("Please add some items! ");
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
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

ion-img {
  z-index: 10;
  border-radius: 5px;
  object-fit: cover;
  object-position: 50% 50%;

  /* filter: brightness(70%); */
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
  border-radius: 5px;
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

ion-thumbnail {
  --size: 100px;
  --border-radius: 14px;
  position: relative;
}
.bookmarks-list {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content: start;
}

.bookmarks-icon {
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
  margin: 15px 0px;
  margin-right: 10px;
  opacity: 0.2;
  width: 100%;
  display: block;
}

.play-item {
  position: absolute;
  left: 50%;
  top: 50%;
  flex-grow: 0;
  flex-shrink: 0;
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
  z-index: 100;
  color: #ccc;
  /* mix-blend-mode: difference; */
  mix-blend-mode: exclusion;
}

/* .play-item-bg {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: whitesmoke;
  width: 24px;
  height: 24px;
  padding: 0px;
  margin: 0px;
} */

/* @media only screen and (min-width: 600px) {
  .tool-bar-custom {
    justify-content: center;
  }

} */
</style>
