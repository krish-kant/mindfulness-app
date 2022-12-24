<template>
  <div>
    <audio
      ref="audioElement"
      :src="audioSrc"
      @timeupdate="updateTime"
      @ended="ended"
      @waiting="showLoading = true"
      @playing="showLoading = false"
    ></audio>

    <button @click="playPause">Play/Pause</button>
    <button v-if="showLoading" class="loading">Loading...</button>
    <button @click="skipPrevious">Skip Previous</button>
    <button @click="skipNext">Skip Next</button>
    <input
      type="range"
      min="0"
      max="100"
      v-model="progress"
      @input="changeProgress"
    />
    <span>{{ currentTime }} / {{ duration }}</span>
  </div>
</template>

<style>
.loading {
  display: inline-block;
  border: none;
  background-color: transparent;
  color: #333;
  font-size: 14px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";

const audioSrc = ref(
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
);
const currentTime = ref("0:00");
const duration = ref("0:00");
const progress = ref(0);
const audioElement = ref(null);
const showLoading = ref(false);
const skipTime = ref(10); //

function playPause() {
  if (audioElement.value.paused) {
    audioElement.value.play();
  } else {
    audioElement.value.pause();
  }
}

function updateTime() {
  currentTime.value = formatTime(audioElement.value.currentTime);
  duration.value = formatTime(audioElement.value.duration);
  progress.value =
    (audioElement.value.currentTime / audioElement.value.duration) * 100;
}

function ended() {
  currentTime.value = "0:00";
  duration.value = "0:00";
  progress.value = 0;
}

function changeProgress() {
  audioElement.value.currentTime =
    (progress.value / 100) * audioElement.value.duration;
}

function toggleLoading() {
  showLoading.value = !showLoading.value;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function skipPrevious() {
  audioElement.value.currentTime -= skipTime.value;
}

function skipNext() {
  audioElement.value.currentTime += skipTime.value;
}
onMounted(() => {
  audioElement.value = document.querySelector("audio");
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"); /* Poppins font */

* {
  font-family: "Poppins", sans-serif;
}
</style>
