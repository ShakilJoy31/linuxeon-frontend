import { FC } from "react";
import { Users, Lightbulb, Clock } from "lucide-react";
import Heading from "../reusable-components/Heading";
import AnimatedText from "../reusable-components/AnimatedText";
import Paragraph from "../reusable-components/Paragraph";
import HowItWorksCard from "../affiliate/HowItWorksSwiper";



// The images on slide.... 
import demoImage from "@/assets/Service/service-(4).jpg";
import serviceImage1 from "@/assets/Service/service-(1).jpg";
import serviceImage2 from "@/assets/Service/service-(2).jpg";
import serviceImage3 from "@/assets/Service/service-(3).jpg";

const features = [
    {
        icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE5F33]" />,
        title: "Professional Team",
        description: "Our deep understanding of diverse industries empowers us to design customized software solutions.",
    },
    {
        icon: <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE5F33]" />,
        title: "Innovative Solutions",
        description: "",
    },
    {
        icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE5F33]" />,
        title: "On Time Service",
        description: "",
    },
];

const WhyTechElementIt: FC = () => {
    const images = [
        demoImage,
        serviceImage1,
        serviceImage2,
        demoImage,
        serviceImage3,
    ];
    return (
        <section className="bg-[#0A0914] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1280px] mx-auto">
                {/* Heading */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <Heading><AnimatedText
                        text=' Why Tech Element IT Ltd'
                        loop={false}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight"
                    /> </Heading>

                    <Paragraph>
                        <AnimatedText
                            text='Generate highly personalized icebreakers and complete sequences
                        based on your prospects&apos; information.'
                            loop={false}
                            speed={0.02}
                            className="text-gray-300 mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base max-w-full sm:max-w-[600px] md:max-w-[700px] mx-auto"
                        />
                    </Paragraph>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                    {/* Image - Order changes on mobile */}
                    <div className="mt-0 lg:mt-8 ">
                        <HowItWorksCard images={images} />
                    </div>

                    {/* Right Features List */}
                    <div className="order-1 md:order-2 flex flex-col gap-4 sm:gap-6 md:gap-8">
                        {features.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 sm:gap-4">
                                {/* Icon Wrapper */}
                                <div className="bg-[#1776ba73] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-gray-400 text-xs sm:text-sm mt-1">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyTechElementIt;