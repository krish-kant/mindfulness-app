<template>
  <ion-page>
    <div class="card">
      <div id="blue-ocean-bg" class="blue-ocean">
        <div class="blue-ray"></div>
        <div class="blue-ray2"></div>
        <div class="blue-ray3"></div>
        <div class="blue-ray6"></div>
        <div class="blue-ray5"></div>
        <div class="blue-ray4"></div>
        <div class="blue-ray7"></div>
        <div class="blue-ray8"></div>
        <div class="blue-ray9"></div>
        <div class="blue-ray10"></div>
        <div class="blue-ray11"></div>
        <div class="blue-ray12"></div>
        <div class="blue-ray13"></div>
        <div class="blue-ray14"></div>
        <div class="blue-ray15"></div>
        <div class="blue-ray16"></div>
        <div class="blue-ray17"></div>
        <div class="blue-ray18"></div>
        <div class="blue-ray19"></div>
        <div class="blue-ray20"></div>
        <div id="blue-whale-bg" class="blue-whale">
          <div class="blue-whale-main">
            <div class="blue-whale-eye"></div>
            <div class="gill-container">
              <div class="blue-whale-gill"></div>
            </div>
            <div class="blue-whale-color"></div>
            <div class="blue-whale-color-bottom"></div>
          </div>
          <div class="blue-whale-backside">
            <div></div>
          </div>
          <div class="blue-whale-flipper"></div>
        </div>
        <div id="blue-whale-bg" class="blue-whale-small" style="scale: 0.5">
          <div class="blue-whale-main">
            <div class="blue-whale-eye"></div>
            <div class="gill-container">
              <div class="blue-whale-gill"></div>
            </div>
            <div class="blue-whale-color"></div>
            <div class="blue-whale-color-bottom"></div>
          </div>
          <div class="blue-whale-backside">
            <div></div>
          </div>
          <div class="blue-whale-flipper"></div>
        </div>
        <div id="blue-whale-bg" class="blue-whale-small-2" style="scale: 0.7">
          <div class="blue-whale-main">
            <div class="blue-whale-eye"></div>
            <div class="gill-container">
              <div class="blue-whale-gill"></div>
            </div>
            <div class="blue-whale-color"></div>
            <div class="blue-whale-color-bottom"></div>
          </div>
          <div class="blue-whale-backside">
            <div></div>
          </div>
          <div class="blue-whale-flipper"></div>
        </div>
      </div>
      <div
        class="profile-icon"
        @click="
          () => {
            router.push('/tabs/profile');
            hapticsImpactLight();
          }
        "
      >
        <ion-icon size="large" :icon="person" />
        <!-- <ion-label>profile</ion-label> -->
      </div>

      <div
        class="settings-icon"
        @click="
          () => {
            router.push('/tabs/profile');
            hapticsImpactLight();
          }
        "
      >
        <ion-icon size="large" :icon="settings" />
        <!-- <ion-label>profile</ion-label> -->
      </div>
    </div>

    <ion-content>
      <ion-item lines="none" class="ion-margin-top">
        <h2>Hi Krishna</h2>
      </ion-item>
      <NavItems />

      <ion-item lines="none">
        <h3 style="font-size: large">Recently Played</h3>
      </ion-item>
      <TileRecent :musicPlaylist="dataList" />

      <ion-item lines="none">
        <h3 style="font-size: large">Recently Played</h3>
      </ion-item>
      <TileRecent :musicPlaylist="dataList" />

      <ion-item lines="none">
        <h3 style="font-size: large">Top Rated</h3>
      </ion-item>
      <TilePlay :musicPlaylist="dataList" />

      <ion-item lines="none">
        <h3 style="font-size: large">Top Rated</h3>
      </ion-item>
      <TilePlay :musicPlaylist="dataList" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonText,
  IonLabel,
  IonIcon,
  IonTabButton,
} from "@ionic/vue";
import { settings, person } from "ionicons/icons";
import { useDataStore } from "@/stores/data";
import TilePlay from "@/components/TilePlay.vue";
import TileRecent from "@/components/TileRecent.vue";
import NavItems from "@/components/NavItems.vue";
import { useRouter } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const router = useRouter();
const { dataList } = useDataStore();

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"); /* Poppins font */

* {
  font-family: "Poppins", sans-serif;
}
@media (prefers-color-scheme: dark) {
  #blue-ocean-bg {
    --ion-color-whale: #081327;
    --ion-color-whale-light: #5f7494;
    --ion-color-whale-body: #16243f;
    --ion-color-whale-gill: #1f324c;
    --ion-color-whale-gill-1: #18253c;
    --ion-color-whale-eye: #040c17;
  }
}

