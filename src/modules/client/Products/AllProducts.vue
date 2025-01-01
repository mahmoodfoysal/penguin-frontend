<script setup>
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import ProductCategory from '@/components/ProductCategory/ProductCategory.vue';
import ProductFilters from '@/components/ProductFilters/ProductFilters.vue';



</script>

<template>
  <div class="container dashboard-style">
    <div class="row ">
      <div class="col-xl-3 col-lg-4 col-md-5">
        <!-- category  -->
         <ProductCategory></ProductCategory>
         <ProductFilters></ProductFilters>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7">
        <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between mb-2">
          <span>Parent Category</span>
          <div class="d-flex align-items-center">
            <button @click="handleCreate" class="d-flex align-items-center">
              Create New <span class="material-icons">add</span>
            </button>
          </div>
        </div>
        <!-- product card  -->
        <div class="row">
          <div v-for="n in 10" :key="n" class="col-lg-3 col-md-6">
            <ProductCard></ProductCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./AllProducts.css"></style>
