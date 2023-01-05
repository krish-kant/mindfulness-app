<template>
  <ion-page>
    <div class="card">
      <WhaleAnimation />
      <div class="title-heading">
        <!-- <ion-icon size="large" :icon="person" /> -->
        <ion-text
          style="
            font-family: 'Tangerine', cursive;
            font-size: 36px;
            font-weight: bold;
            color: white;
          "
          >Moby</ion-text
        >
        <!-- <ion-label>profile</ion-label> -->
      </div>

      <div class="profile-icon" @click="logoutMethod()">
        <ion-icon size="small" :icon="person" />

        <!-- <ion-label>profile</ion-label> -->
      </div>

      <!-- <div
        class="settings-icon"
        @click="
          () => {
            router.push('/tabs/profile');
            hapticsImpactLight();
          }
        "
      >
        <ion-icon size="small" :icon="settings" />
      </div> -->
    </div>

    <ion-content ref="itemContainer">
      <ion-item lines="none" class="ion-margin-top">
        <h1>Hi Krishna</h1>
      </ion-item>
      <NavItems />

      <ion-item lines="none">
        <ion-text style="font-size: large">Top Rated</ion-text>
      </ion-item>
      <TilePlay :musicPlaylist="dataList" />

      <ion-item lines="none">
        <ion-text style="font-size: large">Top Rated</ion-text>
      </ion-item>
      <TilePlay :musicPlaylist="dataList" />

      <ion-item lines="none">
        <ion-text style="font-size: large">Recently Played</ion-text>
      </ion-item>
      <TileRecent :musicPlaylist="dataList" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonText,
  IonLabel,
  IonIcon,
  IonTabButton,
  IonItem,
} from "@ionic/vue";
import { settings, person } from "ionicons/icons";
import { useDataStore } from "@/stores/data";
import TilePlay from "@/components/TilePlay.vue";
import TileRecent from "@/components/TileRecent.vue";
import NavItems from "@/components/NavItems.vue";
import { useRouter, useRoute } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { ref, watch } from "vue";

import useAuthUser from "@/composables/useAuthUser";
import WhaleAnimation from "@/components/WhaleAnimation.vue";

const { logout } = useAuthUser();
const router = useRouter();
const route = useRoute();

const { dataList } = useDataStore();

const itemContainer = ref(null);

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

const logoutMethod = async () => {
  await hapticsImpactLight();
  await logout();
  window.location.reload();
};

/* scroll to top on route change */

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      itemContainer.value.$el.scrollToTop();
    }, 200);
  }
);
</script>

<style scoped>
/* ion-text,
h1 {
  color: var(--ion-color-whale);
} */

.title-heading {
  position: absolute;
  left: 5%;
  top: 50%;
  color: white;
}

.profile-icon {
  position: absolute;
  right: 5%;
  top: 55%;
  color: white;
}

/* .settings-icon {
  position: absolute;
  right: 5%;
  top: 50%;
  color: white;
} */

@media (prefers-color-scheme: dark) {
  #blue-ocean-bg {
    --ion-color-whale: #081327;
    --ion-color-whale-light: #5f7494;
    --ion-color-whale-body: #16243f;
    --ion-color-whale-gill: #1f324c;
    --ion-color-whale-gill-1: #18253c;
    --ion-color-whale-eye: #040c17;
  }
}

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

.card {
  position: relative;
  height: 15%;
  z-index: 1000;
}

.card-after {
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ececec;
  z-index: 1000;
  width: 100%;
  background-color: #f3f3f3;
}
</style>
