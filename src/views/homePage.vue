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

      <ion-grid>
        <ion-row>
          <ion-col size="6" size-sm="4" v-for="n in items" :key="n.message">
            <!-- <ion-icon :icon="time"></ion-icon>
                    <div>
                      <ion-label>{{ n.message }}</ion-label>
                    </div> -->
            <ion-button color="secondary" shape="round" expand="full">
              <ion-icon slot="start" :icon="time"></ion-icon>
              <ion-label>{{ n.message }}</ion-label>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="ion-margin">
        <ion-text color="">
          <h3>Recently played</h3>
        </ion-text>

        <ion-row>
          <ion-col
            size="6"
            size-sm="3"
            v-for="n in recentlyPlayed"
            :key="n.message"
          >
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />

            <ion-label class="recently-played-text">
              {{ n.message }}
            </ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="ion-margin">
        <ion-text color="">
          <h3>Top rated</h3>
        </ion-text>

        <ion-row class="ion-justify-content-start">
          <ion-col
            size="12"
            size-sm="6"
            size-lg="4"
            v-for="n in recentlyPlayed"
            :key="n.message"
          >
            <div class="container">
              <div class="tag">
                <ion-icon :icon="lockClosed"></ion-icon>
              </div>
            </div>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />
            <ion-item lines="none">
              <ion-label>
                {{ n.message }}
              </ion-label>
              <ion-icon :icon="bookmarkOutline"></ion-icon>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
      <!-- 

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
                  <ion-grid>
                    <ion-row>
                      <ion-col class="ion-text-start">
                        <ion-card-content>5 min</ion-card-content>

                        <ion-card-content>{{ n.message }}</ion-card-content>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                  <ion-icon :icon="bookmarkOutline" slot="end"></ion-icon>
                </ion-item>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid> -->
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
  margin: 8px;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-right: 10px;
}

ion-card-header {
  /* padding-left: 0px !important; */
  padding: 0px !important;
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

.recently-played-text {
  font-size: 14px;
  padding: 2px;
}

.recently-played-header {
  padding: 0px;
}

ion-grid {
  --ion-grid-padding: 10px;

  --ion-grid-padding-xs: 10px;
  --ion-grid-padding-sm: 20px;
  --ion-grid-padding-md: 20px;
  --ion-grid-padding-lg: 20px;
  --ion-grid-padding-xl: 20px;

  --ion-grid-column-padding: 10px;

  --ion-grid-column-padding-xs: 10px;
  --ion-grid-column-padding-sm: 30px;
  --ion-grid-column-padding-md: 30px;
  --ion-grid-column-padding-lg: 30px;
  --ion-grid-column-padding-xl: 30px;
}

/* ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
} */

img {
  border-radius: 5px;
}
ion-button {
  --border-radius: 5px;
}
ion-item {
  --padding-start: 0px;
  --padding-end: 0px;
}
</style>
