<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-searchbar
            color="light"
            @click="() => router.push('/tabs/search')"
          ></ion-searchbar>
        </ion-item>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-datetime
              presentation="date"
              :multiple="true"
              :value="['2022-06-03', '2022-06-13', '2022-06-29']"
            >
            </ion-datetime>

            <TilePlayList />
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
  IonSearchbar,
} from "@ionic/vue";
import TilePlayList from "@/components/TilePlayList.vue";
</script>

<style scoped>
ion-toolbar {
  --background: var(--ion-color-whale);
}

.ios ion-toolbar {
  --padding-top: 10px !important;
  --padding-bottom: 0px !important;
}

@media (prefers-color-scheme: dark) {
  ion-toolbar {
    --ion-color-whale: #0a1629;
  }
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 0px;
  --padding-start: 0px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --background: none;
  --inner-padding-top: 0px;
}
</style>
