<template>
  <ion-page>
    <ion-content>
      <form class="max-w-lg m-auto" @submit.prevent="handlePasswordReset()">
        <h1 class="text-3xl mb-5">Forgot Password?</h1>
        <label>Email <input v-model="email" type="email" /></label>
        <button>Send Reset Email</button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonItem } from "@ionic/vue";
import useAuthUser from "@/composables/useAuthUser";
import { ref } from "vue";

// use necessary composables
const { sendPasswordRestEmail } = useAuthUser();

// keep up with email
const email = ref("");

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
  await sendPasswordRestEmail(email.value);
  alert(`Password reset email sent to: ${email.value}`);
};
</script>
