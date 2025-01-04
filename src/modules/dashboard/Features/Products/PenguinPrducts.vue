<script setup>
import { onMounted, ref } from 'vue';
import { getProducts } from '../../api/products.js';

const isDetailsModal = ref(false);
const productList = ref([]);
const productDetails = ref({});

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

const handleProductDetails = (item) => {
  productDetails.value = item;
  isDetailsModal.value = true
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

            <span @click="handleProductDetails(item)" class="material-icons cursor info-icon">
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

  <!-- details modal  -->
  <nav class="navbar bg-light fixed-top">
    <div class="container-fluid">
      <div class="offcanvas offcanvas-end create-modal" tabindex="-1" id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel" :class="{ 'show': isDetailsModal }"
        :style="{ visibility: isDetailsModal ? 'visible' : 'hidden' }">
        <div class="offcanvas-header modal-header-style">
          <div class="d-flex align-items-center gap-3">
            <button type="button" class="btn-close" @click="isDetailsModal = false" aria-label="Close"></button>
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Product Details
            </h5>
          </div>
        </div>
        <div class="offcanvas-body">
          <!-- code write here  -->
          <div class="row row-cols-1 row-cols-md-12 g-4">
            <div class="col">
              <div class="card product-details-card mb-3">
                <img :src="productDetails.prod_image" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center mb-4 pt-4 modal-footer-style">
          <button @click="isDetailsModal = false" type="submit" class="submit-btn">
            Ok
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped src="./PenguinProducts.css"></style>
