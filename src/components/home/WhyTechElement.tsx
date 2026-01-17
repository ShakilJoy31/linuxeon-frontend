
"use client";

import { Phone } from "lucide-react";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import Button from "../reusable-components/Button";

export default function WhyTechElement() {
  const items = [
    {
      number: "01",
      title: "Professional Team",
      description:
        "Our team of skilled professionals brings a wealth of expertise and experience to deliver exceptional solutions that meet your specific requirements.",
    },
    {
      number: "02",
      title: "Innovative Solutions",
      description:
        "Our team of skilled professionals brings a wealth of expertise and experience to deliver exceptional solutions that meet your specific requirements.",
    },
    {
      number: "03",
      title: "ON Time Service",
      description:
        "Our team of skilled professionals brings a wealth of expertise and experience to deliver exceptional solutions that meet your specific requirements.",
    },
  ];

  return (
    <section className="bg-white dark:bg-black rounded-2xl px-4 md:px-10 py-12 lg:mx-4 md:mx-2 mx-1 mb-[5px] ">
      {/* Heading */}
      <div className="text-center mb-10">
        <Heading className="text-2xl md:text-3xl lg:text-4xl text-black dark:text-white font-bold">
          Why Tech{" "}
          <span className="text-blue-600">Element IT Ltd.</span>
        </Heading>
        <Paragraph className="text-gray-700 dark:text-gray-300 mt-3 max-w-3xl mx-auto">
          Choose Tech Element IT Ltd. for innovative solutions, tailored
          services, and exceptional user experiences that elevate your brand
        </Paragraph>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-[#F6F9FC] to-[#E9E9FF] hover:bg-none hover:border dark:bg-none dark:border dark:border-gray-500 hover:border-gray-500 rounded-3xl p-6 shadow-sm transition-all duration-300"
          >
            <span className="text-blue-600 font-medium">{item.number}</span>
            <Heading className="text-lg font-bold mt-2 text-black dark:text-white">{item.title}</Heading>
            <Paragraph className="text-gray-600 dark:text-gray-300 text-sm mt-3">{item.description}</Paragraph>
          </div>
        ))}
      </div>

      {/* Contact Button */}
      <div className="flex justify-center mt-10">
        <Button onClick={()=> {}} className="flex items-center gap-2 bg-[#1776BB] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          <Phone size={18} /> Contact us
        </Button>
      </div>
    </section>
  );
}
