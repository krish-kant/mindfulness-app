<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-title>Home</ion-title> -->
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hi Krishna</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid class="ion-margin-top">
        <ion-row>
          <ion-col size="6" size-sm="4" v-for="n in items" :key="n.message">
            <ion-card class="card-items">
              <ion-card-header>
                <ion-item lines="none">
                  <ion-icon class="icon-item" :icon="time"></ion-icon>
                  <ion-label>{{ n.message }}</ion-label>
                </ion-item>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-item lines="none">
          <ion-text color="">
            <h3>Recently played</h3>
          </ion-text>
        </ion-item>
        <ion-row class="ion-justify-content-start">
          <ion-col
            size="6"
            size-sm="3"
            v-for="n in recentlyPlayed"
            :key="n.message"
          >
            <ion-card>
              <img
                alt="Silhouette of mountains"
                src="https://ionicframework.com/docs/img/demos/card-media.png"
              />

              <ion-card-header class="recently-played-header">
                <ion-item lines="none">
                  <ion-text class="recently-played-text">{{
                    n.message
                  }}</ion-text>
                </ion-item>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-item lines="none">
          <ion-text color="">
            <h3>Top rated</h3>
          </ion-text>
        </ion-item>
        <ion-row class="ion-justify-content-start">
          <ion-col
            size="12"
            size-sm="6"
            size-lg="4"
            v-for="n in recentlyPlayed"
            :key="n.message"
          >
            <ion-card>
              <div class="container">
                <div class="tag">
                  <ion-icon :icon="lockClosed"></ion-icon>
                </div>
                <img
                  alt="Silhouette of mountains"
                  src="https://ionicframework.com/docs/img/demos/card-media.png"
                />
              </div>
              <ion-card-header>
                <ion-item lines="none">
                  <ion-label>{{ n.message }}</ion-label>
                  <ion-icon :icon="bookmarkOutline" slot="end"></ion-icon>
                </ion-item>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { time, lockClosed, bookmarkOutline } from "ionicons/icons";
import { ref } from "vue";

const items = ref([
  { message: "Yoga" },
  { message: "Meditation" },
  { message: "Breethe" },
  { message: "Timer" },
  { message: "SOS" },
  { message: "Sleep" },
]);

const recentlyPlayed = ref([
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga" },
  { message: "Breethe" },
  { message: "Timer guided" },
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga" },
]);
</script>

<style scoped>
/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}

.card-items {
  text-align: center;
  margin: 6px;
  padding-top: 8px;
  padding-bottom: 8px;
}

ion-card-header {
  padding: 2px !important;
}

.container {
  position: relative;
}

.tag {
  float: right;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1000;
  /* background-color: #e3c346; */
  padding: 5px;
  color: #ebad1c;
  font-weight: bold;
}

.icon-item {
  padding-right: 5px;
}

.recently-played-text {
  font-size: 14px;
  padding: 0px;
}

.recently-played-header {
  padding: 0px;
}
</style>
