<script setup>

</script>

<template>


  <div class="sidebar-categories">
    <div class="head">Dashboard</div>
    <ul class="main-categories">

<RouterLink :to="{name: 'DashboardHomeDefault'}">
  <li class="main-nav-list"><a data-toggle="collapse" href="" aria-expanded="false"
          aria-controls="fruitsVegetable"><span class="lnr lnr-arrow-right"></span>Home</a>
      </li>
</RouterLink>

      <li class="main-nav-list">
        <a data-bs-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish">
          <span class="lnr lnr-arrow-right"></span>
          Meat and Fish
          <span class="number">(53)</span>
        </a>
        <ul class="collapse" id="meatFish" aria-labelledby="meatFish" data-bs-parent=".main-nav-list">
          <li class="main-nav-list child">
            <a href="#">Frozen Fish </a>
          </li>
          <li class="main-nav-list child">
            <a href="#">Dried Fish </a>
          </li>
          <li class="main-nav-list child">
            <a href="#">Fresh Fish </a>
          </li>
          <li class="main-nav-list child">
            <a href="#">Meat Alternatives</a>
          </li>
          <li class="main-nav-list child">
            <a href="#">Meat</a>
          </li>
        </ul>
      </li>

      <li class="main-nav-list"><a data-toggle="collapse" href="#cooking" aria-expanded="false"
          aria-controls="cooking"><span class="lnr lnr-arrow-right"></span>Cooking<span class="number">(53)</span></a>
        <ul class="collapse" id="cooking" data-toggle="collapse" aria-expanded="false" aria-controls="cooking">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat<span class="number">(11)</span></a></li>
        </ul>
      </li>
      <li class="main-nav-list"><a data-toggle="collapse" href="#beverages" aria-expanded="false"
          aria-controls="beverages"><span class="lnr lnr-arrow-right"></span>Beverages<span
            class="number">(24)</span></a>
        <ul class="collapse" id="beverages" data-toggle="collapse" aria-expanded="false" aria-controls="beverages">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat<span class="number">(11)</span></a></li>
        </ul>
      </li>
      <li class="main-nav-list"><a data-toggle="collapse" href="#homeClean" aria-expanded="false"
          aria-controls="homeClean"><span class="lnr lnr-arrow-right"></span>Home and Cleaning<span
            class="number">(53)</span></a>
        <ul class="collapse" id="homeClean" data-toggle="collapse" aria-expanded="false" aria-controls="homeClean">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat<span class="number">(11)</span></a></li>
        </ul>
      </li>
      <li class="main-nav-list"><a href="#">Pest Control<span class="number">(24)</span></a></li>
      <li class="main-nav-list"><a data-toggle="collapse" href="#officeProduct" aria-expanded="false"
          aria-controls="officeProduct"><span class="lnr lnr-arrow-right"></span>Office Products<span
            class="number">(77)</span></a>
        <ul class="collapse" id="officeProduct" data-toggle="collapse" aria-expanded="false"
          aria-controls="officeProduct">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat<span class="number">(11)</span></a></li>
        </ul>
      </li>
      <li class="main-nav-list"><a data-toggle="collapse" href="#beauttyProduct" aria-expanded="false"
          aria-controls="beauttyProduct"><span class="lnr lnr-arrow-right"></span>Beauty Products<span
            class="number">(65)</span></a>
        <ul class="collapse" id="beauttyProduct" data-toggle="collapse" aria-expanded="false"
          aria-controls="beauttyProduct">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat<span class="number">(11)</span></a></li>
        </ul>
      </li>
      <li class="main-nav-list"><a data-toggle="collapse" href="#healthProduct" aria-expanded="false"
          aria-controls="healthProduct"><span class="lnr lnr-arrow-right"></span>Health Products<span
            class="number">(29)</span></a>
        <ul class="collapse" id="healthProduct" data-toggle="collapse" aria-expanded="false"
          aria-controls="healthProduct">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat<span class="number">(11)</span></a></li>
        </ul>
      </li>
      <li class="main-nav-list"><a href="#">Pet Care<span class="number">(29)</span></a></li>
      <li class="main-nav-list"><a data-toggle="collapse" href="#homeAppliance" aria-expanded="false"
          aria-controls="homeAppliance"><span class="lnr lnr-arrow-right"></span>Home Appliances<span
            class="number">(15)</span></a>
        <ul class="collapse" id="homeAppliance" data-toggle="collapse" aria-expanded="false"
          aria-controls="homeAppliance">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat<span class="number">(11)</span></a></li>
        </ul>
      </li>
      <li class="main-nav-list"><a class="border-bottom-0" data-toggle="collapse" href="#babyCare" aria-expanded="false"
          aria-controls="babyCare"><span class="lnr lnr-arrow-right"></span>Baby Care<span
            class="number">(48)</span></a>
        <ul class="collapse" id="babyCare" data-toggle="collapse" aria-expanded="false" aria-controls="babyCare">
          <li class="main-nav-list child"><a href="#">Frozen Fish<span class="number">(13)</span></a></li>
          <li class="main-nav-list child"><a href="#">Dried Fish<span class="number">(09)</span></a></li>
          <li class="main-nav-list child"><a href="#">Fresh Fish<span class="number">(17)</span></a></li>
          <li class="main-nav-list child"><a href="#">Meat Alternatives<span class="number">(01)</span></a></li>
          <li class="main-nav-list child"><a href="#" class="border-bottom-0">Meat<span class="number">(11)</span></a>
          </li>
        </ul>
      </li>
    </ul>
  </div>

</template>

<style scoped src="./DashboardSideBar.css"></style>
