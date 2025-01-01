<script setup>

</script>

<template>
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
</template>

<style scoped src="./ProductCategory.css"></style>
