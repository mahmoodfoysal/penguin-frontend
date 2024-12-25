<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { authChange } from './components/Authentication/authentication';
import NavBar from './modules/Shared/NavBar/NavBar.vue';
import PenguinFooter from './modules/Shared/PenguinFooter/PenguinFooter.vue';
import AdminFooter from './modules/Shared/PenguinFooter/AdminFooter.vue';
const route = useRoute();

const hideClientFooter = computed(() => !route.meta.hideFooter);

const showAdminFooter = computed(() => route.meta.hideFooter);

onMounted(() => {
  authChange()
})
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
  <PenguinFooter v-if="hideClientFooter"></PenguinFooter>
  <AdminFooter v-if="showAdminFooter"></AdminFooter>
</template>

<style scoped></style>
