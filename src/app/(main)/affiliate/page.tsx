
import HowItWorks from "@/components/affiliate/HowItWorks";
import ReferralLink from "@/components/affiliate/ReferralLink";
import Steps from "@/components/affiliate/Steps";
// import Image from "next/image";
// import affiliateBenifit from '@/assets/Affiliate/affiliate-benifit.png'
// import ReviewSection from "@/components/home/ReviewSection";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import InfoCard from "@/components/affiliate/InfoCard";
import { FaExpandArrowsAlt, FaWallet } from "react-icons/fa";
import Heading from "@/components/reusable-components/Heading";
import Paragraph from "@/components/reusable-components/Paragraph";
import BenefitsSwiper from "@/components/affiliate/BenefitsSwiper";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import BannerComponent from "@/components/reusable-components/Banner";
import backgroundImage from '../../../../public/1137.jpg'

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Affiliate",
        description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
        keywords: ["tech element it", "software development", "custom software",
            "web development", "app development", "product development",
            "software solutions", "digital transformation", "scalable software",
            "tech partners", "MVP development", "SaaS", "full-stack development"],
    });
}


export default function Affiliate() {
    return (
        <div className="overflow-hidden">
            <BannerComponent backgroundImage={backgroundImage.src} title={'Join The leading Affiliate Network-Maximize your Profits'} description={'Partner with us, unlock the potential for substantial passive income'}></BannerComponent>
            {/* <AffiliateBanner /> */}
            <HowItWorks />
            <Steps />
            <ReferralLink />
            {/* Responsive Image Section */}
            <section style={{
                background: "radial-gradient(circle, #6A5AFF 0%, #000000 75%)"
            }}>
                <div className='min-h-screen w-full max-w-[1440px] mx-auto '>
                    <div className="px-4 sm:px-6 lg:px-8 mb-16 md:mb-0 ">
                        <Heading className="text-[28px] md:text-[40px] lg:text-[50px] text-center pt-12 md:pt-16 lg:pt-[96px] text-white">
                            Benefits of Affiliate
                        </Heading>
                        <Paragraph className="mt-4 md:mt-6 text-center pb-12 md:pb-20 lg:pb-[140px] max-w-2xl mx-auto text-white">
                            From concept to completion, we build success through every step
                        </Paragraph>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-around gap-8 lg:gap-4 xl:gap-8 px-4 pb-12 md:pb-20">
                        {/* Left Column - Hidden on mobile, shown on tablet and up */}
                        <div className="hidden md:flex flex-col gap-8 lg:gap-12 w-full max-w-[326px] ">
                            <InfoCard
                                icon={<FaExpandArrowsAlt className="text-green-400 text-2xl lg:text-3xl" />}
                                title="Commission Per Sale"
                                description="Earn up to 15% commission on every successful referral!"
                                className="bg-black border border-gray-300"
                            />

                            <InfoCard
                                icon={<FaWallet className="text-cyan-400 text-2xl lg:text-3xl" />}
                                title="Minimum Payout Threshold"
                                description="Get paid when your earnings reach ৳1000"
                                className="bg-transparent bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 "
                            />
                        </div>

                        {/* Center Content - Always visible */}
                        <div>
                            <BenefitsSwiper />
                        </div>

                        {/* Right Column - Hidden on mobile, shown on tablet and up */}
                        <div className="hidden md:flex flex-col gap-8 lg:gap-12 w-full max-w-[326px] ">

                            <InfoCard
                                icon={<FaWallet className="text-cyan-400 text-2xl lg:text-3xl" />}
                                title="Minimum Payout Threshold"
                                description="Get paid when your earnings reach ৳1000"
                                className="bg-transparent bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 "
                            />

                            <InfoCard
                                icon={<FaExpandArrowsAlt className="text-green-400 text-2xl lg:text-3xl" />}
                                title="Commission Per Sale"
                                description="Earn up to 15% commission on every successful referral!"
                                className="bg-black border border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Mobile-only InfoCards - shown below the center content */}
                    <div className="md:hidden flex flex-col gap-8 w-full max-w-md mx-auto px-4 pb-12">
                        <InfoCard
                            icon={<FaExpandArrowsAlt className="text-green-400 text-2xl" />}
                            title="Commission Per Sale"
                            description="Earn up to 15% commission on every successful referral!"
                            className="bg-black"
                        />

                        <InfoCard
                            icon={<FaWallet className="text-cyan-400 text-2xl" />}
                            title="Minimum Payout Threshold"
                            description="Get paid when your earnings reach ৳1000"
                            className="bg-transparent bg-opacity-10 backdrop-blur-md border border-white border-opacity-20"
                        />

                        <InfoCard
                            icon={<FaExpandArrowsAlt className="text-green-400 text-2xl" />}
                            title="Commission Per Sale"
                            description="Earn up to 15% commission on every successful referral!"
                            className="bg-black"
                        />

                        <InfoCard
                            icon={<FaWallet className="text-cyan-400 text-2xl" />}
                            title="Minimum Payout Threshold"
                            description="Get paid when your earnings reach ৳1000"
                            className="bg-transparent bg-opacity-10 backdrop-blur-md border border-white border-opacity-20"
                        />
                    </div>
                </div>
            </section>
            <PricingFAQ />
        </div>
    );
}