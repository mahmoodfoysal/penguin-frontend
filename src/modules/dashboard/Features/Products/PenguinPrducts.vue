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
          <th>Product Name</th>
          <th>Prod ID</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item?.prod_name }}</td>
          <td>{{ item?.prod_id }}</td>
          <td>{{ item?.price }} {{ item?.currency_name }}</td>
          <td>{{ item?.stock }} PC</td>
          <td>{{ item?.prod_type_name }}</td>

          <td>
            <div class="form-check form-switch">
              <input v-model="item.status" :value="item" :true-value="1" :false-value="0" class="form-check-input"
                type="checkbox" role="switch" id="flexSwitchCheckDisabled"
                @change="handleUpdateParentCategoryStatus(item)" />
            </div>
          </td>
          <td>

            <span class="material-icons cursor info-icon">
              info
            </span>
            <span @click="handleEdit(item)" class="material-icons ms-2 cursor edit-icon">
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
