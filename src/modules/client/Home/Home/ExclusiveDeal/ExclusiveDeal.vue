<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const modules = [Navigation, Autoplay]
</script>

<template>
  <!-- Start exclusive deal Area -->
  <section class="exclusive-deal-area">
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-6 no-padding exclusive-left">
          <div class="row clock_sec clockdiv" id="clockdiv">
            <div class="col-lg-12">
              <h1>Exclusive Hot Deal Ends Soon!</h1>
              <p>Who are in extremely love with eco friendly system.</p>
            </div>
            <div class="col-lg-12">
              <div class="row clock-wrap">
                <div class="col clockinner1 clockinner">
                  <h1 class="days">150</h1>
                  <span class="smalltext">Days</span>
                </div>
                <div class="col clockinner clockinner1">
                  <h1 class="hours">23</h1>
                  <span class="smalltext">Hours</span>
                </div>
                <div class="col clockinner clockinner1">
                  <h1 class="minutes">47</h1>
                  <span class="smalltext">Mins</span>
                </div>
                <div class="col clockinner clockinner1">
                  <h1 class="seconds">59</h1>
                  <span class="smalltext">Secs</span>
                </div>
              </div>
            </div>
          </div>
          <a href="" class="primary-btn">Shop Now</a>
        </div>
        <div class="col-lg-6 no-padding exclusive-right">


          <div class="active-exclusive-product-slider">
    <span class="material-icons custom-prev">arrow_back</span>
            <swiper :navigation="{
                nextEl: '.custom-next',
                prevEl: '.custom-prev'
              }" :modules="modules" :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }" class="mySwiper">

              <swiper-slide>
                <!-- single exclusive carousel -->
                <div class="single-exclusive-slider">
                  <img class="img-fluid" src="../../../../../assets/img/product/e-p1.png" alt="">
                  <div class="product-details">
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <h4>addidas New Hammer sole
                      for Sports person</h4>
                    <div class="add-bag d-flex align-items-center justify-content-center">
                      <a class="add-btn" href=""><span class="ti-bag"></span></a>
                      <span class="add-text text-uppercase">Add to Bag</span>
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <!-- single exclusive carousel -->
                <div class="single-exclusive-slider">
                  <img class="img-fluid" src="../../../../../assets/img/product/e-p1.png" alt="">
                  <div class="product-details">
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <h4>addidas New Hammer sole
                      for Sports person</h4>
                    <div class="add-bag d-flex align-items-center justify-content-center">
                      <a class="add-btn" href=""><span class="ti-bag"></span></a>
                      <span class="add-text text-uppercase">Add to Bag</span>
                    </div>
                  </div>
                </div>
              </swiper-slide>

            </swiper>
            <span class="material-icons custom-next">arrow_forward</span>
          </div>
</div>

        </div>
      </div>

  </section>
  <!-- End exclusive deal Area -->
</template>

<style scoped src="./ExclusiveDeal.css"></style>
