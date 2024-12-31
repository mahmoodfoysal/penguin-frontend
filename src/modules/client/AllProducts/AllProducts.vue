<script setup>


</script>

<template>
  <div class="container dashboard-style">
    <div class="row ">
      <div class="col-xl-3 col-lg-4 col-md-5">
        <div class="sidebar-categories">
          <div class="head">Browse Categories</div>
          <ul class="main-categories sidebar-style">
            <li class="main-nav-list"><a data-toggle="collapse" href="" aria-expanded="false"
                aria-controls="fruitsVegetable"><span class="lnr lnr-arrow-right"></span>Home</a>
            </li>
            <li class="main-nav-list"><a data-toggle="collapse" href="" aria-expanded="false"
                aria-controls="fruitsVegetable"><span class="lnr lnr-arrow-right"></span>Home</a>
            </li>
            <li class="main-nav-list"><a data-toggle="collapse" href="" aria-expanded="false"
                aria-controls="fruitsVegetable"><span class="lnr lnr-arrow-right"></span>Home</a>
            </li>
            <li class="main-nav-list"><a data-toggle="collapse" href="" aria-expanded="false"
                aria-controls="fruitsVegetable"><span class="lnr lnr-arrow-right"></span>Home</a>
            </li>
            <!-- <li v-for="(item, index) in menuList" :key="index" class="main-nav-list">
        <a class="d-flex align-items-center" data-bs-toggle="collapse" :href="`#collapse-${index}`"
          :aria-expanded="false" :aria-controls="`collapse-${index}`">
          <span class="material-icons me-1">
            {{ item?.logo }}
          </span>
          {{ item?.name }}
        </a>
        <ul class="collapse" :id="`collapse-${index}`" :aria-labelledby="`collapse-${index}`"
          data-bs-parent=".main-nav-list">
          <li v-for="(subItem, subIndex) in item?.sub_menu" :key="subIndex" class="main-nav-list child">
            <RouterLink :to="{ name: subItem?.route_name }">
              <a href="" class="d-flex align-items-center">
                <span class="material-icons me-1">
                  {{ subItem?.logo }}
                </span>
                {{ subItem?.name }}
              </a>
            </RouterLink>
          </li>
        </ul>
      </li> -->
          </ul>
        </div>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7">
        <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
          <span>Parent Category</span>
          <div class="d-flex align-items-center">
            <button @click="handleCreate" class="d-flex align-items-center">
              Create New <span class="material-icons">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./AllProducts.css"></style>
