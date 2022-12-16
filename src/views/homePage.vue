<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item lines="none" class="ion-margin-top">
        <ion-text class="heading">
          Hi Krishna
        </ion-text>
      </ion-item>
      <NavItems />

      <ion-item lines="none">
        <ion-text class="heading">
          Recently Played
        </ion-text>
      </ion-item>
      <TileRecent :musicPlaylist="dataList" />

      <ion-item lines="none">
        <ion-text class="heading">
          Top Rated
        </ion-text>
      </ion-item>
      <TilePlay :musicPlaylist="dataList" />
      <ion-item lines="none">
        <ion-text class="heading">
          Top Rated
        </ion-text>
      </ion-item>
      <TilePlay :musicPlaylist="dataList" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonText,
} from "@ionic/vue";

import { useDataStore } from "@/stores/data";

import TilePlay from "@/components/TilePlay.vue";
import TileRecent from "@/components/TileRecent.vue";
import NavItems from "@/components/NavItems.vue";

const { dataList } = useDataStore();
</script>

<style scoped>
ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 20px;
  --padding-start: 20px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --background: none;
  --inner-padding-top: 0px;
}

.heading {
  font-size: large;
  font-weight: 500;
}
</style>
