import React from "react";
import TopBanner from "../TopBanner/TopBanner";
import Features from "../Features/Features";
import HomeCategory from "../HomeCategory/HomeCategory";
import FeaturedItems from "../FeaturedItems/FeaturedItems";
import NewArriveProducts from "../NewArriveProducts/NewArriveProducts";
import Services from "../Services/Services";
import BestSeller from "../BestSeller/BestSeller";
import HowItWorks from "../HowItWorks/HowItWorks";
import Statistics from "../Statistics/Statistics";
import Testimonials from "../Testimonials/Testimonials";
import BlogPreview from "../BlogPreview/BlogPreview";
import FAQ from "../FAQ/FAQ";
import Newsletter from "../Newsletter/Newsletter";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16">
      <TopBanner></TopBanner>
      <Features></Features>
      <HomeCategory></HomeCategory>
      <FeaturedItems></FeaturedItems>
      <NewArriveProducts></NewArriveProducts>
      <Services></Services>
      <BestSeller></BestSeller>
      <HowItWorks></HowItWorks>
      <Statistics></Statistics>
      <Testimonials></Testimonials>
      <BlogPreview></BlogPreview>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
