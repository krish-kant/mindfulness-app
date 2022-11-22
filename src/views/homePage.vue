<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid class="ion-margin-start ion-margin-end">
        <ion-text>
          <h1>Hi Krishna</h1>
        </ion-text>

        <ion-row class="ion-justify-content-center">
          <ion-col
            class="navigation-items"
            size="4"
            size-sm="4"
            v-for="n in items"
            :key="n.message"
          >
            <div class="navigation-items-background">
              <img
                src="https://img.icons8.com/fluency-systems-regular/32/000000/yoga.png"
              />
              <div>{{ n.message }}</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="ion-margin-start ion-margin-end">
        <ion-text>
          <h3>Recently played</h3>
        </ion-text>

        <ion-row>
          <ion-col size="6" size-sm="3" v-for="n in recentlyPlayed" :key="n.message">
            <div class="container">
              <img alt="Silhouette of mountains" src="https://picsum.photos/600/400" />
              <div class="item-tag"></div>
            </div>

            <div class="recently-played-text">{{ n.message }}</div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="ion-margin-start ion-margin-end">
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
              <img alt="Silhouette of mountains" src="https://picsum.photos/600/400" />
              <div class="lock-icon">
                <ion-badge color="warning"
                  ><ion-icon :icon="lockClosed"></ion-icon
                ></ion-badge>
              </div>
              <div class="track-time">
                <ion-badge color="secondary">5 mins</ion-badge>
              </div>
              <div class="item-tag">
                <ion-badge>
                  <img
                    src="https://img.icons8.com/fluency-systems-regular/18/000000/yoga.png"
                /></ion-badge>
              </div>
            </div>

            <div class="bookmark-card-text">
              <ion-label class="recently-played-text"> {{ n.message }}</ion-label>
              <ion-icon
                class="bookmark-icon"
                size="large"
                :icon="bookmarkOutline"
              ></ion-icon>
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
  IonBadge,
} from "@ionic/vue";
import { lockClosed, bookmarkOutline } from "ionicons/icons";
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
  { message: "Yoga and mindfulness1" },
  {
    message:
      "Meditation and yoga Meditation, mindfulness, yoga Meditation and yoga Meditation and yoga Meditation, mindfulness, yoga",
  },
  { message: "Breethe" },
  { message: "Timer guided" },
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

.lock-icon {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1000;
  /* background-color: #e3c346; */
  padding: 5px;
  color: #ebad1c;
  font-weight: bold;
}

.track-time {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 1000;
  /* background-color: #e3c346; */
  padding: 5px;
  /* color: #ebad1c; */
  font-weight: bold;
}

.item-tag {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1000;
  /* background-color: #e3c346; */
  padding: 5px;
  /* color: #ebad1c; */
  font-weight: bold;
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

.grid-items {
  --ion-grid-padding: 2px;

  --ion-grid-column-padding: 2px;
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
  height: 60px;
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

.navigation-items {
  /* background-color: #edf9fb; */
  text-align: center;
  color: black;
  border-radius: 5px;
  margin-top: 10px;
}

.navigation-items-background {
  background-color: #2d8ece;
  padding: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 5px;
  color: #ffffff;
  background-image: linear-gradient(135deg, #008aff, #86d472);
  font-weight: 600;
  z-index: 2;
  cursor: pointer;
}

.navigation-items-background:hover {
  background-image: linear-gradient(135deg, #86d472, #008aff);
}

.recently-played-text {
  font-size: medium;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.bookmark-card-text {
  display: flex;
  justify-content: space-between;
  padding-top: 1px;
  margin-bottom: 5px;
}

.bookmark-icon {
  flex: 0 0 30px;
}
</style>
