<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->
        <ion-item lines="none"
          ><ion-icon
            @click="() => router.push('/tabs/search')"
            slot="end"
            :icon="searchOutline"
          ></ion-icon
        ></ion-item>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- <ion-searchbar
        animated="true"
        @click="() => router.push('/tabs/tab2/search')"
      ></ion-searchbar> -->

      <ion-grid>
        <!-- <ion-item lines="none" class="ion-padding-right"
          ><ion-icon
            @click="() => router.push('/tabs/tab2/search')"
            slot="end"
            :icon="searchOutline"
          ></ion-icon
        ></ion-item> -->

        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-item lines="none">
              <div>
                <ion-segment value="default">
                  <ion-segment-button
                    value="default"
                    @click="switchBookmarks = false"
                  >
                    <ion-label>Playlist</ion-label>
                  </ion-segment-button>
                  <ion-segment-button
                    value="segment"
                    @click="switchBookmarks = true"
                  >
                    <ion-label>Bookmarks</ion-label>
                  </ion-segment-button>
                </ion-segment>
              </div>

              <ion-icon
                @click="() => (deletePlaylistItem = !deletePlaylistItem)"
                :icon="createOutline"
                slot="end"
              ></ion-icon>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid v-if="!switchBookmarks">
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-list button v-if="recentlyPlayledLength">
              <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
              <ion-reorder-group
                :disabled="false"
                @ionItemReorder="handleReorder($event)"
              >
                <ion-item
                  button
                  detail="false"
                  v-for="rec in recentlyPlayedList"
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
                    <ion-img
                      alt="Silhouette of mountains"
                      :src="rec.imageUrl"
                    />
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
            <ion-list button v-if="recentlyPlayledLength">
              <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->

              <ion-item
                button
                detail="true"
                v-for="rec in recentlyPlayedList"
                :key="rec.title"
                @click="
                  () => {
                    if (deletePlaylistItem) {
                      router.push(`/tabs/item-details/${rec.title}`);
                      switchBookmarks = false;
                    }
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
                  <ion-img alt="Silhouette of mountains" :src="rec.imageUrl" />
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
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonItem,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
  IonCheckbox,
  IonText,
  IonList,
  IonReorderGroup,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonReorder,
  IonImg,
} from "@ionic/vue";
import {
  createOutline,
  removeCircleOutline,
  searchOutline,
} from "ionicons/icons";
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Share } from "@capacitor/share";
import { useRecentlyPlayedStore } from "@/stores/recentlyPlayed";

let { recentlyPlayedList } = useRecentlyPlayedStore();

const router = useRouter();
let deletePlaylistItem = ref(true);
let recentlyPlayledLength = ref(0);
let switchBookmarks = ref(false);

// let recentlyPlayed = ref([
//   { message: "Yoga and mindfulness" },
//   { message: "Meditation and yoga Meditation, mindfulness, yoga" },
//   { message: "Breethe" },
//   { message: "Timer guided" },
//   { message: "Meditation and yoga Meditation, mindfulness, yoga1" },
//   { message: "Yoga and mindfulness" },
//   { message: "Meditation and yoga Meditation, mindfulness, yoga2" },
//   { message: "Timer guided1" },
//   { message: "Yoga and mindfulness" },
//   { message: "Timer guided2" },
//   { message: "Yoga and mindfulness1" },
//   { message: "Yoga and mindfulness2" },
//   { message: "Yoga and mindfulness3" },
//   { message: "Yoga and mindfulness4" },
// ]);

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
  recentlyPlayledLength.value = recentlyPlayedList.length;
  switchBookmarks.value = false;
});

// onUnmounted(() => {
//   switchBookmarks.value = true;
// });

const shareLink = async () => {
  console.log("share link");
  await Share.share({
    title: "See cool stuff",
    text: "Testing Share API",
    url: "https://mindfulnessapp.netlify.app/tabs/tab2/simplified-audio-player?index=3",
    dialogTitle: "Share with buddies",
  });
};

const deleteItemfromPlaylist = (item) => {
  recentlyPlayedList = recentlyPlayedList.filter((e) => e.title !== item);
  console.log(recentlyPlayedList.length);
  recentlyPlayledLength.value = recentlyPlayedList.length;
};

watch(recentlyPlayedList, async () => {
  console.log(recentlyPlayedList.length);
});

watch(recentlyPlayledLength, async () => {
  try {
    if (recentlyPlayledLength.value == 0) alert("Please add some items! ");
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
  filter: brightness(70%);
}

ion-button {
  margin-right: 20px;
  --box-shadow: none !important;
}
</style>
