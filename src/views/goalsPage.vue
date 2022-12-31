<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-icon
            size="large"
            :icon="addCircle"
            slot="end"
            class="add-goals-icon"
            @click="() => router.push('/tabs/add-goals')"
          />
        </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="scroll-items">
        <ion-button color="dark" mode="ios">
          <ion-label>
            <ion-text style="font-family: Brandon-regular">Yoga And Anxity</ion-text>
          </ion-label>
        </ion-button>
        <ion-button
          mode="ios"
          color="dark"
          v-for="rec in dataList"
          :key="rec.title"
          fill="clear"
        >
          <ion-label>
            <ion-text style="font-family: Brandon-regular">{{ rec.title }}</ion-text>
          </ion-label>
        </ion-button>
      </div>
      <TilePlayList :goalsList="dataList" />
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
  IonFabButton,
  IonList,
  IonThumbnail,
  IonReorder,
} from "@ionic/vue";
import TilePlayList from "@/components/TilePlayList.vue";
import { lockClosed, bookmarkOutline, addCircle } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "@/stores/data";

const router = useRouter();
const { dataList } = useDataStore();
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
    flex-direction: column-reverse;
    justify-content: center;
  }
}

.scroll-items {
  overflow-x: scroll !important;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-top: 30px;
}

.scroll-items::-webkit-scrollbar {
  display: none;
}

.add-goals-icon {
  animation: rotation 1s 2s linear;
  margin-right: 10px;
}

ion-icon {
  color: white;
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 5px;
  --padding-start: 5px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --inner-padding-top: 0px;
  --background: none !important;
}

ion-toolbar {
  --background: var(--ion-color-whale);
}

@media (prefers-color-scheme: dark) {
  ion-toolbar {
    --ion-color-whale: #0a1629;
  }
}

ion-button {
  --border-radius: 5px;
}

img {
  z-index: 10;
  border-radius: 5px;
  object-fit: cover;
  object-position: 50% 50%;
  /* filter: brightness(70%); */
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
