<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const modules = [Navigation]
</script>

<template>
  <!-- start product Area -->
  <section class="owl-carousel active-product-area section_gap">


    <swiper :navigation="{
      nextEl: '.custom-next',
      prevEl: '.custom-prev'
    }" :modules="modules" class="mySwiper">

      <swiper-slide>

        <!-- single product slide -->
        <div class="single-product-slider">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6 text-center">
                <div class="d-flex align-items-center custon-div">
                  <span class="material-icons custom-prev">arrow_back</span>
                <div class="section-title">

                  <h1>Latest Products</h1>

                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore
                    magna aliqua.</p>
                </div>
                <span class="material-icons custom-next">arrow_forward</span>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p1.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
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
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p2.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p3.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">
                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p4.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p5.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p6.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p7.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p8.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <!-- single product slide -->
        <div class="single-product-slider">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6 text-center">
                <div class="d-flex align-items-center custon-div">
                  <span class="material-icons custom-prev">arrow_back</span>
                <div class="section-title">

                  <h1>Coming Products</h1>

                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore
                    magna aliqua.</p>
                </div>
                <span class="material-icons custom-next">arrow_forward</span>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p6.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p8.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p3.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p5.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p1.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p4.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p1.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                  <img class="img-fluid" src="../../../../../assets/img/product/p8.jpg" alt="">
                  <div class="product-details">
                    <h6>addidas New Hammer sole
                      for Sports person</h6>
                    <div class="price">
                      <h6>$150.00</h6>
                      <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">

                      <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                      </a>
                      <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>





    </swiper>

  </section>
  <!-- end product Area -->
</template>

<style scoped src="./LatestProducts.css"></style>
