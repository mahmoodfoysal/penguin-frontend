import React, { useEffect, useState } from "react";
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
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [productsRes, blogsRes] = await Promise.all([
          axiosSecure.get(`/api/penguin/get-product-list`),
          axiosSecure.get(`/api/penguin/get-blog-list`),
        ]);
        setProducts({ products: productsRes.data });
        setBlogs({ blogs: blogsRes.data });
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure]);

  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16">
      <TopBanner />
      <Features />
      <HomeCategory />
      <FeaturedItems productsData={products} isLoading={isLoading} />
      <NewArriveProducts productsData={products} isLoading={isLoading} />
      <Services />
      <BestSeller productsData={products} isLoading={isLoading} />
      <HowItWorks />
      <Statistics productsData={products} />
      <Testimonials />
      <BlogPreview blogsData={blogs} isLoading={isLoading} />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
