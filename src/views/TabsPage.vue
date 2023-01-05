<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" v-if="isLoggedIn()">
        <ion-tab-button tab="home" href="/tabs/home" @click="hapticsImpactLight">
          <ion-icon :icon="home" />
          <ion-label style="font-size: ">home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="/tabs/library" @click="hapticsImpactLight">
          <ion-icon :icon="play" />
          <ion-label style="font-size: ">library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="goals" href="/tabs/goals" @click="hapticsImpactLight">
          <ion-icon :icon="flag" />
          <ion-label style="font-size: ">goals</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile" @click="hapticsImpactLight">
          <ion-icon :icon="search" />
          <ion-label style="font-size: ">search</ion-label>
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
import useAuthUser from "@/composables/useAuthUser";

const { isLoggedIn } = useAuthUser();

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};
</script>

<style scoped>
* {
  font-family: Brandon-regular;
}
</style>
