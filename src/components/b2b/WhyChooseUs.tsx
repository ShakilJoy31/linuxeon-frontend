"use client";

import { Eye, ListChecks, Handshake } from "lucide-react";
import b2bStatatics from '@/assets/b2b/b2b-2nd.png'
import Image from "next/image";

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <Eye className='text-[#EE5F33]' size={20} />,
      title: "Tailored Creative Solutions",
      description: "We provide custom design and development services aligned with each client’s brand, target audience, and business goals."
    },
    {
      id: 2,
      icon: <ListChecks className='text-[#EE5F33]' size={20} />,
      title: "Transparent & Timely Communication",
      description: "We ensure open discussions and regular updates at every stage of the project to avoid any misunderstandings."
    },
    {
      id: 3,
      icon: <Handshake className='text-[#EE5F33]' size={20} />,
      title: "Expertise in Agency-to-Agency Collaboration",
      description: "With proven experience in B2B partnerships, we specialize in joint project management and smooth co-delivery with other agencies."
    }
  ];
  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-0 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white ">
          Why Business <span className="text-blue-600">Choose us</span>
        </h2>
        <p className="text-gray-700 mt-3 dark:text-gray-300">
          From concept to completion, we build success through every step
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Features */}
        <div className="space-y-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1776BA] dark:bg-[#1776ba73] flex items-center justify-center text-gray-700">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                  {feature.title}
                </h3>
                <p className="text-gray-500 mt-1 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Mockup */}
        <div className="flex justify-center lg:justify-end">
          <Image
            height={1000}
            width={2000}
            src={b2bStatatics.src}
            alt="Business Mockup"
            className="rounded-3xl shadow-lg max-w-full "
          />
        </div>
      </div>
    </section>
  );
}
