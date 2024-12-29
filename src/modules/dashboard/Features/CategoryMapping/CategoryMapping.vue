<script setup>
import { onMounted, ref } from 'vue';
import { getCategories } from '@/modules/dashboard/api/categories.js';

const categoryList = ref([]);

onMounted(() => {
  handleGetCategories()
});

const handleGetCategories = async () => {
  try {
    const result = await getCategories();
    categoryList.value = result.data?.list_data
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Category Mapping</span>
    <div class="d-flex align-items-center">
      <!-- <span class="material-icons">edit</span> -->
    </div>
  </div>

  <table class="table table-style">
    <thead>
      <tr>
        <th>#</th>
        <th class="text-center">Parent ID</th>
        <th>Parent Name</th>
        <th>Subcat ID</th>
        <th>Subcat Name</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in categoryList" :key="index">
        <tr>
          <td :rowspan="item.sub_categories.length || 1">{{ index + 1 }}</td>
          <td class="text-center" :rowspan="item.sub_categories.length || 1">{{ item.par_cat_id }}</td>
          <td :rowspan="item.sub_categories.length || 1">{{ item.par_cat_name }}</td>
          <td>{{ item.sub_categories[0]?.sub_cat_id }}</td>
          <td>{{ item.sub_categories[0]?.sub_cat_name }}</td>
        </tr>
        <tr v-for="(subItem, subIndex) in item.sub_categories.slice(1)" :key="subIndex">
          <td>{{ subItem.sub_cat_id }}</td>
          <td>{{ subItem.sub_cat_name }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped src="./CategoryMapping.css"></style>
