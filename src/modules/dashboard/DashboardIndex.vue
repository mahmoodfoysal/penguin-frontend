<script setup>
import DashboardSideBar from './DashboardSideBar/DashboardSideBar.vue';
import DashboardDetails from './DashboardDetails/DashboardDetails.vue';
</script>

<template>

  <div class="container">
    <div class="row ">
      <div class="col-xl-3 col-lg-4 col-md-5 dashboard-style">
        <DashboardSideBar></DashboardSideBar>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7 dashboard-style">
        <DashboardDetails></DashboardDetails>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-style {
  height: calc(100vh - 110px);
  overflow-y: auto;
  scrollbar-width: thin; /* For modern browsers (Firefox) */
  scrollbar-color: #cccccc #f5f5f5; /* For modern browsers (Firefox) */
}

/* For WebKit browsers (Chrome, Safari) */
.dashboard-style::-webkit-scrollbar {
  width: 8px;
}

.dashboard-style::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  border-radius: 4px;
}

.dashboard-style::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
</style>
