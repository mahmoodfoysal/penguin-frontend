<script setup>
import { getCategories } from '@/modules/dashboard/api/categories';
import { onMounted, ref } from 'vue';

const categoryList = ref([]);

onMounted(() => {
  handleCategoryList()
});

const handleCategoryList = async () => {
  try {
    const result = await getCategories();
    categoryList.value = result.data?.list_data;
  }
  catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="sidebar-categories">
    <div class="head">Browse Categories</div>
    <ul class="main-categories sidebar-style">
      <li v-for="(item, index) in categoryList || []" :key="index" class="main-nav-list">
        <a class="d-flex align-items-center ms-1" data-bs-toggle="collapse" :href="`#collapse-${index}`"
          :aria-expanded="false" :aria-controls="`collapse-${index}`">
          {{ item?.par_cat_name }}
          <span class="ms-1">(2)***</span>
        </a>
        <ul class="collapse" :id="`collapse-${index}`" :aria-labelledby="`collapse-${index}`"
          data-bs-parent=".main-nav-list">
          <li v-for="(subItem, subIndex) in item?.sub_categories || []" :key="subIndex" class="main-nav-list child">
            <a class="d-flex align-items-center ms-2" data-bs-toggle="collapse"
              :href="`#collapse-sub-${index}-${subIndex}`" :aria-expanded="false"
              :aria-controls="`collapse-sub-${index}-${subIndex}`">
              {{ subItem?.sub_cat_name }}
              <span class="ms-1">(2)***</span>
            </a>
            <ul class="collapse" :id="`collapse-sub-${index}-${subIndex}`"
              :aria-labelledby="`collapse-sub-${index}-${subIndex}`">
              <li v-for="(subSubItem, subSubIndex) in subItem?.sub_sub_categories || []" :key="subSubIndex"
                class="main-nav-list child">
                <a href="#" class="d-flex align-items-center ms-3">
                  {{ subSubItem?.sub_sub_cat_name }}
                  <span class="ms-1">(2)***</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>




</template>

<style scoped src="./ProductCategory.css"></style>
