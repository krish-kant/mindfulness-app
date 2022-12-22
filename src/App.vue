<template>
  <ion-app class="backdrop-no-scroll">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style>
ion-app {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #414141;
}

@media (prefers-color-scheme: dark) {
  ion-app {
    max-width: 1200px;
    margin: 0 auto;
    background-color: black;
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
