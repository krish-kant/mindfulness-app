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
            @click="
              () => {
                hapticTouch();
                router.push('/tabs/add-goals');
              }
            "
          />
        </ion-item>
      </ion-toolbar>
    </ion-header>
    <div class="scroll-items-container">
      <div class="scroll-items">
        <ion-button color="secondary" mode="ios" @click="hapticTouch()">
          <ion-label>
            <ion-text style="font-family: Brandon-regular"
              >Dealing With Anxity and Depression
            </ion-text>
          </ion-label>
        </ion-button>
        <ion-button
          @click="hapticTouch()"
          mode="ios"
          fill="outline"
          color="dark"
          v-for="rec in dataList"
          :key="rec.title"
          style="margin-left: 2px"
        >
          <ion-label>
            <ion-text style="font-family: Brandon-regular">{{ rec.title }}</ion-text>
          </ion-label>
        </ion-button>
      </div>
    </div>
    <ion-content>
      <div style="margin-top: 30px">
        <TilePlayList :goalsList="dataList" />
      </div>
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
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const router = useRouter();
const { dataList } = useDataStore();

const hapticTouch = async function () {
  await Haptics.impact({ style: ImpactStyle.Light });
};
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

.scroll-items-container {
  background-color: var(--ion-color-light);
}

.scroll-items {
  overflow-x: scroll !important;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  /* flex-wrap: nowrap; */
  /* white-space: nowrap; */
  margin-bottom: 10px;
  margin-left: 10px;
  margin-top: 10px;
  background-color: transparent;
}

.scroll-items::-webkit-scrollbar {
  display: none;
}

.add-goals-icon {
  animation: rotation 1s 2s linear;
  margin-right: 0px;
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
