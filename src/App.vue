<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { authChange } from './components/Authentication/authentication';
import NavBar from './modules/Shared/NavBar/NavBar.vue';
import PenguinFooter from './modules/Shared/PenguinFooter/PenguinFooter.vue';
const route = useRoute();

const showFooter = computed(() => !route.meta.hideFooter);

onMounted(() => {
  authChange()
})
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <PenguinFooter v-if="showFooter"></PenguinFooter>
</template>

<style scoped></style>
