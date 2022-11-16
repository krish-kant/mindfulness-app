<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hi Krishna</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
    <ion-card-header>
      <!-- <ion-card-title>Card Title</ion-card-title> -->
      <!-- <ion-card-subtitle>Card Subtitle</ion-card-subtitle> -->
    </ion-card-header>

    <!-- <ion-card-content>
      Here's a small text description for the card content. Nothing more, nothing less.
    </ion-card-content> -->
  </ion-card>
  <ion-button class="ion-margin-start" fill="solid" size="large" >Solid</ion-button>
  <ion-button class="ion-margin-start" fill="solid" size="large" >Solid</ion-button>
  <ion-button class="ion-margin-start" fill="solid" size="large" >Solid</ion-button>
  <ion-button class="ion-margin-start" fill="solid" size="large" >Solid</ion-button>
  <ion-button class="ion-margin-start" fill="solid" size="large" >Solid</ion-button>
  <ion-button class="ion-margin-start" fill="solid" size="large" >Solid</ion-button>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";


</script>

<style scoped>
  /* iOS places the subtitle above the title */
  ion-card-header.ios {
    display: flex;
    flex-flow: column-reverse;
  }
</style>