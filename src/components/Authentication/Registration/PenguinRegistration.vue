<script setup>

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
							<RouterLink :to="{name: 'Login'}">
                <a class="primary-btn" href="registration.html">Please Login</a>
              </RouterLink>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="login_form_inner">
						<h3>Please Registration</h3>
						<form class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" id="name" name="name" placeholder="Full Name" @onfocus="placeholder = 'Full name'" @onblur="placeholder = 'Full name'">
							</div>
							<div class="col-md-12 form-group">
								<input type="email" class="form-control" id="name" name="name" placeholder="Email" @onfocus="placeholder = ''" @onblur="placeholder = 'Email'">
							</div>
              <div class="col-md-12 form-group">
								<input type="text" class="form-control" id="name" name="name" placeholder="Photo url" @onfocus="placeholder = ''" @onblur="placeholder = 'Photo url'">
							</div>
              <div class="col-md-12 form-group">
								<input type="tel" class="form-control" id="name" name="name" placeholder="Phone no" @onfocus="placeholder = ''" @onblur="placeholder = 'Phone no'">
							</div>
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" id="name" name="name" placeholder="Password" @onfocus="placeholder = ''" @onblur="placeholder = 'Password'">
							</div>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" class="primary-btn">Sign Up</button>

							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!--================End Login Box Area =================-->
</template>

<style scoped src="./PenguinRegistration.css"></style>
