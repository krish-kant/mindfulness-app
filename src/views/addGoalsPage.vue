<template>
  <ion-page ref="page">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <!-- <ion-buttons style="color: white">
          <ion-back-button mode="md" defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons> -->
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="open-modal" style="width: 1px" />
      <ion-modal
        ref="modal"
        backdropDismiss="false"
        trigger="open-modal"
        :presenting-element="presentingElement"
      >
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <ion-text style="color: white; font-family: Brandon-regular"
                >Add Goals</ion-text
              >
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="dismiss"
                ><svg style="width: 30px; height: 30px" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                  /></svg
              ></ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-grid>
          <ion-row class="ion-justify-content-start">
            <ion-col>
              <!-- <ion-item
                v-for="(rec, index) in musicPlaylist"
                :key="rec.title"
                @click="() => {}"
              >
                <ion-thumbnail slot="start">
                </ion-thumbnail>
                <ion-label class="ion-text-wrap">
                  <ion-text style="font-size: large">{{ rec.title }}</ion-text>
                </ion-label>
                <ion-toggle
                  slot="end"
                  :checked="true"
                  v-model="toggleEnabled"
                  @ionChange="onToggleChange($event, index)"
                ></ion-toggle>
              </ion-item> -->

              <ion-slides pager="true" :options="slideOpts" style="height: 100%">
                <ion-slide
                  v-for="(rec, index) in dataList"
                  :key="rec.title"
                  style="display: flex; flex-direction: column; margin-top: 0px"
                >
                  <img
                    :src="rec.imageUrl"
                    @ionImgDidLoad="ionImgDidLoad"
                    @click="navigateTo(index)"
                  />
                  <ion-item lines="none" color="none" style="width: 80%">
                    <ion-label class="ion-text-wrap" color="medium">
                      <ion-text style="font-size: x-large">{{ rec.title }}</ion-text>
                    </ion-label>
                  </ion-item>
                  <ion-toggle
                    :checked="true"
                    v-model="toggleEnabled"
                    @ionChange="onToggleChange($event, index)"
                  ></ion-toggle>
                </ion-slide>
              </ion-slides>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-modal>
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
  IonToggle,
  IonText,
  IonThumbnail,
  IonImg,
  IonList,
  IonModal,
  actionSheetController,
  IonSlides,
  IonSlide,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "@/stores/data";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const router = useRouter();

const presentingElement = ref(null);
const page = ref(null);
const modal = ref(null);
let toggleEnabled = ref(false);

const { dataList } = useDataStore();

function onToggleChange(event, index) {
  hapticTouch();
  console.log(event, index);
  if (event.checked) toggleEnabled.value = true;
  else toggleEnabled.value = false;

  // You can use this event to enable or disable a feature based on the toggle value
}

const hapticTouch = async function () {
  await Haptics.impact({ style: ImpactStyle.Light });
};

const slideOpts = {
  initialSlide: 0,
  // speed: 400,
  slidesPerView: 1,
  centeredSlides: true,
  // spaceBetween: 10,
  // freeMode: true,
  loop: true,
};

onMounted(() => {
  presentingElement.value = page.value.$el;
  document.getElementById("open-modal").click();
});

const dismiss = function () {
  hapticTouch();
  modal.value.$el.dismiss();
  router.go(-1);
};
</script>

<style scoped>
ion-item {
  --padding-bottom: 20px;
  --padding-top: 20px;
  --padding-end: 5px;
  --padding-start: 5px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  /* --background: var(--ion-color-light); */
  --inner-padding-top: 0px;
  /* --border-radius: 5px; */
}

ion-col {
  background: none;
}

.heading-item {
  --background: none !important;
}

img {
  z-index: 10;
  border-radius: 5px;
  object-fit: cover;
  object-position: 50% 50%;
}

ion-button {
  --border-radius: 5px;
}

ion-toggle {
  --background: #ddd;
  --background-checked: #ddd;

  --handle-background: #eb7769;
  --handle-background-checked: #95c34e;

  --handle-box-shadow: none;

  /* Required for iOS handle to overflow the height of the track */
  overflow: visible;
  contain: none;
  margin: 50px;
}

@media only screen and (max-width: 600px) {
  ion-toggle {
    margin-bottom: 110px;
  }
  img {
    height: 220px;
    width: 80%;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 30px;
  }
}

@media only screen and (min-width: 600px) and (max-width: 1199px) {
  ion-toggle {
    margin-bottom: 150px;
  }
  img {
    height: 350px;
    width: 80%;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 30px;
  }
}

@media only screen and (min-width: 1200px) {
  ion-toggle {
    margin-bottom: 50px;
  }
  img {
    height: 220px;
    width: 80%;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 30px;
  }
}

ion-thumbnail {
  background-color: #4eaec3ba;
}
</style>
