<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <TilePlay :musicPlaylist="musicPlaylist" />
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

import TilePlay from "@/components/homePage/TilePlay.vue";

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
]);
</script>

<style scoped></style>
