<template>
    <ion-page ref="page">
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons>
                    <ion-back-button defaultHref="/tabs/home"></ion-back-button>
                </ion-buttons>
                <ion-item lines="none">
                    <ion-segment value="default" mode="ios">
                        <ion-segment-button :value="!dataObj.switchGuided ? 'default' : ''"
                            @click="dataObj.switchGuided = false">
                            <ion-label>Player</ion-label>
                        </ion-segment-button>
                        <ion-segment-button :value="dataObj.switchGuided ? 'default' : ''"
                            @click="dataObj.switchGuided = true">
                            <ion-label>Guided</ion-label>
                        </ion-segment-button>
                    </ion-segment>
                </ion-item>
            </ion-toolbar>
        </ion-header>
        <ion-content>

            <ion-item lines="none" class="ion-margin" v-if=!dataObj.switchGuided>
                <ion-button size="default" color="secondary" @click="() => router.push('/tabs/breathe-player')"
                    style="width: 50%;margin:auto">
                    <ion-text>
                        <p>Open Breathe Player</p>
                    </ion-text>
                </ion-button>
            </ion-item>
            <div style="margin-top:20px">
                <TilePlay :musicPlaylist="dataObj.dataList" v-if=dataObj.switchGuided />
            </div>
        </ion-content>
    </ion-page>
</template>

/********************************** JS ***********************************/

<script setup>
import {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonButton,

} from "@ionic/vue";
import { reactive, ref, onMounted } from "vue";
import TilePlay from "@/components/TilePlay.vue";
import { useDataStore } from "@/stores/data";
import { useRouter } from "vue-router";

const router = useRouter();

const dataObj = reactive({
    switchGuided: false,
    dataList: useDataStore().dataList,
});



</script>

/********************************** CSS ***********************************/

<style scoped>
ion-buttons {
    position: absolute;
    top: 5px;
    left: 5px;
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
</style>
