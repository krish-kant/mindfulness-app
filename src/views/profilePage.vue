<template>
  <ion-page>
    <div id="toolbar" class="tool-bar-custom">

    </div>
    <ion-content>
      <ion-header>
        <!-- <ion-toolbar>
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar> -->
      </ion-header>
      <ion-grid class="ion-margin">
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-datetime presentation="date" :multiple="true" :value="['2022-06-03', '2022-06-13', '2022-06-29']">
            </ion-datetime>
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
  IonList,
  IonReorderGroup,
  IonDatetime,
} from "@ionic/vue";
</script>

<style scoped>
.tool-bar-custom {
  background-color: var(--ion-color-whale);
  height: 15%;
  display: flex;
  flex-direction: column-reverse;
}

@media (prefers-color-scheme: dark) {
  #toolbar {
    --ion-color-whale: #0a1629;
  }
}

@media only screen and (min-width: 600px) {
  .tool-bar-custom {
    justify-content: center;
  }

}
</style>
