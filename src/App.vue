<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style scoped>
ion-app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
