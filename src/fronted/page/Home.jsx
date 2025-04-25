import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Featuture from "../components/Featuture";
import NewArrivals from "../components/NewArrivals";
import Footer from "../components/Footer";
import LastProduct from "../components/LastProduct";
import SaleBanner from "../components/SaleBanner";

const Home = () => {
  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* hero */}
      <Hero />
      {/* feature */}
      {/* <Featuture /> */}
      <Featuture />
      {/* new arrivals */}
      <NewArrivals />
      {/* sale banner */}
      <SaleBanner />
      {/* last product */}
      <LastProduct />
      {/* footer */}
      <Footer />
    </>
  );
};

export default Home;
