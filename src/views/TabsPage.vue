<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="/tabs/library">
          <ion-icon :icon="playOutline" />
          <ion-label>library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="goals" href="/tabs/goals">
          <ion-icon :icon="flagOutline" />
          <ion-label>goals</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personOutline" />
          <ion-label>profile</ion-label>
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
import {
  homeOutline,
  flagOutline,
  playOutline,
  personOutline,
  bookmarksOutline,
} from "ionicons/icons";
</script>
