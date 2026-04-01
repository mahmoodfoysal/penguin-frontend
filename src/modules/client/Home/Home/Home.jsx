import React from "react";
import TopBanner from "../TopBanner/TopBanner";
import HomeCategory from "../HomeCategory/HomeCategory";
import NewArriveProducts from "../NewArriveProducts/NewArriveProducts";
import BestSeller from "../BestSeller/BestSeller";

const Home = () => {
  return (
    <div>
      <TopBanner></TopBanner>
      <HomeCategory></HomeCategory>
      <NewArriveProducts></NewArriveProducts>
      <BestSeller></BestSeller>
    </div>
  );
};

export default Home;
