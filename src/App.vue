<script setup>
import NavBar from './modules/Shared/NavBar/NavBar.vue';
import PenguinFooter from './modules/Shared/PenguinFooter/PenguinFooter.vue';
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <PenguinFooter></PenguinFooter>
</template>

<style scoped></style>
