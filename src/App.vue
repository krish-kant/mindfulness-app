<template>
  <ion-app class="backdrop-no-scroll">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

ion-app {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #414141;
  font-family: "Roboto", sans-serif;
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
    font-family: "Roboto", sans-serif;
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
