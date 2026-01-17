// components/Steps.tsx
"use client";
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";

const steps = [
  {
    id: "001",
    icon: <FaUserPlus className="text-blue-600 text-2xl" />,
    title: "Register",
    description: "Create an account or log in to start your affiliate journey.",
  },
  {
    id: "002",
    icon: <FaLink className="text-blue-600 text-2xl" />,
    title: "Get Link",
    description:
      "Get your unique referral link that tracks your referrals and earnings.",
  },
  {
    id: "003",
    icon: <FaShareAlt className="text-blue-600 text-2xl" />,
    title: "Share",
    description:
      "Share your link via social media, email, or your website.",
  },
  {
    id: "004",
    icon: <FaMedal className="text-blue-600 text-2xl" />,
    title: "Earn",
    description:
      "Earn commission for every purchase made through your referral link",
  },
];

const Steps = () => {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center md:items-start">
            {/* Number */}
            <p className="text-blue-600 text-sm font-medium mb-2 relative">
              ({step.id})
            </p>
            <div className="h-[1px] w-full bg-gray-300 my-[22px] "></div>
            {/* Icon + Title */}
            <div className="flex items-center gap-2 mb-2">
              {step.icon}
              <h3 className="font-semibold text-lg">{step.title}</h3>
            </div>
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
