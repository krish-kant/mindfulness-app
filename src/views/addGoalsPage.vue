<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab2"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-item class="ion-margin-top heading-item" lines="none">
          <ion-text>
            <h1>Add Goals</h1>
          </ion-text>
          <ion-button slot="end">Save</ion-button>
        </ion-item>
        <ion-row class="ion-justify-content-start">
          <ion-col
            size="12"
            size-sm="6"
            v-for="(items, index) in musicPlaylist"
            :key="items.title"
          >
            <!-- <ion-item detail="false" lines="none">
              <ion-thumbnail slot="start">
                <ion-img
                  alt="Silhouette of mountains"
                  :src="musicPlaylist[index].imageUrl"
                />
              </ion-thumbnail>

              <ion-label class="ion-text-wrap">
                <h3>{{ musicPlaylist[index].title }}</h3>
              </ion-label>

              <ion-checkbox slot="end"></ion-checkbox>
            </ion-item> -->

            <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
            <ion-list>
              <ion-item detail="false" lines="none">
                <ion-thumbnail slot="start">
                  <ion-img
                    alt="Silhouette of mountains"
                    src="https://picsum.photos/600/400"
                  />
                </ion-thumbnail>

                <ion-label class="ion-text-wrap">
                  <h3>{{ musicPlaylist[index].title }}</h3>
                </ion-label>
                <ion-checkbox slot="end"></ion-checkbox>
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
  IonThumbnail,
  IonImg,
  IonList,
} from "@ionic/vue";
import { ref } from "vue";

const musicPlaylist = ref([
  {
    title:
      "Service Bell Service Bell Service Bell Service Bell Bell Service Bell",
    type: "Yoga",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://picsum.photos/500/600",
    duration: "1 hour",
  },
  {
    title: "Meadowlark",
    type: "Sleep",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "https://picsum.photos/500/500",
    duration: "30 min",
  },
  {
    title: "Hyena Laughing",
    type: "Meditation",
    mediaUrl: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
    imageUrl: "https://picsum.photos/700/500",
    duration: "4 min",
  },
  {
    title: "Creepy Background",
    type: "Breethe",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    imageUrl: "https://picsum.photos/800/500",
    duration: "5 min",
  },
  {
    title:
      "Service Bell Service Bell Service Bell Service Bell Bell Service Bell",
    type: "Yoga",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://picsum.photos/500/600",
    duration: "1 hour",
  },
  {
    title: "Meadowlark",
    type: "Sleep",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "https://picsum.photos/500/500",
    duration: "30 min",
  },
  {
    title: "Hyena Laughing",
    type: "Meditation",
    mediaUrl: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
    imageUrl: "https://picsum.photos/700/500",
    duration: "4 min",
  },
  {
    title: "Creepy Background",
    type: "Breethe",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    imageUrl: "https://picsum.photos/800/500",
    duration: "5 min",
  },
]);
</script>

<style scoped>
ion-item {
  --padding-bottom: 5px;
  --padding-top: 5px;
  --padding-end: 5px;
  --padding-start: 5px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --background: var(--ion-color-light);
  --inner-padding-top: 0px;
  --border-radius: 5px;
}

.heading-item {
  --background: none !important;
}

ion-img {
  z-index: 10;
  border-radius: 5px;
  object-fit: cover;
  object-position: 50% 50%;
  filter: brightness(70%);
}
</style>
