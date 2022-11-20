<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar
        @click="() => router.push('/search')"
        placeholder="Custom Placeholder"
      ></ion-searchbar>

      <ion-grid class="ion-margin-start ion-margin-end">
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-item lines="none">
              <div class="list-header">
                <ion-label class="playlist-text">Playlist</ion-label>
                <ion-label class="bookmark-text">Bookmark</ion-label>
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

      <ion-grid class="ion-margin-start ion-margin-end">
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-list v-if="recentlyPlayledLength">
              <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
              <ion-reorder-group
                :disabled="false"
                @ionItemReorder="handleReorder($event)"
              >
                <ion-item v-for="n in recentlyPlayed" :key="n.message">
                  <ion-icon
                    class="hidden"
                    v-if="!deletePlaylistItem"
                    :icon="removeCircleOutline"
                    @click="deleteItemfromPlaylist(n.message)"
                    slot="start"
                  ></ion-icon>
                  <ion-thumbnail slot="start">
                    <img
                      alt="Silhouette of mountains"
                      src="https://picsum.photos/600/400"
                    />
                  </ion-thumbnail>

                  <ion-label> {{ n.message }} </ion-label>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
              </ion-reorder-group>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import { createOutline, removeCircleOutline } from "ionicons/icons";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let deletePlaylistItem = ref(true);
let recentlyPlayledLength = ref(0);

let recentlyPlayed = ref([
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga Meditation, mindfulness, yoga" },
  { message: "Breethe" },
  { message: "Timer guided" },
  { message: "Meditation and yoga Meditation, mindfulness, yoga1" },
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga Meditation, mindfulness, yoga2" },
  { message: "Timer guided1" },
  { message: "Yoga and mindfulness" },
  { message: "Timer guided2" },
  { message: "Yoga and mindfulness1" },
  { message: "Yoga and mindfulness2" },
  { message: "Yoga and mindfulness3" },
  { message: "Yoga and mindfulness4" },
]);

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
  recentlyPlayledLength.value = recentlyPlayed.value.length;
});

const deleteItemfromPlaylist = (item) => {
  recentlyPlayed.value = recentlyPlayed.value.filter((e) => e.message !== item);
  console.log(recentlyPlayed.value.length);
  recentlyPlayledLength.value = recentlyPlayed.value.length;
};

watch(recentlyPlayed, async () => {
  console.log(recentlyPlayed.value.length);
});

watch(recentlyPlayledLength, async () => {
  try {
    if (recentlyPlayledLength.value == 1) alert("test");
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 0px;
  --padding-start: 0px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  /* --background: blue; */
  --inner-padding-top: 0px;
}

.playlist-text {
  font-size: 20px;
  font-weight: 600;
  color: #4b90be;
  /* text-decoration: underline blue 5px; */
}

.bookmark-text {
  /* font-size: 20px; */
  font-weight: 600;
  color: #707578;
  /* text-decoration: underline blue 5px; */
}
ion-toolbar {
  --background: #ffffff;
  --border-color: #ffffff;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 180px;
}
</style>
