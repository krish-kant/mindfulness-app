<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-segment value="default" mode="ios">
            <ion-segment-button
              :value="!switchBookmarks ? 'default' : ''"
              @click="switchBookmarks = false"
            >
              <ion-label>Playlist</ion-label>
            </ion-segment-button>
            <ion-segment-button
              :value="switchBookmarks ? 'default' : ''"
              @click="switchBookmarks = true"
            >
              <ion-label>Bookmarks</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-item>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-item lines="none">
              <ion-icon
                @click="() => (deletePlaylistItem = !deletePlaylistItem)"
                :icon="createOutline"
                slot="end"
              >
              </ion-icon>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>

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
                  <ion-button
                    color="light"
                    slot="start"
                    v-if="!deletePlaylistItem"
                    size="default"
                    @click="deleteItemfromPlaylist(rec.title)"
                  >
                    <ion-icon :icon="removeCircleOutline"></ion-icon>
                  </ion-button>

                  <ion-thumbnail slot="start">
                    <img alt="Silhouette of mountains" :src="rec.imageUrl" />
                  </ion-thumbnail>

                  <ion-label>
                    <h3>{{ rec.title }}</h3>
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
            <ion-list button v-if="bookmarksLength">
              <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->

              <ion-item
                button
                detail="true"
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
                <ion-button
                  color="light"
                  slot="start"
                  v-if="!deletePlaylistItem"
                  size="default"
                  @click="deleteItemfromBookmarks(rec.title)"
                >
                  <ion-icon :icon="removeCircleOutline"></ion-icon>
                </ion-button>

                <ion-thumbnail slot="start">
                  <img alt="Silhouette of mountains" :src="rec.imageUrl" />
                </ion-thumbnail>

                <ion-label>
                  <h3>{{ rec.title }}</h3>
                </ion-label>
                <ion-reorder slot="end"></ion-reorder>
              </ion-item>
            </ion-list>
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

let { playlist } = usePlaylistStore();
let { bookmarks } = useBookmarksStore();

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
};

const deleteItemfromBookmarks = (item) => {
  bookmarks = bookmarks.filter((e) => e.title !== item);
  console.log(bookmarks.length);
  bookmarksLength.value = bookmarks.length;
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

ion-button {
  margin-right: 20px;
  --box-shadow: none !important;
}

ion-toolbar {
  --background: var(--ion-color-whale);
}

@media (prefers-color-scheme: dark) {
  ion-toolbar {
    --ion-color-whale: #0a1629;
  }
}

/* @media only screen and (min-width: 600px) {
  .tool-bar-custom {
    justify-content: center;
  }

} */
</style>
