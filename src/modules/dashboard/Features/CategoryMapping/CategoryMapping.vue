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
  catch(error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Category Mapping</span>
    <div class="d-flex align-items-center">
      <span class="material-icons">edit</span>
    </div>
  </div>




  <h4 class="text-center mb-3 heading-style">Category Mapping List</h4>
  <table class="table table-style">
    <thead>
      <tr>
        <th>SL</th>
        <th>Parent ID</th>
        <th>Parent Category Name</th>
        <th>Sub ID</th>
        <th>Sub Category Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="(item, index) in categoryList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item?.par_cat_id }}</td>
        <td>{{ item?.par_cat_name }}</td>


        <template v-for="(subItem, subIndex) in item?.sub_categories" :key="subIndex">
          <td>{{ subItem?.sub_cat_id }}</td>
          <td>{{ subItem?.sub_cat_name }}</td>
        </template>


        <td>
            <span @click="handleEdit(item)"
            class="material-icons ms-2 cursor me-2 edit-icon">
              edit
            </span>
            <span
            class="material-icons ms-2 cursor delete-icon">
              delete
            </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped src="./CategoryMapping.css"></style>
