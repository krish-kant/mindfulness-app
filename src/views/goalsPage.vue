<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid class="ion-margin-start ion-margin-end">
        <ion-item lines="none"
          ><ion-icon
            class="add-goals-icon"
            @click="() => router.push('/tabs/tab3/add-goals')"
            slot="end"
            :icon="addCircleOutline"
          ></ion-icon
        ></ion-item>

        <ion-row class="scroll-items">
          <ion-col>
            <ion-button>Yoga and mindfulness</ion-button>
            <ion-button
              v-for="n in musicPlaylist"
              :key="n.type"
              fill="outline"
              >{{ n.type }}</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>

      <TilePlay :musicPlaylist="musicPlaylist" />
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
} from "@ionic/vue";
import { lockClosed, bookmarkOutline, addCircleOutline } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";

import TilePlay from "@/components/homePage/TilePlay.vue";

const router = useRouter();

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
.scroll-items {
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: scroll !important;
  overflow-y: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  margin-top: 10px;
}
.scroll-items ion-col {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.scroll-items::-webkit-scrollbar {
  display: none;
}

.add-goals-icon {
  animation: rotation 1s 2s linear;
}

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
  --background: none !important;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
