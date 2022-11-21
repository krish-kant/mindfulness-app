<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid class="ion-margin-start ion-margin-end">
        <ion-item lines="none"
          ><ion-icon
            class="add-goals-icon"
            @click="() => router.push('/add-goals')"
            slot="end"
            :icon="addCircleOutline"
          ></ion-icon
        ></ion-item>

        <ion-row class="scroll-items">
          <ion-col>
            <ion-button>Yoga and mindfulness</ion-button>
            <ion-button v-for="n in recentlyPlayed" :key="n.message" fill="outline">{{
              n.message
            }}</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="ion-margin-start ion-margin-end">
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
              <ion-label> {{ n.message }}</ion-label>
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
} from "@ionic/vue";
import { lockClosed, bookmarkOutline, addCircleOutline } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const recentlyPlayed = ref([
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga Meditation" },
  { message: "Breethe" },
  { message: "Timer guided" },
  { message: "Meditation and yoga Meditation1" },
  { message: "Yoga and mindfulness" },
  { message: "Meditation and yoga Meditation2" },
  { message: "Timer guided1" },
  { message: "Yoga and mindfulness" },
  { message: "Timer guided2" },
  { message: "Yoga and mindfulness1" },
  { message: "Yoga and mindfulness2" },
  { message: "Yoga and mindfulness3" },
  { message: "Yoga and mindfulness4" },
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

.recently-played-text {
  font-size: 14px;
  padding: 2px;
}

.recently-played-header {
  padding: 0px;
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
  font-size: 14px;
  display: block;
  word-break: break-all;
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

.scroll-items {
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: scroll !important;
  overflow-y: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  margin-top: 10px;
}
.scroll-items ion-col {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.scroll-items::-webkit-scrollbar {
  display: none;
}

.add-goals-icon {
  animation: rotation 1s 2s linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
