<template>
  <ion-grid class="ion-margin-start ion-margin-end">
    <ion-row class="ion-justify-content-center">
      <ion-col size="4" size-lg="2" class="ion-align-self-center">
        <ion-item
          lines="none"
          class="nav-items"
          @click="() => router.push('/tabs/library')"
        >
          <ion-label>
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5,1C5,3.7 6.56,6.16 9,7.32V22H11V15H13V22H15V7.31C17.44,6.16 19,3.7 19,1H17A5,5 0 0,1 12,6A5,5 0 0,1 7,1M12,1C10.89,1 10,1.89 10,3C10,4.11 10.89,5 12,5C13.11,5 14,4.11 14,3C14,1.89 13.11,1 12,1Z"
              />
            </svg>
            <p style="font-weight: 600">Yoga</p>
          </ion-label>
        </ion-item>
      </ion-col>

      <ion-col size="4" size-lg="2" class="ion-align-self-center">
        <ion-item
          lines="none"
          class="nav-items"
          @click="() => router.push('/tabs/library')"
        >
          <ion-label class="flex-container">
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 4C13.11 4 14 4.89 14 6S13.11 8 12 8 10 7.11 10 6 10.9 4 12 4M21 16V14C18.76 14 16.84 13.04 15.4 11.32L14.06 9.72C13.68 9.26 13.12 9 12.53 9H11.5C10.89 9 10.33 9.26 9.95 9.72L8.61 11.32C7.16 13.04 5.24 14 3 14V16C5.77 16 8.19 14.83 10 12.75V15L6.12 16.55C5.45 16.82 5 17.5 5 18.21C5 19.2 5.8 20 6.79 20H9V19.5C9 18.12 10.12 17 11.5 17H14.5C14.78 17 15 17.22 15 17.5S14.78 18 14.5 18H11.5C10.67 18 10 18.67 10 19.5V20H17.21C18.2 20 19 19.2 19 18.21C19 17.5 18.55 16.82 17.88 16.55L14 15V12.75C15.81 14.83 18.23 16 21 16Z"
              />
            </svg>
            <p style="font-weight: 600">Meditation</p>
          </ion-label>
        </ion-item>
      </ion-col>

      <ion-col size="4" size-lg="2" class="ion-align-self-center">
        <ion-item
          lines="none"
          class="nav-items"
          @click="() => router.push('/tabs/breathe')"
        >
          <ion-label>
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M15.47 3.11C15 2.85 14.37 3.05 14.11 3.54C14.04 3.68 14 3.84 14 4V6.59L13.29 5.88C13.1 5.69 13 5.44 13 5.18V1H11V5.17C11 5.44 10.9 5.69 10.71 5.88L10 6.59V4C10 3.44 9.54 3 9 3C8.83 3 8.67 3.04 8.53 3.11C4.72 5 2 9.97 2 15.77C2 17.67 2.33 19.55 3 21.32C3.19 21.85 3.76 22.13 4.29 21.94C4.34 21.92 4.39 21.9 4.44 21.87L9.5 19.07C9.81 18.9 10 18.56 10 18.19V9.41L11.3 8.12C11.69 7.73 12.32 7.73 12.71 8.12L14 9.42V18.2C14 18.56 14.21 18.9 14.5 19.08L19.58 21.88C20.07 22.14 20.68 21.96 20.94 21.46C20.96 21.42 21 21.37 21 21.32C21.67 19.55 22 17.67 22 15.77C22 9.97 19.29 5 15.47 3.11Z"
              />
            </svg>
            <p style="font-weight: 600">Breethe</p>
          </ion-label>
        </ion-item>
      </ion-col>

      <ion-col size="4" size-lg="2" class="ion-align-self-center">
        <ion-item
          lines="none"
          class="nav-items"
          @click="() => router.push('/tabs/library')"
        >
          <ion-label>
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z"
              />
            </svg>
            <p style="font-weight: 600">Sleep</p>
          </ion-label>
        </ion-item>
      </ion-col>

      <ion-col size="4" size-lg="2" class="ion-align-self-center">
        <ion-item
          lines="none"
          class="nav-items"
          @click="() => router.push('/tabs/search')"
        >
          <ion-label>
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.03 7.39L20.45 5.97C20 5.46 19.55 5 19.04 4.56L17.62 6C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13S7.03 22 12 22C17 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39M13 14H11V7H13V14M15 1H9V3H15V1Z"
              />
            </svg>
            <p style="font-weight: 600">Timer</p>
          </ion-label>
        </ion-item>
      </ion-col>

      <ion-col size="4" size-lg="2" class="ion-align-self-center">
        <ion-item
          lines="none"
          class="nav-items"
          @click="() => router.push('/tabs/search')"
        >
          <ion-label>
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11.35 8.5L11 5H16V1H18V5H23L21.62 18.79L11.35 8.5M1 21V22C1 22.55 1.45 23 2 23H15C15.55 23 16 22.55 16 22V21H1M21.9 21.9L2.1 2.1L.69 3.5L6.39 9.21C3.28 9.87 1 12 1 15H12.17L14.17 17H1V19H16V18.83L20.5 23.32L21.9 21.9Z"
              />
            </svg>
            <p style="font-weight: 600">Fasting</p>
          </ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup>
import { IonGrid, IonItem, IonRow, IonCol, IonLabel } from "@ionic/vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onImageLoaded = function () {
  console.log("image loaded");
};
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
  --inner-padding-top: 0px;
  --margin: 0px;
  /* --background: none; */
  --background: var(--ion-color-light);
  --border-radius: 5px;
  cursor: pointer;
  /* box-shadow: 2px 2px 2px 1px var(--ion-color-medium); */
}

ion-label {
  /* padding: 2px; */
  text-align: center;
  padding: 10px;
  margin: 0px;
}

ion-grid {
  --ion-grid-column-padding: 10px;
}

/* ion-col {
  background-color: aqua;
} */

ion-badge {
  border-radius: 2px;
}
</style>
