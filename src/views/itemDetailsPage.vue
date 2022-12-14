<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->

        <ion-text> </ion-text>

        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size-lg="8" class="ion-align-self-center">
            <ion-card v-if="dataLoaded">
              <img
                alt="Silhouette of mountains"
                :src="dataList[index].imageUrl"
              />

              <ion-text>{{ dataList[index].duration }}</ion-text>
              |<ion-text>{{ dataList[index].type }}</ion-text>

              <ion-item lines="none" class="ion-margin">
                <ion-button
                  size="default"
                  color="light"
                  @click="
                    () =>
                      router.push({
                        path: `/tabs/audio-player/${dataList[index].title}`,
                      })
                  "
                >
                  <ion-icon color="dark" :icon="play" /><ion-text color="medium"
                    ><p>Play</p></ion-text
                  >
                </ion-button>
              </ion-item>

              <h3>{{ dataList[index].title }}</h3>
              <ion-text
                >Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae sapiente porro nostrum soluta consectetur alias
                reiciendis ea, dolore debitis facilis quibusdam? Quibusdam
                assumenda iusto iste aperiam rerum ad, mollitia a. Lorem ipsum
                dolor, sit amet consectetur adipisicing elit. Impedit qui dolore
                iure tempora excepturi aliquam commodi, provident a quo. Eaque
                accusantium minima libero optio adipisci vel laudantium suscipit
                inventore saepe!</ion-text
              >
              <ion-item lines="none" class="ion-margin">
                <ion-button
                  size="default"
                  color="light"
                  @click="
                    () =>
                      router.push({
                        path: `/tabs/audio-player/${dataList[index].title}`,
                      })
                  "
                >
                  <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16 12C18.76 12 21 9.76 21 7S18.76 2 16 2 11 4.24 11 7 13.24 12 16 12M21.45 17.6C21.06 17.2 20.57 17 20 17H13L10.92 16.27L11.25 15.33L13 16H15.8C16.15 16 16.43 15.86 16.66 15.63S17 15.12 17 14.81C17 14.27 16.74 13.9 16.22 13.69L8.95 11H7V20L14 22L22.03 19C22.04 18.47 21.84 18 21.45 17.6M5 11H.984V22H5V11Z"
                    /></svg
                  ><ion-text color="medium"><p>Donate</p></ion-text>
                </ion-button>
              </ion-item>
            </ion-card>

            <!-- <ion-item lines="none">
              <ion-label class="ion-text-wrap">
                <p>{{ dataList[index].duration }}</p>
                <h3>{{ dataList[index].title }}</h3>
              </ion-label>
              <ion-icon :icon="bookmarkOutline" />
            </ion-item> -->

            <!-- <div class="item-type">
              <ion-badge color="secondary">
                {{ dataList[index].type }}</ion-badge
              >
            </div> -->
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonGrid,
  IonItem,
  IonRow,
  IonCol,
  IonLabel,
  IonBadge,
  IonImg,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";
import { play, bookmarkOutline } from "ionicons/icons";
import { ref, defineProps, onMounted, onBeforeMount, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";

const { dataList } = useDataStore();

const router = useRouter();
const route = useRoute();
let dataLoaded = ref(false);

let index = ref(0);
let title = ref("");

onMounted(() => {
  getUrlQueryParams();
});

// onUnmounted(() => {
//   console.log("unmounted");
//   router.back();
// });

const shareLink = async () => {
  console.log("share link");
  await Share.share({
    title: "See cool stuff",
    text: "Testing Share API",
    url: "https://mindfulnessapp.netlify.app/tabs/tab2/simplified-audio-player?index=3",
    dialogTitle: "Share with buddies",
  });
};

const getUrlQueryParams = async () => {
  //router is async so we wait for it to be readyHi
  await router.isReady();
  //once its ready we can access the query params
  console.log(route.query);

  // index.value = route.query.index;
  dataLoaded.value = true;
  // title.value = route.params.title;
  title.value = dataList.filter(
    (item) => item.title === route.params.title
  )[0].title;
  console.log(title.value);
  console.log(dataList.filter((item) => item.title === title.value)[0].id);
  index = dataList.findIndex((item) => item.title === title.value);
  console.log(dataList.findIndex((item) => item.title === title.value));
};
</script>

<style scoped>
img {
  border-radius: 5px !important;
  overflow: hidden;
  z-index: 10;
  width: 100%;
  height: 350px;
  object-fit: cover;
  object-position: 50% 50%;
  margin-bottom: 2px;
  filter: brightness(70%);
}

@media only screen and (max-width: 600px) {
  img {
    border-radius: 5px !important;
    overflow: hidden;
    z-index: 10;
    width: 100%;
    height: 250px;
    object-fit: cover;
    object-position: 50% 50%;
    margin-bottom: 2px;
    filter: brightness(70%);
  }
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

ion-grid {
  --ion-grid-column-padding: 10px;
}
ion-card {
  padding: 0;
  margin: 0;
  box-shadow: none !important;
}

.container {
  position: relative;
}

.lock-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 10;
}

.item-type {
  position: absolute;
  left: 5px;
  top: 20px;
  z-index: 10;
}

ion-badge {
  border-radius: 2px;
  padding: 2px 3px;
}
ion-label {
  margin: 0.5px;
}
ion-button {
  margin: 0 auto;
  margin-bottom: 5px;
  --box-shadow: none !important;
}
ion-card-header {
  padding: 2px !important;
}

ion-text {
  margin: 5px;
}
</style>