ion-item {
  --padding-bottom: 0px;
  --padding-top: 0px;
  --padding-end: 20px;
  --padding-start: 20px;
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --inner-padding-bottom: 0px;
  --background: none;
  --inner-padding-top: 0px;
}

.card {
  position: relative;
  height: 15%;
  z-index: 1000;
}

.card-after {
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ececec;
  z-index: 1000;
  width: 100%;
  background-color: #f3f3f3;
}

.profile-icon {
  position: absolute;
  left: 3%;
  top: 50%;
  color: antiquewhite;
}

.settings-icon {
  position: absolute;
  right: 3%;
  top: 50%;
  color: antiquewhite;
}

@media only screen and (max-width: 600px) {
  .ios .blue-whale {
    margin-top: 20px;
  }
}

/* BLUE WHALE */

.blue-ocean {
  position: relative;
  background-color: var(--ion-color-whale);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.blue-ray {
  width: 8vmin;
  height: 105%;
  position: absolute;
  right: 2%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray2 {
  width: 6vmin;
  height: 105%;
  position: absolute;
  right: 20%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray3 {
  width: 2vmin;
  height: 105%;
  position: absolute;
  right: 12%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 6s linear infinite;
}

.blue-ray5 {
  width: 12vmin;
  height: 105%;
  position: absolute;
  right: 12%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 5s linear infinite;
}

.blue-ray9 {
  width: 5vmin;
  height: 105%;
  position: absolute;
  right: 29%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray10 {
  width: 7vmin;
  height: 105%;
  position: absolute;
  right: 34%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray11 {
  width: 6vmin;
  height: 105%;
  position: absolute;
  right: 37%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4.3s linear infinite;
}

.blue-ray12 {
  width: 5vmin;
  height: 105%;
  position: absolute;
  right: 42%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray13 {
  width: 6vmin;
  height: 105%;
  position: absolute;
  right: 48%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray13 {
  width: 8vmin;
  height: 105%;
  position: absolute;
  right: 55%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4.7s linear infinite;
}

.blue-ray14 {
  width: 7vmin;
  height: 105%;
  position: absolute;
  right: 48%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray15 {
  width: 10vmin;
  height: 105%;
  position: absolute;
  right: 60%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4.5s linear infinite;
}

.blue-ray16 {
  width: 3vmin;
  height: 105%;
  position: absolute;
  right: 70%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray17 {
  width: 5vmin;
  height: 105%;
  position: absolute;
  right: 74%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray18 {
  width: 7vmin;
  height: 105%;
  position: absolute;
  right: 80%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 5s linear infinite;
}

.blue-ray19 {
  width: 8vmin;
  height: 105%;
  position: absolute;
  right: 90%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4s linear infinite;
}

.blue-ray20 {
  width: 11vmin;
  height: 105%;
  position: absolute;
  right: 100%;
  transform: rotate(10deg);
  top: -8%;
  background: var(--ion-color-whale-light);
  /* Old browsers */
  background: -moz-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, var(--ion-color-whale-light)),
    color-stop(80%, var(--ion-color-whale)),
    color-stop(82%, var(--ion-color-whale)),
    color-stop(84%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale)),
    color-stop(100%, var(--ion-color-whale))
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* IE10+ */
  background: linear-gradient(
    to bottom,
    var(--ion-color-whale-light) 0%,
    var(--ion-color-whale) 80%,
    var(--ion-color-whale) 82%,
    var(--ion-color-whale) 84%,
    var(--ion-color-whale) 100%,
    var(--ion-color-whale) 100%
  );
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0);
  /* IE6-9 */
  opacity: 0.2;
  animation: raymove 4.5s linear infinite;
}

@keyframes raymove {
  0% {
    transform: rotate(10deg) translateX(60%);
    opacity: 0;
  }

  50% {
    transform: rotate(10deg) translateX(0%);
    opacity: 0.2;
  }

  100% {
    transform: rotate(10deg) translateX(-60%);
    opacity: 0;
  }
}

@-webkit-keyframes raymove {
  0% {
    transform: rotate(10deg) translateX(60%);
    opacity: 0;
  }

  50% {
    transform: rotate(10deg) translateX(0%);
    opacity: 0.2;
  }

  100% {
    transform: rotate(10deg) translateX(-60%);
    opacity: 0;
  }
}

.blue-whale {
  height: 7vmin;
  width: 13vmin;
  background-color: transparent;
  position: absolute;
  left: 0%;
  transform: translateX(-50%) rotate(0deg);
  border-radius: 0% 30% 5% 0%;
  top: 25%;
}

.blue-whale-small {
  height: 7vmin;
  width: 13vmin;
  background-color: transparent;
  position: absolute;
  left: -20%;
  transform: translateX(-50%) rotate(0deg);
  border-radius: 0% 30% 5% 0%;
  top: 15%;
}

.blue-whale-small-2 {
  height: 7vmin;
  width: 13vmin;
  background-color: transparent;
  position: absolute;
  left: -70%;
  transform: translateX(-50%) rotate(0deg);
  border-radius: 0% 30% 5% 0%;
  top: 60%;
}

.blue-whale:after {
  content: "";
  z-index: -1;
  width: 20vmin;
  height: 6vmin;
  position: absolute;
  transform: rotate(10deg);
  top: 30%;
  right: -6%;
  /* filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0); */
  opacity: 0.1;
}

.blue-whale-small:after {
  content: "";
  z-index: -1;
  width: 20vmin;
  height: 6vmin;
  position: absolute;
  transform: rotate(10deg);
  top: 30%;
  right: -6%;
  /* filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0); */
  opacity: 0.1;
}

.blue-whale-small-2:after {
  content: "";
  z-index: -1;
  width: 20vmin;
  height: 6vmin;
  position: absolute;
  transform: rotate(10deg);
  top: 30%;
  right: -6%;
  /* filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='var(--ion-color-whale-light)', endColorstr='var(--ion-color-whale)', GradientType=0); */
  opacity: 0.1;
}

.blue-whale-color {
  height: 2vmin;
  width: 17vmin;
  background-color: transparent;
  position: absolute;
  top: 4vmin;
  left: 1vmin;
  box-shadow: 2vmin -6vmin 6vmin var(--ion-color-whale-light);
  z-index: 1;
}

.blue-whale-color-bottom {
  height: 0.5vmin;
  width: 17vmin;
  background-color: transparent;
  position: absolute;
  top: 2.5vmin;
  left: 1vmin;
  box-shadow: -1vmin 4vmin 4vmin var(--ion-color-whale-body);
  z-index: 1;
}

@keyframes whale-move {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(2000%);
  }
}

@-webkit-keyframes whale-move {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(2000%);
  }
}

.blue-whale-main {
  height: 7vmin;
  width: 20vmin;
  background: var(--ion-color-whale-body);
  position: absolute;
  left: 30%;
  transform: translateX(-50%) rotate(0deg);
  border-radius: 0% 30% 2% 0%;
  transform-origin: 0% 50%;
  overflow: hidden;
  z-index: 1;
}

@keyframes whale-swim {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }

  25% {
    transform: translateX(-50%) rotate(-3deg);
  }

  50% {
    transform: translateX(-50%) rotate(0deg);
  }

  75% {
    transform: translateX(-50%) rotate(3deg);
  }

  100% {
    transform: translateX(-50%) rotate(0deg);
  }
}

@-webkit-keyframes whale-swim {
  0% {
    border-radius: 20% 0% 0% 100%;
  }

  50% {
    border-radius: 100% 0% 0% 20%;
  }

  100% {
    border-radius: 20% 0% 0% 100%;
  }
}

.blue-whale-backside {
  height: 7vmin;
  width: 12vmin;
  background: var(--ion-color-whale-body);
  position: absolute;
  left: -124%;
  border-radius: 0% 0% 0% 100%;
  overflow: hidden;
  /* box-shadow: inset 0vmin -2vmin 3vmin #71819A; */
}

.blue-whale-eye {
  height: 0.3vmin;
  width: 1vmin;
  background-color: var(--ion-color-whale-eye);
  position: absolute;
  right: 30%;
  top: 70%;
  border-radius: 50%;
}

.gill-container {
  background-color: transparent;
  height: 3vmin;
  width: 4vmin;
  -moz-border-radius: 150px 0 0 0;
  border-radius: 0 0 4vmin 0;
  position: absolute;
  left: 25%;
  top: 70%;
  transform-origin: 100% 100%;
  overflow: hidden;
}

.blue-whale-gill {
  background-color: var(--ion-color-whale-gill);
  height: 3vmin;
  width: 5vmin;
  -moz-border-radius: 150px 0 0 0;
  border-radius: 0 0 4vmin 0;
  position: absolute;
  animation: whale-gill 3s ease-in-out infinite;
  transform-origin: 100% 100%;
  transform: rotate(15deg);
}

@keyframes whale-gill {
  0% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  10% {
    height: 3vmin;
    box-shadow: none;
  }

  70% {
    height: 3vmin;
    box-shadow: none;
  }

  80% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  100% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }
}

@-webkit-keyframes whale-gill {
  0% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  10% {
    height: 3vmin;
    box-shadow: none;
  }

  70% {
    height: 3vmin;
    box-shadow: none;
  }

  80% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  100% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }
}

.blue-ocean .blue-whale-gill {
  animation: whale-gill1 3s ease-in-out infinite;
}

@keyframes whale-gill1 {
  0% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  10% {
    height: 3vmin;
    box-shadow: none;
  }

  70% {
    height: 3vmin;
    box-shadow: none;
  }

  80% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  100% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }
}

@-webkit-keyframes whale-gill1 {
  0% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  10% {
    height: 3vmin;
    box-shadow: none;
  }

  70% {
    height: 3vmin;
    box-shadow: none;
  }

  80% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }

  100% {
    height: 2vmin;
    box-shadow: 2px 2px 2px var(--ion-color-whale-gill);
  }
}

