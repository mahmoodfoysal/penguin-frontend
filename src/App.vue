<script setup>
import { onMounted } from 'vue';
import { authChange } from './components/Authentication/authentication';
import NavBar from './modules/Shared/NavBar/NavBar.vue';
import PenguinFooter from './modules/Shared/PenguinFooter/PenguinFooter.vue';

onMounted(() => {
  authChange()
})
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <PenguinFooter></PenguinFooter>
</template>

<style scoped></style>
