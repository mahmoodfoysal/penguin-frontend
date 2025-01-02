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

  <div class="table-wrapper">
    <table class="table table-style">
      <thead>
        <tr>
          <th>Sl</th>
          <th class="text-center">Parent ID</th>
          <th>Parent Name</th>
          <th>Subcat ID</th>
          <th>Subcat Name</th>
          <th class="text-center">SubSubcat ID</th>
          <th class="text-start">SubSubcat Name</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in categoryList" :key="index">
          <!-- Parent Category Row -->
          <tr>
            <td :rowspan="item.sub_categories.reduce((sum, sub) => sum + (sub.sub_sub_categories?.length || 1), 0)">{{
              index + 1 }}</td>
            <td class="text-center"
              :rowspan="item.sub_categories.reduce((sum, sub) => sum + (sub.sub_sub_categories?.length || 1), 0)">{{
                item.par_cat_id }}</td>
            <td :rowspan="item.sub_categories.reduce((sum, sub) => sum + (sub.sub_sub_categories?.length || 1), 0)">{{
              item.par_cat_name }}</td>
            <td>{{ item.sub_categories[0]?.sub_cat_id }}</td>
            <td>{{ item.sub_categories[0]?.sub_cat_name }}</td>
            <td>{{ item.sub_categories[0]?.sub_sub_categories?.[0]?.sub_sub_cat_id || '' }}</td>
            <td>{{ item.sub_categories[0]?.sub_sub_categories?.[0]?.sub_sub_cat_name || '' }}</td>
          </tr>

          <!-- Sub-Categories and Sub-Sub-Categories Rows -->
          <template v-for="(subItem, subIndex) in item.sub_categories" :key="`sub-${subIndex}`">
            <!-- First Row for Sub-Category -->
            <template v-if="subIndex !== 0">
              <tr>
                <td>{{ subItem.sub_cat_id }}</td>
                <td>{{ subItem.sub_cat_name }}</td>
                <td class="text-center">{{ subItem.sub_sub_categories?.[0]?.sub_sub_cat_id || '' }}</td>
                <td class="text-start">{{ subItem.sub_sub_categories?.[0]?.sub_sub_cat_name || '' }}</td>
              </tr>
            </template>

            <!-- Remaining Rows for Sub-Sub-Categories -->
            <template v-for="(subSubItem, subSubIndex) in subItem.sub_sub_categories?.slice(1) || []"
              :key="`subSub-${subIndex}-${subSubIndex}`">
              <tr>
                <td class="text-center" colspan="2"></td> <!-- Empty cells to align the structure -->
                <td class="text-center">{{ subSubItem.sub_sub_cat_id }}</td>
                <td class="text-start">{{ subSubItem.sub_sub_cat_name }}</td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </table>
  </div>


</template>

<style scoped src="./CategoryMapping.css"></style>
