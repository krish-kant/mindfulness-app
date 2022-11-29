<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->

        <ion-text> </ion-text>

        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab2"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size-lg="10" class="ion-align-self-center">
            <ion-card v-if="dataLoaded">
              <img
                alt="Silhouette of mountains"
                :src="musicPlaylist[index].imageUrl"
              />
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              </ion-card-header>
              <ion-button
                @click="
                  () =>
                    router.push({
                      path: '/tabs/tab2/simplified-audio-player',
                      query: {
                        index: index,
                      },
                    })
                "
              >
                Click me
              </ion-button>

              <ion-card-content
                >{{ musicPlaylist[index].title }}
              </ion-card-content>
            </ion-card>

            <!-- <ion-item lines="none">
              <ion-label class="ion-text-wrap">
                <p>{{ musicPlaylist[index].duration }}</p>
                <h3>{{ musicPlaylist[index].title }}</h3>
              </ion-label>
              <ion-icon :icon="bookmarkOutline" />
            </ion-item> -->

            <!-- <div class="item-type">
              <ion-badge color="secondary">
                {{ musicPlaylist[index].type }}</ion-badge
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
} from "@ionic/vue";
import { lockClosedOutline, bookmarkOutline } from "ionicons/icons";
import { ref, defineProps, onMounted, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
let dataLoaded = ref(false);

let index = ref(0);

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

const onImageLoaded = function () {};

onMounted(() => {
  getUrlQueryParams();
});

const getUrlQueryParams = async () => {
  //router is async so we wait for it to be readyHi
  await router.isReady();
  //once its ready we can access the query params
  console.log(route.query);

  index.value = route.query.index;
  dataLoaded.value = true;
};
</script>

<style scoped>
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
</style>
