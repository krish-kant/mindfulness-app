<template>
  <ion-page>
    <ion-header>
      <!-- <ion-toolbar>
        <ion-title style="color: white">Login</ion-title>
      </ion-toolbar> -->
    </ion-header>
    <ion-content scroll-y="false">
      <WhaleAnimation style="position: absolute; top: 0px; left: 0px; height: 100%" />
      <div class="container">
        <div class="ion-text-center" style="z-index: 1; margin-bottom: 60px">
          <ion-text
            style="
              font-family: 'Tangerine', cursive;
              font-size: 48px;
              font-weight: bold;
              color: white;
            "
            >Moby</ion-text
          >
        </div>

        <!-- <ion-list inset="true" style="padding: 20px"> -->

        <ion-button
          style="width: 90%; display: flex; align-items: center"
          type="submit"
          color="light"
          @click.prevent="handleLogin('github')"
          ><div class="google-logo"></div>
          <ion-text style="margin-left: 10px">Sign in with Google</ion-text></ion-button
        >

        <ion-button
          style="width: 90%; display: flex; align-items: center"
          type="submit"
          color="light"
          @click.prevent="handleLogin('github')"
          ><div class="apple-logo"></div>
          <div style="margin-left: 10px">Sign in with Apple</div></ion-button
        >

        <form @submit.prevent="handleLogin" style="width: 90%; margin-bottom: 60px">
          <ion-item fill="outline" style="margin-top: 25px">
            <ion-label style="color: white" position="floating">Email</ion-label>
            <ion-input
              v-model="form.email"
              name="email"
              autocomplete
              type="email"
              style="color: white"
            ></ion-input>
          </ion-item>

          <ion-item fill="outline" style="margin-top: 5px">
            <ion-label style="color: white" position="floating">Password</ion-label>
            <ion-input
              v-model="form.password"
              name="password"
              autocomplete
              type="password"
              style="color: white"
            ></ion-input>
          </ion-item>

          <div>
            <ion-button
              style="width: 100%; margin-top: 50px"
              type="submit"
              color="success"
              ><ion-text style="color: white">Sign in</ion-text></ion-button
            >
            <div
              class="ion-text-center"
              style="
                margin-top: 20px;
                text-decoration: underline;
                cursor: pointer;
                color: white;
              "
              @click="navigateToForgotPassword"
            >
              Forgot Password?
            </div>

            <div
              class="ion-text-center"
              style="
                margin-top: 20px;
                text-decoration: underline;
                cursor: pointer;
                color: white;
              "
              @click.prevent="router.push('/register')"
            >
              Don't have an account? Sign up
            </div>
          </div>
        </form>

        <!-- </ion-list> -->
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup>
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/vue";
import WhaleAnimation from "@/components/WhaleAnimation.vue";
import { ref } from "vue";
import useAuthUser from "@/composables/useAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

// keep up with form data
const form = ref({
  email: "",
  password: "",
});

const navigateToForgotPassword = () => {
  router.push("/forgot-password");
  // window.location.reload();
};

// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async () => {
  console.log(form.value);
  try {
    // provider ? await loginWithSocialProvider(provider) : await login(form.value);
    await login(form.value);

    router.push("/tabs/home");
  } catch (error) {
    alert(error.message);
  }
};
</script>

<style scoped>
* {
  /* font-family: Brandon-regular; */
  font-family: Arial, Helvetica, sans-serif;
}

ion-list {
  background-color: #ffffff3f;
  /* opacity: 0.7; */
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
}

ion-button {
  --border-radius: 30px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
}

