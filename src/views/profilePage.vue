<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-title>Profile</ion-title> -->
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <!-- <ion-toolbar>
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar> -->
      </ion-header>
      <ion-grid class="ion-margin"
        ><ion-row class="ion-justify-content-center"
          ><ion-col>
            <ion-datetime
              presentation="date"
              :multiple="true"
              :value="['2022-06-03', '2022-06-13', '2022-06-29']"
            ></ion-datetime> </ion-col></ion-row
      ></ion-grid>
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
  IonList,
  IonReorderGroup,
  IonDatetime,
} from "@ionic/vue";
</script>

<style scoped></style>
