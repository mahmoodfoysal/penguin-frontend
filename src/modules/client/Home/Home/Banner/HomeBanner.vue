<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const modules = [Navigation, Autoplay]
</script>

<template>
  <!-- start banner Area -->
  <section class="banner-area">
    <div class="container">
      <div class="row fullscreen align-items-center justify-content-start">
        <div class="col-lg-12">
          <div class="active-banner-slider owl-carousel">
            <!-- single-slide -->

            <swiper :navigation="true" :modules="modules" :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }" class="mySwiper">
              <swiper-slide v-for="n in 5" :key="n">
                <div class="row single-slide align-items-center d-flex">
                  <div class="col-lg-5 col-md-6">
                    <div class="banner-content">
                      <h1>Nike New <br>Collection!</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                      <div class="add-bag d-flex align-items-center">
                        <a class="add-btn" href=""><span class="material-icons">
                            add
                          </span></a>
                        <span class="add-text text-uppercase">Add to Bag</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="banner-img">
                      <img class="img-fluid" src="/src/assets/img/banner/banner-img.png" alt="">
                    </div>
                  </div>
                </div>
              </swiper-slide>

            </swiper>


          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End banner Area -->
</template>

<style scoped src="./HomeBanner.css"></style>
