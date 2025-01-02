<script setup>
import { onMounted, ref } from 'vue';
import { getProducts } from '../../api/products.js';

const productList = ref([]);

onMounted(() => {
  handleGetProducts()
});

const handleGetProducts = async () => {
  try {
    const result = await getProducts();
    productList.value = result.data?.list_data;
  }
  catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="filter-bar-style d-flex flex-wrap align-items-center justify-content-between">
    <span>Products</span>
    <div class="d-flex align-items-center">
      <button class="d-flex align-items-center">
        Create New <span class="material-icons">add</span>
      </button>
    </div>
  </div>

  <div class="table-wrapper">
    <table class="table table-style">
      <thead>
        <tr>
          <th>SL</th>
          <th>Category Name</th>
          <th>Category ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item?.par_cat_name }}</td>
          <td>{{ item?.par_cat_id }}</td>
          <td>
            <div class="form-check form-switch">
              <input v-model="item.status" :value="item" :true-value="1" :false-value="0" class="form-check-input"
                type="checkbox" role="switch" id="flexSwitchCheckDisabled"
                @change="handleUpdateParentCategoryStatus(item)" />
            </div>
          </td>
          <td>
            <span @click="handleEdit(item)" class="material-icons ms-2 cursor me-2 edit-icon">
              edit
            </span>
            <span class="material-icons ms-2 cursor delete-icon">
              delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped src="./PenguinProducts.css"></style>
