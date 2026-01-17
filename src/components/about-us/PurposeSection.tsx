// components/PurposeSection.tsx
"use client";
import { Eye, ListChecks, Handshake } from "lucide-react";
import Image from "next/image";
import believeImage from '@/assets/About-Us/believe-image.png'

export default function PurposeSection() {
  return (
    <section className="w-full bg-white dark:bg-black py-12">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-0">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Purpose & <span className="text-blue-600">Future</span>
          </h2>
          <p className="mt-3 text-gray-700 dark:text-gray-300 ">
            From concept to completion, we build success through every step
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left side */}
          <div className="space-y-8">
            {/* Mission */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1776ba73]">
                <Eye className="w-6 h-6 text-[#EE5F33] " />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                  Make provides an extensive range of services. Making Make
                  well-known and in great demand among insiders, Tech Element IT
                  continues to steer the firm with tenacity and ambition.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1776ba73]">
                <ListChecks className="w-6 h-6 text-[#EE5F33] " />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                  At Tech Element IT Limited, we aim to be a globally trusted
                  software and marketing agency—delivering innovative,
                  profit-boosting solutions for SMEs, affiliate, and B2B
                  businesses.
                </p>
              </div>
            </div>

            {/* Promises */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1776ba73]">
                <Handshake className="w-6 h-6 text-[#EE5F33] " />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Our Promises</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                  Make provides a wide range of services to assist customers in
                  reaching their objectives. Since Tech Element IT has led the
                  firm with tenacity and vision, Make has become well-known and
                  in-demand among insiders.
                </p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="rounded-[20px] overflow-hidden bg-[#0B0B2D]">
                <Image
                  src={believeImage}
                  alt="About Us Banner"
                  width={600}
                  height={400}
                  className="w-[280px] sm:w-[320px] md:w-[500px] h-auto"
                  priority
                />
              </div>
        </div>
      </div>
    </section>
  );
}
