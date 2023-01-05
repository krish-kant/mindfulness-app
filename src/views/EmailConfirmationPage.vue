<template>
  <ion-page>
    <ion-content>
      <div>
        <h1 class="text-3xl">Thanks for registering!</h1>
        <p>
          Please confirm your email to finishing registering:
          {{ $route.query.email }}
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonItem } from "@ionic/vue";
</script>
>