.blue-whale-flipper {
  left: -166%;
  top: -36%;
  position: absolute;
  width: 6vmin;
  height: 2.5vmin;
  background-color: var(--ion-color-whale-body);
  -moz-border-radius: 0px 20vmin 0px 20vmin;
  -webkit-border-radius: 0px 20vmin 0px 20vmin;
  border-radius: 0px 20vmin 0px 20vmin;
  transform-origin: 100% 100%;
  -webkit-transition: 0.4s ease-in-out;
  -moz-transition: 0.4s ease-in-out;
  -o-transition: 0.4s ease-in-out;
  transition: 0.4s ease-in-out;
  -webkit-transform: rotate(-23deg);
  -moz-transform: rotate(-23deg);
  -o-transform: rotate(-23deg);
  -ms-transform: rotate(-23deg);
  transform: rotate(-73deg);
  animation: flipper-simple 3s ease-in-out infinite;
}

.blue-whale-flipper:after {
  content: "";
  left: 0%;
  top: 0%;
  position: absolute;
  width: 6vmin;
  height: 2.5vmin;
  background-color: var(--ion-color-whale-body);
  -moz-border-radius: 0px 20vmin 0px 20vmin;
  -webkit-border-radius: 0px 20vmin 0px 20vmin;
  border-radius: 0px 20vmin 0px 20vmin;
  transform-origin: 100% 100%;
  -webkit-transition: 0.4s ease-in-out;
  -moz-transition: 0.4s ease-in-out;
  -o-transition: 0.4s ease-in-out;
  transition: 0.4s ease-in-out;
  transform: rotate(-20deg);
}

