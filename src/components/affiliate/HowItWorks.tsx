"use client";

import React from "react";
import HowItWorksCard from "./HowItWorksSwiper";
import demoImage from "@/assets/Affiliate/second-banner.png";
import serviceImage1 from "@/assets/Service/service-(1).jpg";
import serviceImage2 from "@/assets/Service/service-(2).jpg";
import serviceImage3 from "@/assets/Service/service-(3).jpg";
import serviceImage4 from "@/assets/Service/service-(4).jpg";

const HowItWorks = () => {
  const images = [
    demoImage,
    serviceImage1,
    serviceImage2,
    demoImage,
    serviceImage3,
    serviceImage4,
  ];
  return (
    <section className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 sm:px-6">
      {/* Heading */}
      <h2 className="text-4xl lg:text-[42px] font-bold mb-2">
        How It <span className="text-blue-600">Works</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 sm:mb-[60px] mt-4 sm:mt-[22px] max-w-md sm:max-w-xl mx-auto text-sm sm:text-base">
        From concept to completion, we build success through every step
      </p>

      {/* Tab-like stacked layers */}
      <div className="mt-[200px] md:mt-[131px] lg:mt-[61px] ">
        <HowItWorksCard images={images} />
      </div>

    </section>
  );
};

export default HowItWorks;