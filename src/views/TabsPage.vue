<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="home"
          href="/tabs/home"
          @click="hapticsImpactLight"
        >
          <ion-icon :icon="home" />
          <ion-label>home</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="library"
          href="/tabs/library"
          @click="hapticsImpactLight"
        >
          <ion-icon :icon="play" />
          <ion-label>library</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="goals"
          href="/tabs/goals"
          @click="hapticsImpactLight"
        >
          <ion-icon :icon="flag" />
          <ion-label>goals</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="profile"
          href="/tabs/profile"
          @click="hapticsImpactLight"
        >
          <ion-icon :icon="search" />
          <ion-label>search</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { home, flag, play, search } from "ionicons/icons";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap"); /* Poppins font */

* {
  font-family: "Poppins", sans-serif;
}
</style>
