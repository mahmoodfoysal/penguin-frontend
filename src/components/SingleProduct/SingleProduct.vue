<script setup>
import { getProductDetails } from '@/modules/client/api/product.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const selectedTab = ref('description');
const productDetails = ref({});
const routeParamsId = ref(route.params.id);



onMounted(() => {
  handleProductDetails()
})

const handleSelectedTab = (tab) => {
  selectedTab.value = null;
  selectedTab.value = tab;
}

const handleProductDetails = async () => {
  try {
    const result = await getProductDetails(routeParamsId.value);
    productDetails.value = result.data?.details_data
  }
  catch (error) {
    console.log(error);
  }
};

</script>

<template>
  <!--================Single Product Area =================-->
  <div class="product_image_area">
    <div class="container">
      <div class="row s_product_inner">
        <div class="col-lg-6">
          <div class="s_Product_carousel">
            <div class="single-prd-item">
              <img class="img-fluid" :src="productDetails?.prod_image" alt="">
            </div>

          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="s_product_text">
            <h3>{{ productDetails?.prod_name }}</h3>
            <h2>{{ productDetails?.price }} {{ productDetails?.currency_name }}</h2>
            <ul class="list">
              <li>Brand: <span>{{ productDetails?.prod_brand }}</span></li>
              <li>Stock: <span>{{ productDetails?.stock }}</span></li>
            </ul>
            <p>{{ productDetails?.description }}</p>
            <div class="product_count">
              <label for="qty">Quantity:</label>
              <div class="d-flex justify-content-center align-items-center gap-2 quantity-style">
                <span class="material-icons">
                  remove
                </span>
                <span>1</span>
                <span class="material-icons">
                  add
                </span>
              </div>
            </div>
            <div class="card_area d-flex align-items-center cart-item">
              <button >Add to Cart</button>
              <span class="material-icons">
                favorite
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--================End Single Product Area =================-->

  <!--================Product Description Area =================-->
  <section class="product_description_area">
    <div class="container">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <button @click="handleSelectedTab('description')" :class="{ 'activeTab': selectedTab === 'description' }"
            class="nav-link nav-btn" role="tab">Description</button>
        </li>
        <li class="nav-item">
          <button @click="handleSelectedTab('specification')" :class="{ 'activeTab': selectedTab === 'specification' }"
            class="nav-link nav-btn" role="tab">Specification</button>
        </li>
        <li class="nav-item">
          <button @click="handleSelectedTab('comments')" :class="{ 'activeTab': selectedTab === 'comments' }"
            class="nav-link nav-btn">Comments</button>
        </li>
        <li class="nav-item">
          <button @click="handleSelectedTab('reviews')" :class="{ 'activeTab': selectedTab === 'reviews' }"
            class="nav-link nav-btn">Reviews</button>
        </li>
      </ul>
      <div class="tab-content">

        <div v-if="selectedTab == 'description'">
          <p>{{ productDetails?.description }}</p>
        </div>

        <div v-if="selectedTab == 'specification'">
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>
                    <h5>Width</h5>
                  </td>
                  <td>
                    <h5>128mm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Height</h5>
                  </td>
                  <td>
                    <h5>508mm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Depth</h5>
                  </td>
                  <td>
                    <h5>85mm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Weight</h5>
                  </td>
                  <td>
                    <h5>52gm</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Quality checking</h5>
                  </td>
                  <td>
                    <h5>yes</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Freshness Duration</h5>
                  </td>
                  <td>
                    <h5>03days</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>When packeting</h5>
                  </td>
                  <td>
                    <h5>Without touch of hand</h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Each Box contains</h5>
                  </td>
                  <td>
                    <h5>60pcs</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="selectedTab == 'comments'">
          <div class="row">
            <div class="col-lg-6">
              <div class="comment_list">
                <div class="review_item">
                  <div class="media">
                    <div class="d-flex">
                      <img src="/src/assets/img/product/review-1.png" alt="">
                    </div>
                    <div class="media-body">
                      <h4>Blake Ruiz</h4>
                      <h5>12th Feb, 2018 at 05:56 pm</h5>
                      <a class="reply_btn" href="#">Reply</a>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea
                    commodo</p>
                </div>
                <div class="review_item reply">
                  <div class="media">
                    <div class="d-flex">
                      <img src="/src/assets/img/product/review-2.png" alt="">
                    </div>
                    <div class="media-body">
                      <h4>Blake Ruiz</h4>
                      <h5>12th Feb, 2018 at 05:56 pm</h5>
                      <a class="reply_btn" href="#">Reply</a>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea
                    commodo</p>
                </div>
                <div class="review_item">
                  <div class="media">
                    <div class="d-flex">
                      <img src="/src/assets/img/product/review-3.png" alt="">
                    </div>
                    <div class="media-body">
                      <h4>Blake Ruiz</h4>
                      <h5>12th Feb, 2018 at 05:56 pm</h5>
                      <a class="reply_btn" href="#">Reply</a>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea
                    commodo</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="review_box">
                <h4>Post a comment</h4>
                <form class="row contact_form" action="contact_process.php" method="post" id="contactForm"
                  novalidate="novalidate">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" id="name" name="name" placeholder="Your Full name">
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="email" class="form-control" id="email" name="email" placeholder="Email Address">
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" id="number" name="number" placeholder="Phone Number">
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <textarea class="form-control" name="message" id="message" rows="1"
                        placeholder="Message"></textarea>
                    </div>
                  </div>
                  <div class="col-md-12 text-right">
                    <button type="submit" value="submit" class="btn primary-btn">Submit Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedTab == 'reviews'">
          <div class="row">
            <div class="col-lg-6">
              <div class="row total_rate">
                <div class="col-6">
                  <div class="box_total">
                    <h5>Overall</h5>
                    <h4>4.0</h4>
                    <h6>(03 Reviews)</h6>
                  </div>
                </div>
                <div class="col-6">
                  <div class="rating_list">
                    <h3>Based on 3 Reviews</h3>
                    <ul class="list">
                      <li><a href="#">5 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                            class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                      <li><a href="#">4 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                            class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                      <li><a href="#">3 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                            class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                      <li><a href="#">2 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                            class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                      <li><a href="#">1 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                            class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="review_list">
                <div class="review_item">
                  <div class="media">
                    <div class="d-flex">
                      <img src="/src/assets/img/product/review-1.png" alt="">
                    </div>
                    <div class="media-body">
                      <h4>Blake Ruiz</h4>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea
                    commodo</p>
                </div>
                <div class="review_item">
                  <div class="media">
                    <div class="d-flex">
                      <img src="/src/assets/img/product/review-2.png" alt="">
                    </div>
                    <div class="media-body">
                      <h4>Blake Ruiz</h4>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea
                    commodo</p>
                </div>
                <div class="review_item">
                  <div class="media">
                    <div class="d-flex">
                      <img src="/src/assets/img/product/review-3.png" alt="">
                    </div>
                    <div class="media-body">
                      <h4>Blake Ruiz</h4>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea
                    commodo</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="review_box">
                <h4>Add a Review</h4>
                <p>Your Rating:</p>
                <ul class="list">
                  <li><a href="#"><i class="fa fa-star"></i></a></li>
                  <li><a href="#"><i class="fa fa-star"></i></a></li>
                  <li><a href="#"><i class="fa fa-star"></i></a></li>
                  <li><a href="#"><i class="fa fa-star"></i></a></li>
                  <li><a href="#"><i class="fa fa-star"></i></a></li>
                </ul>
                <p>Outstanding</p>
                <form class="row contact_form" action="contact_process.php" method="post" id="contactForm"
                  novalidate="novalidate">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" id="name" name="name" placeholder="Your Full name"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Full name'">
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="email" class="form-control" id="email" name="email" placeholder="Email Address"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address'">
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" id="number" name="number" placeholder="Phone Number"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Phone Number'">
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <textarea class="form-control" name="message" id="message" rows="1" placeholder="Review"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Review'"></textarea>
                    </div>
                  </div>
                  <div class="col-md-12 text-right">
                    <button type="submit" value="submit" class="primary-btn">Submit Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--================End Product Description Area =================-->

  <!-- Start related-product Area -->
  <section class="related-product-area section_gap_bottom">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 text-center">
          <div class="section-title">
            <h1>Deals of the Week</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore
              magna aliqua.</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r1.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r2.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r3.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r5.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r6.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r7.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r9.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r10.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="single-related-product d-flex">
                <a href="#"><img src="/src/assets/img/r11.jpg" alt=""></a>
                <div class="desc">
                  <a href="#" class="title">Black lace Heels</a>
                  <div class="price">
                    <h6>$189.00</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="ctg-right">
            <a href="#" target="_blank">
              <img class="img-fluid d-block mx-auto" src="/src/assets/img/category/c5.jpg" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End related-product Area -->
</template>

<style scoped src="./SingleProduct.css"></style>
