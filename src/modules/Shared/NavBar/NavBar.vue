<script setup>
import { ref, computed } from 'vue';
import { logOut } from '@/components/Authentication/authentication.js';
import { useStore } from '@/store/index';

const isUser = ref(null);

const handleLogOut = () => {
  logOut();
  isUser.value = null;
  store?.setBerer(null)
};

const store = useStore()

isUser.value = sessionStorage.getItem('berer')

// const displayName = computed(() => store.userInfo?.displayName || 'Guest');
const photoURL = computed(() => store.userInfo?.photoURL);
// const email = computed(() => store.userInfo?.email || 'Guest');
</script>

<template>
  <div class="header_area sticky-header">
    <div class="main_menu">
      <nav class="navbar navbar-expand-lg navbar-light main_box">
        <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <a class="navbar-brand logo_h" href="">
            <RouterLink :to="{ name: 'Home' }">
              <img src="/src/assets/img/logo.png" alt="">
            </RouterLink>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul class="nav navbar-nav menu_nav ml-auto">
              <li class="nav-item active">
                <RouterLink :to="{ name: 'Home' }">
                  <a class="nav-link" href="">Home</a>
                </RouterLink>
              </li>
              <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Shop</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><a class="nav-link" href="category.html">Shop Category</a></li>
                  <li class="nav-item"><a class="nav-link" href="single-product.html">Product Details</a></li>
                  <li class="nav-item"><a class="nav-link" href="checkout.html">Product Checkout</a></li>
                  <li class="nav-item"><a class="nav-link" href="cart.html">Shopping Cart</a></li>
                  <li class="nav-item"><a class="nav-link" href="confirmation.html">Confirmation</a></li>
                </ul>
              </li>
              <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Blog</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                  <li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
                </ul>
              </li>
              <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Pages</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                  <li class="nav-item"><a class="nav-link" href="tracking.html">Tracking</a></li>
                  <li class="nav-item"><a class="nav-link" href="elements.html">Elements</a></li>
                </ul>
              </li>
              <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li class="nav-item"><a href="#" class="cart"><span class="material-icons">
                    shopping_cart
                  </span></a></li>
              <li class="nav-item">
                <button class="search"><span class="material-icons">
                    search
                  </span></button>
              </li>
              <RouterLink :to="{ name: 'Login' }">
                <li v-if="!store.berer" class="nav-item ">
                  <button class="search"><span class="material-icons">
                      person
                    </span></button>
                </li>
              </RouterLink>
              <div v-if="store.berer" class="dropdown d-flex align-items-center ms-3">
                <img :src="photoURL" alt="Avatar" class="dropdown-toggle avatar" data-bs-toggle="dropdown" />
                <ul class="dropdown-menu dropdown-menu-style">
                  <li><a class="dropdown-item" href="#">Profile</a></li>
                  <li><a class="dropdown-item" href="#">Address</a></li>
                  <li><a class="dropdown-item" href="#">Orders</a></li>
                  <li @click="handleLogOut"><a class="dropdown-item" href="#">Log Out</a></li>
                </ul>
              </div>

              <li title="Log Out" v-if="store.berer" class="nav-item m-0 p-0">
                <button @click="handleLogOut" class="search"><span class="material-icons">
                    logout

                  </span></button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
    <!-- <div class="search_input" id="search_input_box">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <input type="text" class="form-control" id="search_input" placeholder="Search Here">
          <button type="submit" class="btn"></button>
          <span class="material-icons" title="Close Search">search</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped src="./NavBar.css"></style>
