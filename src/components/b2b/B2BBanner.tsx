import Image from "next/image";
import b2bBannerImage from "@/assets/b2b/b2b-banner.png";
import { GoArrowDownRight } from "react-icons/go";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import Button from "../reusable-components/Button";
import { HiSparkles } from "react-icons/hi";
import AnimatedText from "../reusable-components/AnimatedText";

export default function B2BBanner() {
    return (
        <section className="bg-gradient-to-b from-[#003D64] to-[#0B0B2D] px-4 py-12 md:py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-10">
                    {/* Left Content */}
                    <div className="mt-6 md:mt-0">
                        <Heading className="flex items-center ">
                            <AnimatedText
                                text="Scaling Brands via B2B Solutions"
                                loop={true}
                                loopDelay={5}
                                className="text-white text-2xl sm:text3xl md:text-5xl lg:text-[60px] font-bold flex items-center justify-center md:justify-start gap-3 leading-tight"
                            />


                            <span className="text-2xl md:text-3xl lg:text-4xl text-white">
                                <GoArrowDownRight className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                            </span>
                        </Heading>
                        <Paragraph>
                            <AnimatedText className="text-[#9F9FAF] mt-6 max-w-[480px] text-center md:text-left"
                                text='Get to Know the People Behind the Pixels - Discover Our Story, Our Mission, and the Experts Powering Tech Element IT Limited.'
                                loop={false}
                                speed={0.005}
                            />

                        </Paragraph>
                        <div className="mt-6 ">
                            <Button
                                className="bg-[#1776BB] w-[344px] hover:cursor-pointer flex justify-center hover:bg-[#0f5ed1] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium items-center gap-2 mx-auto lg:mx-0 transition text-sm sm:text-base"
                            >
                                <HiSparkles className="text-lg sm:text-xl" />
                                Contact Us
                            </Button>
                        </div>
                    </div>

                    {/* Right Image with Glow Effect */}
                    <div className="relative flex justify-center md:justify-end lg:mb-[-105px] ">
                        <div className="p-2 ">
                            <div className="rounded-[20px] overflow-hidden bg-[#0B0B2D]">
                                <Image
                                    src={b2bBannerImage}
                                    alt="About Us Banner"
                                    width={600}
                                    height={400}
                                    className="w-[360px] sm:w-[400px] md:w-[701px] h-[388px] md:h-[438px] lg:h-[488px] "
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




// rounded-[24px] bg-gradient-to-tr from-[#4B6BFB] via-[#7B61FF] to-[#FF6BFA]