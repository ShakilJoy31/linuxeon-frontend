import Image from "next/image";
import affiliateBanner from "@/assets/Affiliate/affiliate-banner.png";
import { GoArrowDownRight } from "react-icons/go";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import Button from "../reusable-components/Button";
import { HiSparkles } from "react-icons/hi";
import AnimatedText from "../reusable-components/AnimatedText";

export default function AffiliateBanner() {
    return (
        <section className="bg-gradient-to-b from-[#003D64] to-[#0B0B2D] px-4 py-12 md:py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-10">
                    {/* Left Content */}
                    <div>
                        <Heading className="flex items-center ">
                            <AnimatedText
                            text="Join The leading Affiliate Network-Maximize your Profits"
                            loop={true}
                            loopDelay={5}
                            className="text-white text-2xl mt-8 md:mt-0 sm:text-3xl md:text-4xl lg:text-[50px] font-bold flex items-center justify-center md:justify-start gap-3 leading-tight"
                        />
                            
                            <span className="text-2xl md:text-3xl lg:text-4xl text-white ">
                                <GoArrowDownRight className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                            </span>
                        </Heading>
                        <Paragraph>
                             <AnimatedText
                            text="Partner with us, unlock the potential for substantial passive income"
                            loop={false}
                            speed={0.005}
                            className="text-white mt-6 max-w-[480px] text-center md:text-left"
                        />
                            
                        </Paragraph>
                        <div className="mt-6 ">
                            <Button
                                className="bg-[#1776BB] max-w-[344px] hover:cursor-pointer flex justify-center hover:bg-[#0f5ed1] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium items-center gap-2 mx-auto lg:mx-0 transition text-sm sm:text-base"
                            >
                                <HiSparkles className="text-lg sm:text-xl" />
                                Join The Affiliate Program
                            </Button>

                        </div>
                    </div>

                    {/* Right Image with Glow Effect */}
                    <div className="relative flex justify-center md:justify-end">
                        
                           <div className="rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#0B0B2D] w-full max-w-[340px] sm:max-w-[400px] md:max-w-none">
                            <Image
                                src={affiliateBanner}
                                alt="Affiliate Banner"
                                width={704}
                                height={400}
                                className="w-full h-auto aspect-[704/400] object-cover"
                                priority
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}
