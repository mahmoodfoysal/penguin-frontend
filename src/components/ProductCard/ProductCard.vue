<script setup>
import { toRefs } from 'vue';
const props = defineProps({
  productInfo: {
    type: Array,
    default: () => []
  }
});

const {productInfo} = toRefs(props);

</script>

<template>
  <div class="single-product">
    <img class="img-fluid" :src="productInfo?.prod_image" alt="product-image">
    <div class="product-details">
      <h6>{{ productInfo?.prod_name }}</h6>
      <div class="price">
        <h6>{{ productInfo.price?.toFixed(2) }} {{ productInfo.currency_name }}</h6>
        <!-- <h6 class="l-through">210.00</h6> -->
      </div>
      <div class="prd-bottom">

        <a href="" class="social-info">
          <span class="material-icons">
            shopping_cart
          </span>
          <p class="hover-text">add to bag</p>
        </a>
        <a href="" class="social-info">
          <span class="material-icons">
            favorite_border
          </span>
          <p class="hover-text">Wishlist</p>
        </a>
        <a href="" class="social-info">
          <span class="material-icons">
            loop
          </span>
          <p class="hover-text">compare</p>
        </a>
        <a href="" class="social-info">
          <span class="material-icons">
            zoom_out_map
          </span>
          <p class="hover-text">view more</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ProductCard.css"></style>
