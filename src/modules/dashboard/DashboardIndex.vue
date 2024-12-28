<script setup>
import DashboardSideBar from './DashboardSideBar/DashboardSideBar.vue';
import DashboardDetails from './DashboardDetails/DashboardDetails.vue';
</script>

<template>

  <div class="container dashboard-style">
    <div class="row ">
      <div class="col-xl-3 col-lg-4 col-md-5">
        <DashboardSideBar></DashboardSideBar>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7">
        <DashboardDetails></DashboardDetails>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-style {
  height: calc(100vh - 110px);

}
</style>
