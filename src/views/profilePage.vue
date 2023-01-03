<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-searchbar
            placeholder="Search"
            color="light"
            @click="() => router.push('/tabs/search')"
          ></ion-searchbar>
        </ion-item>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid class="ion-margin" style="margin-top: 30px">
        <ion-row>
          <ion-col
            size="6"
            size-sm="4"
            v-for="(items, index) in dataList"
            :key="items.title"
            @click="
              () => {
                router.push({
                  path: `/tabs/item-details/${items.title}`,
                });
              }
            "
          >
            <div style="position: relative; overflow: hidden; cursor: pointer">
              <ion-img
                class="item-image"
                :src="dataList[index].imageUrl"
                :key="currentAudio"
              />
              <ion-label class="ion-text-wrap">
                <ion-text
                  style="
                    font-size: x-large;
                    position: absolute;
                    bottom: 10%;
                    left: 5%;
                    color: white;
                    margin-right: 5%;
                    margin-top: 5%;
                  "
                  >{{ dataList[index].type }}</ion-text
                >
              </ion-label>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-label class="ion-text-wrap" style="margin: 0px 30px">
        <ion-text style="font-size: x-large">Interests</ion-text>
      </ion-label>

      <ion-grid class="ion-margin">
        <ion-row>
          <ion-col
            size="6"
            size-sm="3"
            v-for="(items, index) in dataList"
            :key="items.title"
            @click="
              () => {
                router.push({
                  path: `/tabs/item-details/${items.title}`,
                });
              }
            "
          >
            <div class="interests-bg" style="cursor: pointer; border-radius: 5px">
              <ion-item lines="none">
                <ion-label class="ion-text-wrap" color="dark" style="padding: 10px">
                  <ion-text style="font-size: large">{{ dataList[index].type }}</ion-text>
                </ion-label>
              </ion-item>
            </div>
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
  IonList,
  IonReorderGroup,
  IonDatetime,
  IonSearchbar,
} from "@ionic/vue";

import { useDataStore } from "@/stores/data";
import { useRouter, useRoute } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();

const { dataList } = useDataStore();

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};
</script>

<style scoped>
ion-toolbar {
  --background: var(--ion-color-whale);
}

.ios ion-toolbar {
  --padding-top: 10px !important;
  --padding-bottom: 0px !important;
}

@media (prefers-color-scheme: dark) {
  ion-toolbar {
    --ion-color-whale: #0a1629;
  }
}

ion-grid {
  --ion-grid-column-padding: 10px;
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 0px;
  --padding-start: 0px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --background: none;
  --inner-padding-top: 0px;
}

.item-image {
  border-radius: 5px !important;
  overflow: hidden;
  z-index: 10;
  width: 100%;
  height: 100px;
  object-fit: cover;
  object-position: 50% 50%;
  filter: brightness(50%);
}

.interests-bg {
  background-color: var(--ion-color-light);
}
</style>
