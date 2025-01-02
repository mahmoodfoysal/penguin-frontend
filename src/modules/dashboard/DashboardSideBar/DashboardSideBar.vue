<script setup>

import { onMounted, ref } from 'vue';
import { getDashboardMenu } from '../api/menu.js';
import { useRoute } from 'vue-router';

const menuList = ref([]);
const activeTab = ref('DashboardHomeDefault');
const route = useRoute()


onMounted(() => {
  handleGetDashboardMenu();
  handleActiveRoute();
});

const handleGetDashboardMenu = async () => {
  try {
    const result = await getDashboardMenu();
    menuList.value = result.data?.list_data
  }
  catch (error) {
    console.log(error);
  }
};

const handleActiveRoute = (item) => {
  activeTab.value = item || route.name;
};

</script>

<template>
  <div class="sidebar-categories">
    <div class="head">Dashboard</div>
    <ul class="main-categories sidebar-style">

      <RouterLink :to="{ name: 'DashboardHomeDefault' }">
        <li @click="handleActiveRoute('DashboardHomeDefault')" class="main-nav-list"><a
            :class="{ 'activeLink': activeTab == 'DashboardHomeDefault' }" data-toggle="collapse" href="#"
            aria-expanded="false" aria-controls="fruitsVegetable"><span class="lnr lnr-arrow-right"></span>Home</a>
        </li>
      </RouterLink>

      <li v-for="(item, index) in menuList" :key="index" class="main-nav-list">
        <a class="d-flex align-items-center" data-bs-toggle="collapse" :href="`#collapse-${index}`"
          :aria-expanded="false" :aria-controls="`collapse-${index}`">
          <span class="material-icons me-1">
            {{ item?.logo }}
          </span>
          {{ item?.name }}
        </a>
        <ul class="collapse" :id="`collapse-${index}`" :aria-labelledby="`collapse-${index}`"
          data-bs-parent=".main-nav-list">
          <li v-for="(subItem, subIndex) in item?.sub_menu" :key="subIndex"
            @click="handleActiveRoute(subItem?.route_name)" class="main-nav-list child">
            <RouterLink :to="{ name: subItem?.route_name }">
              <a href="#" :class="{ 'activeLink': subItem?.route_name == activeTab }" class="d-flex align-items-center">
                <span class="material-icons me-1">
                  {{ subItem?.logo }}
                </span>
                {{ subItem?.name }}
              </a>
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped src="./DashboardSideBar.css"></style>
