"use client"

import { ArrowRight } from "lucide-react";
import Heading from "../reusable-components/Heading";
import AnimatedText from "../reusable-components/AnimatedText";
import Paragraph from "../reusable-components/Paragraph";
import settingsBanner from "../../../public/story-image-CtwEDlk9.png";
import Image from "next/image";
import Button from "../reusable-components/Button";
import { useRouter } from "next/navigation";


export default function OurStory() {
  const router = useRouter();

  return (
    <section className="bg-white dark:bg-black py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">

        {/* Right Side - 2/3 width */}
        <div className="md:w-3/5 ">
          <Heading className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EE5F33] mb-3 md:mb-4 leading-snug">
            Our Story
          </Heading>

          <Paragraph>
            <AnimatedText
              text='Welcome to Tech Element IT! Founded with a passion for innovation, we started as a small startup with a big vision—empowering businesses with cutting-edge web solutions. Over time, we have grown into a leading agency, delivering high-quality websites and web applications tailored to our clients’ needs. Our expertise spans e-commerce platforms, school management systems, POS systems, and personal websites, ensuring seamless digital experiences. At Tech Element IT, we measure success by our clients’ growth, continuously innovating to keep them ahead in the digital landscape. Let’s build the future together!'
              loop={false}
              speed={0.005}
            />
          </Paragraph>

          <Button onClick={()=> router.push('/contact')} className="flex items-center justify-center mt-6 gap-2 bg-[#1976d2] h-12 md:h-[50px] w-full sm:w-[200px] md:w-[231px] text-white font-semibold rounded-lg md:rounded-[16px] hover:bg-[#135ba4] transition text-sm md:text-base">
            Contact Us
            <ArrowRight size={18} className="md:size-[20px]" />
          </Button>
        </div>


        <div className="md:w-2/5 text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium">
          <Image
            src={settingsBanner}
            alt="Main banner image"
            width={500}
            height={500}
            className="object-cover w-full h-auto "
            priority
          />
        </div>

      </div>
    </section>
  );
}