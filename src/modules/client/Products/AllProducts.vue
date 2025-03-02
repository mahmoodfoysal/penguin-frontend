<script setup>
import { getProducts } from '../api/product.js';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import ProductCategory from '@/components/ProductCategory/ProductCategory.vue';
import ProductFilters from '@/components/ProductFilters/ProductFilters.vue';
import { computed, onMounted, ref } from 'vue';

const productList = ref([]);
const productCatID = ref(null)

onMounted(() => {
  handleGetProducts()
})

const handleGetProducts = async () => {
  try {
    const result= await getProducts();
    productList.value = result.data?.list_data.filter(item => item.status === 1);
  }
  catch(error) {
    console.log(error)
  }
};

const filteredProductList = computed(() => {
  if (!productCatID.value) {
    return productList.value;
  }
  return productList.value.filter(
    (item) =>
      item.par_cat_id == productCatID.value ||
      item.sub_cat_id == productCatID.value ||
      item.sub_sub_cat_id == productCatID.value
  );
});

</script>

<template>
  <div class="container dashboard-style">
    <div class="row ">
      <div class="col-xl-3 col-lg-4 col-md-5">
        <!-- category  -->
         <ProductCategory
         v-model:productCatID="productCatID"
         ></ProductCategory>
         <ProductFilters></ProductFilters>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7">
        <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between mb-2">
          <span>Products</span>
          <div class="d-flex align-items-center">

          </div>
        </div>
        <!-- product card  -->
        <div class="row">
          <div v-for="(item, index) in filteredProductList || []" :key="index" class="col-lg-3 col-md-6">
            <ProductCard
            :productInfo="item"
            ></ProductCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./AllProducts.css"></style>
