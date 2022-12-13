<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item lines="none"
        ><ion-text><h1>Hi Krishna</h1></ion-text></ion-item
      >
      <NavItems />

      <ion-item lines="none"
        ><ion-text><h3>Recently Played</h3></ion-text></ion-item
      >
      <TileRecent :musicPlaylist="dataList" />

      <ion-item lines="none"
        ><ion-text><h3>Top Rated</h3></ion-text></ion-item
      >
      <TilePlay :musicPlaylist="dataList" />
      <ion-item lines="none"
        ><ion-text><h3>Top Rated</h3></ion-text></ion-item
      >
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
</style>
