<script setup>
import { onMounted, ref } from 'vue';
import { googleSignIn, userCreate, authChange } from '../authentication.js';

const inputData = ref({});

onMounted(() => {
  authChange()
})

const handleGoogleLogin = async () => {
  googleSignIn()
};

const handleCreateNewUser = () => {
  userCreate(
    inputData.value?.email,
    inputData.value?.password,
    inputData.value?.displayName,
    inputData.value?.photoURL,
    inputData.value?.phone
  )
};

</script>

<template>
  <!--================Login Box Area =================-->
  <section class="login_box_area section_gap">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="login_box_img">
            <img class="img-fluid" src="/src/assets/img/login.jpg" alt="">
            <div class="hover">
              <h4>Already have an account?</h4>
              <p>Please Login...!!!</p>
              <RouterLink :to="{ name: 'Login' }">
                <a class="primary-btn" href="registration.html">Please Login</a>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="login_form_inner">
            <h3>Please Registration</h3>
            <div class="row login_form" action="contact_process.php" method="post" id="contactForm"
              novalidate="novalidate">
              <div class="col-md-12 form-group">
                <input v-model="inputData.displayName" type="text" class="form-control" id="name" name="name"
                  placeholder="Full Name" @onfocus="placeholder = 'Full name'" @onblur="placeholder = 'Full name'">
              </div>
              <div class="col-md-12 form-group">
                <input v-model="inputData.email" type="email" class="form-control" id="name" name="name"
                  placeholder="Email" @onfocus="placeholder = ''" @onblur="placeholder = 'Email'">
              </div>
              <div class="col-md-12 form-group">
                <input v-model="inputData.photoURL" type="text" class="form-control" id="name" name="name"
                  placeholder="Photo url" @onfocus="placeholder = ''" @onblur="placeholder = 'Photo url'">
              </div>
              <div class="col-md-12 form-group">
                <input v-model="inputData.phone" type="tel" class="form-control" id="name" name="name"
                  placeholder="Phone no" @onfocus="placeholder = ''" @onblur="placeholder = 'Phone no'">
              </div>
              <div class="col-md-12 form-group">
                <input v-model="inputData.password" type="password" class="form-control" id="name" name="name"
                  placeholder="Password" @onfocus="placeholder = ''" @onblur="placeholder = 'Password'">
              </div>
              <div class="col-md-12 form-group">
                <button @click="handleCreateNewUser" type="submit" value="submit" class="primary-btn">Sign Up</button>
                <p class="mt-2">or</p>
                <!-- google signin start -->
                <button @click="handleGoogleLogin" class="gsi-material-button">
                  <div class="gsi-material-button-state"></div>
                  <div class="gsi-material-button-content-wrapper">
                    <div class="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                        xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                        <path fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                        </path>
                        <path fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                        </path>
                        <path fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                        </path>
                        <path fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                        </path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span class="gsi-material-button-contents">Continue with Google</span>
                    <span style="display: none;">Continue with Google</span>
                  </div>
                </button>
                <!-- google signin end -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--================End Login Box Area =================-->
</template>

<style scoped src="./PenguinRegistration.css"></style>
