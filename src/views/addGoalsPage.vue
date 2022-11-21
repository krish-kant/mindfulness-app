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
      <ion-grid class="ion-margin">
        <ion-item class="heading" lines="none">
          <h1>Add Goals</h1>
          <ion-button size="default" slot="end">Save</ion-button>
        </ion-item>
        <ion-row class="ion-justify-content-start">
          <ion-col size="12" size-sm="6" v-for="n in recentlyPlayed" :key="n.message">
            <ion-item lines="none">
              <ion-label> {{ n.message }}</ion-label>

              <ion-checkbox slot="end"></ion-checkbox>
            </ion-item>
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
} from "@ionic/vue";
import { ref } from "vue";

const recentlyPlayed = ref([
  { message: "Yoga and mindfulness 123 123 1345 73232 2323 2323" },
  { message: "Breethe" },
  { message: "Timer guided" },
  { message: "Yoga and mindfulness" },
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

ion-grid {
  --ion-grid-padding: 10px;

  --ion-grid-padding-xs: 2px;
  /* --ion-grid-padding-sm: 20px; */
  /* --ion-grid-padding-md: 20px;
  --ion-grid-padding-lg: 20px;
  --ion-grid-padding-xl: 20px; */

  --ion-grid-column-padding: 10px;

  --ion-grid-column-padding-xs: 5px;
  /* --ion-grid-column-padding-sm: 30px; */
  /* --ion-grid-column-padding-md: 30px;
  --ion-grid-column-padding-lg: 30px;
  --ion-grid-column-padding-xl: 30px; */
}

ion-item {
  /* background: transparent !important; */
  --background: url("https://picsum.photos/600/400") no-repeat center center / cover !important;
  --border-radius: 5px;
  color: #ffffff;
  --padding-bottom: 10px;
  --padding-top: 10px;
}
.heading {
  --background: none !important;
  color: black;
  --padding-bottom: 20px;
  --padding-top: 0px;
  --padding-end: 5px;
  --padding-start: 2px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  /* --background: blue; */
  --inner-padding-top: 0px;
}
</style>
