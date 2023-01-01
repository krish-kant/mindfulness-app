<template>
  <ion-grid class="ion-margin-start ion-margin-end">
    <ion-row class="scroll-items">
      <ion-col
        size="6"
        size-sm="3"
        size-lg="2"
        v-for="(items, index) in musicPlaylist"
        :key="items.title"
        class="container"
      >
        <div style="position: relative; overflow: hidden">
          <ion-img
            class="item-image"
            :src="musicPlaylist[index].imageUrl"
            :key="currentAudio"
          />
        </div>

        <ion-item lines="none">
          <ion-label class="ion-text-wrap">
            <p style="font-family: Brandon-regular">
              {{ musicPlaylist[index].duration }} |
              {{ musicPlaylist[index].type }}
            </p>
            <ion-text style="font-size: large">{{ musicPlaylist[index].title }}</ion-text>
          </ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup>
import { IonGrid, IonItem, IonRow, IonCol, IonLabel, IonBadge, IonImg } from "@ionic/vue";

import { defineProps } from "vue";

const props = defineProps({
  musicPlaylist: Array,
});

const onImageLoaded = function () {
  console.log("image loaded");
};
</script>

<style scoped>
.item-image {
  border-radius: 5px !important;
  overflow: hidden;
  z-index: 10;
  width: 100%;
  height: 100px;
  object-fit: cover;
  object-position: 50% 50%;
  /* filter: brightness(70%); */
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
  --margin: 0px;
}

ion-label {
  margin: 0.5px;
}

ion-grid {
  --ion-grid-column-padding: 10px;
}

.container {
  position: relative;
}

ion-badge {
  border-radius: 2px;
  padding: 2px 3px;
}

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
  flex-direction: column;
  flex-wrap: nowrap;
  white-space: nowrap;
  cursor: grab;
}

.scroll-items::-webkit-scrollbar {
  display: none;
}
</style>