@keyframes whale-swim-back {
  0% {
    border-radius: 10% 0% 0% 100%;
  }

  25% {
    border-radius: 10% 0% 0% 100%;
  }

  50% {
    border-radius: 100% 0% 0% 10%;
  }

  75% {
    border-radius: 100% 0% 0% 10%;
  }

  100% {
    border-radius: 10% 0% 0% 100%;
  }
}

@-webkit-keyframes whale-swim-back {
  0% {
    border-radius: 20% 0% 0% 100%;
  }

  50% {
    border-radius: 100% 0% 0% 20%;
  }

  100% {
    border-radius: 20% 0% 0% 100%;
  }
}

@keyframes flipper-simple {
  0% {
    transform: rotate(-73deg);
  }

  25% {
    transform: rotate(-13deg);
  }

  70% {
    transform: rotate(-13deg);
  }

  100% {
    transform: rotate(-73deg);
  }
}

@-webkit-keyframes flipper-simple {
  0% {
    transform: rotate(-73deg);
  }

  25% {
    transform: rotate(-13deg);
  }

  50% {
    transform: rotate(-13deg);
  }

  100% {
    transform: rotate(-73deg);
  }
}

@keyframes flipper-move {
  0% {
    top: -35%;
    transform: rotate(-73deg);
  }

  25% {
    top: -35%;
    transform: rotate(25deg);
  }

  50% {
    top: 58%;
    transform: rotate(25deg);
  }

  75% {
    top: 58%;
    transform: rotate(-73deg);
  }

  100% {
    top: -35%;
    transform: rotate(-73deg);
  }
}

@-webkit-keyframes flipper-move {
  0% {
    top: -35%;
    transform: rotate(-73deg);
  }

  25% {
    top: -35%;
    transform: rotate(25deg);
  }

  50% {
    top: 58%;
    transform: rotate(25deg);
  }

  75% {
    top: 58%;
    transform: rotate(-73deg);
  }

  100% {
    top: -35%;
    transform: rotate(-73deg);
  }
}

.blue-ocean .blue-whale {
  animation: whale-move 60s linear infinite;
}

.blue-ocean .blue-whale-small {
  animation: whale-move 45s linear infinite;
}

.blue-ocean .blue-whale-small-2 {
  animation: whale-move 40s linear infinite;
}

.blue-ocean .blue-whale-main {
  animation: whale-swim 2s linear infinite;
}

.blue-ocean .blue-whale-backside {
  animation: whale-swim-back 2s linear infinite;
}

.blue-ocean .blue-whale-flipper {
  animation: flipper-move 2s linear infinite;
}
</style>
