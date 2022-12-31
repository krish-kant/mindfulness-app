<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" style="color: white">
          <ion-back-button mode="md" defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content ref="itemContainer">
      <div v-if="dataLoaded">
        <img alt="Silhouette of mountains" :src="dataList[index].imageUrl" />
        <ion-badge color="light" class="share-item">
          <svg @click="shareLink" style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z"
            />
          </svg>
        </ion-badge>

        <ion-card
          class="ion-no-margin ion-no-padding"
          style="
            margin-top: -50px;
            border-radius: 20px;
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;
          "
        >
          <ion-card-header>
            <ion-text class="card-header">{{ dataList[index].title }}</ion-text>
            <ion-card-subtitle
              style="
                font-weight: 500;
                font-size: small;
                text-transform: uppercase;
                font-family: Brandon-regular;
              "
            >
              {{ dataList[index].duration }}
              |
              {{ dataList[index].type }}
            </ion-card-subtitle>
          </ion-card-header>
          <button
            @click="
              () => {
                hapticTouch();
                router.push({
                  path: `/tabs/audio-player/${dataList[index].title}`,
                });
              }
            "
          >
            <ion-icon :icon="play" />
            <ion-text style="margin-left: 5px">Play</ion-text>
          </button>
          <div style="margin: 30px">
            <ion-text style="font-size: large; font-family: Brandon-regular">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae sapiente
              porro nostrum soluta consectetur alias reiciendis ea, dolore debitis facilis
              quibusdam? Quibusdam assumenda iusto iste aperiam rerum ad, mollitia a.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit qui dolore
              iure tempora excepturi aliquam commodi, provident a quo. Eaque accusantium
              minima libero optio adipisci vel laudantium suscipit inventore saepe!
            </ion-text>
          </div>
          <!-- <ion-item lines="none" class="ion-margin">
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
                />
              </svg>
              <ion-text color="medium">
                <p>Donate</p>
              </ion-text>
            </ion-button>
          </ion-item> -->

          <ion-item lines="none">
            <ion-text
              class="heading-related-items"
              style="font-size: large; margin-left: 16px"
              >Related Items</ion-text
            >
          </ion-item>

          <TilePlay :musicPlaylist="dataListFilteredComp" />
        </ion-card>
      </div>
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
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/vue";

import TilePlay from "@/components/TilePlay.vue";

import { play } from "ionicons/icons";
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";

let { dataList } = useDataStore();

const router = useRouter();
const route = useRoute();
let dataLoaded = ref(false);

let index = ref(0);
let title = ref("");

const itemContainer = ref(null);

/* 
  watch for changes in the route params
  and update the index and title
*/

onMounted(() => {
  getUrlQueryParams();
});

/* 
  haptic feedback
*/

const hapticTouch = async function () {
  await Haptics.impact({ style: ImpactStyle.Light });
};

/* 
  share the link to the current page
*/

const shareLink = async function () {
  hapticTouch();
  await Share.share({
    title: "Hey! Check this out on Moby.",
    text: dataList[index].title,
    url: window.location.href,
    dialogTitle: "Share with buddies",
  });
};

/* 
  get the query params from the url
  this is needed because when we navigate to the same page with different params
  the onMounted hook is not called again
*/

const getUrlQueryParams = async () => {
  //router is async so we wait for it to be ready
  await router.isReady();
  //once its ready we can access the query params
  dataLoaded.value = true;
  title.value = dataList.filter((item) => item.title === route.params.title)[0].title;
  index = dataList.findIndex((item) => item.title === title.value);
};

/* 
  watch for changes in the route params and scroll to top of the page
  this is needed because when we navigate to the same page with different params
  the page does not scroll to top
*/

watch(
  () => route.params.title,
  () => {
    itemContainer.value.$el.scrollToTop();
  }
);

/* 
  filter the dataList to remove the current item
  this is needed because we are using the same component to display the current item
  and the related items
*/

const dataListFiltered = dataList.filter((obj) => {
  return obj.title != route.params.title;
});

/* 
  create a computed property to be used in the TilePlay component
*/

const dataListFilteredComp = computed({
  get() {
    return dataListFiltered;
  },
});
</script>

<style scoped>
/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}

ion-card {
  position: relative;
  animation: animateCard 0.2s 1;
  animation-direction: alternate;
  animation-timing-function: linear;
  box-shadow: none !important;
}
@keyframes animateCard {
  0% {
    bottom: 0px;
    top: 200px;
  }
  100% {
    bottom: 200px;
    top: 0px;
  }
}

img {
  overflow: hidden;
  z-index: 10;
  width: 100%;
  height: 350px;
  object-fit: cover;
  object-position: 50% 50%;
  /* filter: brightness(70%); */
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 5px;
  --padding-start: 5px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --inner-padding-top: 0px;
  --background: none !important;
}

ion-grid {
  /* --ion-grid-column-padding: 0px; */
  --ion-grid-padding: 0px;
}

ion-col {
  position: relative;
}

.share-item {
  position: absolute;
  right: 30px;
  top: 15px;
  z-index: 10;
}

ion-badge {
  border-radius: 5px;
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
button {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 20px auto;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--ion-color-whale);
  font-size: large;
  color: white;
}

button:active {
  transform: scale(0.99);
}
ion-content::part(scroll) {
  overscroll-behavior: contain;
}

.card-header {
  font-size: x-large;
  color: var(--ion-color-dark);
}

.heading-related-items {
  color: var(--ion-color-whale);
}
</style>
