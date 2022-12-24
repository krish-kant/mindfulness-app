<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Library</ion-title> -->
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab2"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar></ion-searchbar>

      <ion-grid>
        <ion-row class="scroll-items">
          <ion-col>
            <ion-button>Yoga</ion-button>
            <ion-button>Meditation</ion-button>
            <ion-button>Breethe</ion-button>
            <ion-button>Sleep</ion-button>
            <ion-button>Timer</ion-button>
            <ion-button>SOS</ion-button>
            <ion-button>Yoga</ion-button>
            <ion-button>Meditation</ion-button>
            <ion-button>Breethe</ion-button>
            <ion-button>Sleep</ion-button>
            <ion-button>SOS</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-list>
              <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->

              <ion-item
                button
                detail="false"
                v-for="n in recentlyPlayed"
                :key="n.message"
              >
                <ion-thumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://picsum.photos/600/400"
                  />
                </ion-thumbnail>
                <ion-label> {{ n.message }} </ion-label>
                <ion-icon
                  class="bookmark-icon"
                  :icon="bookmarkOutline"
                ></ion-icon>
              </ion-item>
            </ion-list>
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
} from "@ionic/vue";
import { ref } from "vue";
import { bookmarkOutline } from "ionicons/icons";
import { useRouter } from "vue-router";

const router = useRouter();

const recentlyPlayed = ref([
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga Meditation, mindfulness, yoga" },
  { message: "Breethe" },
  { message: "Timer guided" },
  { message: "Meditation and yoga Meditation, mindfulness, yoga" },
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga Meditation, mindfulness, yoga" },
  { message: "Timer guided" },
  { message: "Yoga and mindfulness" },
  { message: "Timer guided" },
  { message: "Yoga and mindfulness" },
  { message: "Yoga and mindfulness" },
  { message: "Yoga and mindfulness" },
  { message: "Yoga and mindfulness" },
]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"); /* Poppins font */

* {
  font-family: "Poppins", sans-serif;
}
ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 0px;
  --padding-start: 0px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  /* --background: blue; */
  --inner-padding-top: 0px;
}

.playlist-text {
  font-size: 20px;
  font-weight: 600;
  color: #4b90be;
  /* text-decoration: underline blue 5px; */
}

.wide-item {
  width: 1000px;
}

.scroll-items {
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: scroll !important;
  overflow-y: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scroll-items ion-col {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.scroll-items::-webkit-scrollbar {
  display: none;
}

ion-button {
  --border-radius: 5px;
}
</style>