.google-logo {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNGRkMxMDciIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTJjMC02LjYyNyw1LjM3My0xMiwxMi0xMmMzLjA1OSwwLDUuODQyLDEuMTU0LDcuOTYxLDMuMDM5bDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzEyLjk1NSw0LDQsMTIuOTU1LDQsMjRjMCwxMS4wNDUsOC45NTUsMjAsMjAsMjBjMTEuMDQ1LDAsMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRjNEMDAiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOWw1LjY1Ny01LjY1N0MzNC4wNDYsNi4wNTMsMjkuMjY4LDQsMjQsNEMxNi4zMTgsNCw5LjY1Niw4LjMzNyw2LjMwNiwxNC42OTF6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzRDQUY1MCIgZD0iTTI0LDQ0YzUuMTY2LDAsOS44Ni0xLjk3NywxMy40MDktNS4xOTJsLTYuMTktNS4yMzhDMjkuMjExLDM1LjA5MSwyNi43MTUsMzYsMjQsMzZjLTUuMjAyLDAtOS42MTktMy4zMTctMTEuMjgzLTcuOTQ2bC02LjUyMiw1LjAyNUM5LjUwNSwzOS41NTYsMTYuMjI3LDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxOTc2RDIiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MWMwLjAwMS0wLjAwMSwwLjAwMi0wLjAwMSwwLjAwMy0wLjAwMmw2LjE5LDUuMjM4QzM2Ljk3MSwzOS4yMDUsNDQsMzQsNDQsMjRDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPgo8L3N2Zz4=")
    50% 50% no-repeat;
  background-size: 100%;
}

.apple-logo {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTAiIGhlaWdodD0iNTAiCnZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNS4xMiw1LjEyKSI+PHBhdGggZD0iTTQ0LjUyNzM0LDM0Ljc1Yy0xLjA3ODEyLDIuMzk0NTMgLTEuNTk3NjYsMy40NjQ4NCAtMi45ODQzNyw1LjU3ODEzYy0xLjk0MTQxLDIuOTUzMTMgLTQuNjc5NjksNi42NDA2MyAtOC4wNjI1LDYuNjY0MDZjLTMuMDExNzIsMC4wMjczNCAtMy43ODkwNiwtMS45NjQ4NCAtNy44Nzg5MSwtMS45Mjk2OWMtNC4wODU5NCwwLjAxOTUzIC00LjkzNzUsMS45Njg3NSAtNy45NTMxMiwxLjkzNzVjLTMuMzg2NzIsLTAuMDMxMjUgLTUuOTc2NTYsLTMuMzUxNTYgLTcuOTE3OTcsLTYuMzAwNzhjLTUuNDI5NjksLTguMjY5NTMgLTYuMDAzOTEsLTE3Ljk2NDg0IC0yLjY0ODQ0LC0yMy4xMjEwOWMyLjM3NSwtMy42NTYyNSA2LjEyODkxLC01LjgwNDY5IDkuNjU2MjUsLTUuODA0NjljMy41OTM3NSwwIDUuODUxNTYsMS45NzI2NiA4LjgyMDMxLDEuOTcyNjZjMi44ODI4MSwwIDQuNjM2NzIsLTEuOTc2NTYgOC43OTI5NywtMS45NzY1NmMzLjE0MDYzLDAgNi40NjA5NCwxLjcxMDk0IDguODM1OTQsNC42NjQwNmMtNy43NjU2Miw0LjI1NzgxIC02LjUwMzkxLDE1LjM0NzY2IDEuMzM5ODQsMTguMzE2NDF6TTMxLjE5NTMxLDguNDY4NzVjMS41MTE3MiwtMS45NDE0MSAyLjY2MDE2LC00LjY3OTY5IDIuMjQyMTksLTcuNDY4NzVjLTIuNDY0ODQsMC4xNjc5NyAtNS4zNDc2NiwxLjc0MjE5IC03LjAzMTI1LDMuNzgxMjVjLTEuNTI3MzQsMS44NTkzOCAtMi43OTI5Nyw0LjYxNzE5IC0yLjMwMDc4LDcuMjg1MTZjMi42OTE0MSwwLjA4NTk0IDUuNDc2NTYsLTEuNTE5NTMgNy4wODk4NCwtMy41OTc2NnoiPjwvcGF0aD48L2c+PC9nPgo8L3N2Zz4=")
    50% 50% no-repeat;
  background-size: 100%;
}

@media only screen and (min-width: 600px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    padding: 0px 150px;
  }
}
</style>
