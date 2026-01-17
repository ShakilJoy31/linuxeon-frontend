import Image from "next/image";
import aboutBannerImage from "@/assets/About-Us/Screenshot (971).png";
import { GoArrowDownRight } from "react-icons/go";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import AnimatedText from "../reusable-components/AnimatedText";

export default function AboutUsBanner() {
  return (
    <section className="bg-gradient-to-b from-[#003D64] to-[#0B0B2D] px-4 py-12 md:py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <div>
            <Heading className="flex items-center">
              <AnimatedText
                text="About Us"
                loop={true}
                loopDelay={5}
                speed={0.1}
                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-bold flex items-center justify-center md:justify-start gap-3 leading-tight"
              />


              <span className="text-2xl md:text-3xl lg:text-4xl">
                <GoArrowDownRight className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white " />
              </span>
            </Heading>
            <Paragraph >
              <AnimatedText
                text='Get To Know The People Behind The Pixels – Discover Our Story, Our
              Mission, And The Experts Powering Tech Element IT Limited.'
                loop={false}
                className="text-[#9F9FAF] mt-6 max-w-[480px] text-center md:text-left"
                speed={0.005}
              />

            </Paragraph>
          </div>

          {/* Right Image with Glow Effect */}
          <div className="relative flex justify-center md:justify-end lg:mb-[-105px] ">
            <div className="p-2 ">
              <div className="rounded-[20px] overflow-hidden bg-[#0B0B2D]">
                <Image
                  src={aboutBannerImage}
                  alt="About Us Banner"
                  width={600}
                  height={400}
                  className="w-[280px] sm:w-[320px] md:w-[500px] h-auto"
                  priority
                />
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
