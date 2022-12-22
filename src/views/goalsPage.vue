<template>
  <ion-page>
    <ion-header>
      <ion-toolbar mode="ios">
        <!-- <ion-item lines="none" class="add-goal-icon">
          <ion-icon class="add-goals-icon" @click="() => router.push('/tabs/add-goals')" slot="end"
            :icon="addCircleOutline"></ion-icon>
        </ion-item> -->
        <ion-grid>
          <ion-row class="scroll-items">
            <ion-col>


              <ion-button size="small" color="primary" @click="() => router.push('/tabs/add-goals')">
                <ion-icon class="add-goals-icon" :icon="addCircleOutline">
                </ion-icon>
              </ion-button>
              <ion-button size="small" color="light" v-for="n in dataList" :key="n.type" fill="outline">{{ n.type }}
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <ion-item lines="none" class="add-goal-icon"
        ><ion-icon
          class="add-goals-icon"
          @click="() => router.push('/tabs/tab3/add-goals')"
          slot="end"
          :icon="addCircleOutline"
        ></ion-icon
      ></ion-item> -->


      <TilePlay :musicPlaylist="dataList" />
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
} from "@ionic/vue";
import { lockClosed, bookmarkOutline, addCircleOutline } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "@/stores/data";

import TilePlay from "@/components/TilePlay.vue";

const router = useRouter();
const { dataList } = useDataStore();
</script>

<style scoped>
.scroll-items {
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: scroll !important;
  overflow-y: hidden;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  /* margin-top: 10px; */
}

.scroll-items ion-col {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.scroll-items::-webkit-scrollbar {
  display: none;
}

.add-goals-icon {
  animation: rotation 1s 2s linear;
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 0px;
  --padding-start: 0px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  /* --background: blue; */
  --inner-padding-top: 0px;
  --background: none !important;
}

ion-button {
  --border-radius: 5px;
}

.add-goals-icon {
  padding-right: 10px;
  padding-top: 5px;
}

ion-toolbar {
  --background: #607AA0
}

/* @keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
} */
</style>
