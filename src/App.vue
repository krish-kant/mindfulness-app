<template>
  <ion-app class="backdrop-no-scroll">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");
* {
  font-family: "Poppins", sans-serif;
} */

@font-face {
  font-family: Brandon-bold;
  src: url("@/assets/fonts/Brandon_bold.otf");
}

@font-face {
  font-family: Brandon-regular;
  src: url("@/assets/fonts/Brandon_regular.otf");
}
@font-face {
  font-family: Brandon-italic;
  src: url("@/assets/fonts/Brandon_bold_italic.otf");
}

* {
  font-family: "Brandon-bold", sans-serif;
  /* font-family: "Brandon-regular", sans-serif; */
  /* font-family: "Brandon-italic", sans-serif; */
}

ion-app {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #414141;
}

ion-toolbar {
  --background: var(--ion-color-whale);
}

@media (prefers-color-scheme: dark) {
  ion-toolbar {
    --ion-color-whale: #0a1629;
  }
}

@media (prefers-color-scheme: dark) {
  ion-app {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #414141;
  }
}

@media only screen and (max-width: 1000px) {
  ion-content {
    width: calc(100% + 15px);
  }

  ion-content::part(scroll) {
    padding-right: 15px;
    overscroll-behavior: none;
  }
}
</style>
