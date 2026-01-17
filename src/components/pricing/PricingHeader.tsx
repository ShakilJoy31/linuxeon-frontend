"use client"

import { useState, useMemo } from "react";
import AnimatedText from "../reusable-components/AnimatedText";
import Button from "../reusable-components/Button";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import PricingCard from "./PricingCard";

export default function PricingHeader() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
    
    const categories = ['All Categories', 'Basic Plan', 'Pro Plan', 'Enterprise', 'Starter', 'Business', 'Mobile Pro', 'Design Expert', 'Tech Plus'];

    const pricingPlans = [
        {
            discountLabel: "50% Off",
            title: "Basic Plan",
            externalLink: "http://proyojonsober.com.bd",
            price: "$9.99",
            period: "month",
            features: [
                "10 projects",
                "5 team members",
                "Basic analytics",
                "Email support",
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        },
        {
            discountLabel: "50% Off",
            title: "Pro Plan",
            externalLink: "https://kryinternational.com",
            price: "$19.99",
            period: "month",
            features: [
                "Unlimited projects",
                "10 team members",
                "Advanced analytics",
                "Priority support",
                "API access"
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        },
        {
            discountLabel: "50% Off",
            title: "Enterprise",
            externalLink: "https://iconicticket.com",
            price: "$49.99",
            period: "month",
            features: [
                "Unlimited projects",
                "Unlimited members",
                "Advanced analytics",
                "24/7 support",
                "API access",
                "Custom integrations"
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        },
        {
            discountLabel: "50% Off",
            title: "Starter",
            externalLink: "https://brack.school.techelementbd.com",
            price: "$4.99",
            period: "month",
            features: [
                "3 projects",
                "2 team members",
                "Basic analytics",
                "Community support"
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        },
        {
            discountLabel: "50% Off",
            title: "Business",
            externalLink: "",
            price: "$29.99",
            period: "month",
            features: [
                "Unlimited projects",
                "20 team members",
                "Advanced analytics",
                "Priority support",
                "API access",
                "Custom reports"
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        },
        {
            discountLabel: "30% Off",
            title: "Mobile Pro",
            externalLink: "",
            price: "$24.99",
            period: "month",
            features: [
                "15 projects",
                "8 team members",
                "Mobile analytics",
                "Priority support",
                "Mobile SDK access"
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        },
        {
            discountLabel: "25% Off",
            title: "Design Expert",
            externalLink: "",
            price: "$34.99",
            period: "month",
            features: [
                "25 projects",
                "12 team members",
                "Design analytics",
                "Design templates",
                "Premium support"
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        },
        {
            discountLabel: "40% Off",
            title: "Tech Plus",
            externalLink: "",
            price: "$39.99",
            period: "month",
            features: [
                "30 projects",
                "15 team members",
                "Advanced analytics",
                "Tech support",
                "API access",
                "Custom integrations"
            ],
            extraLinks: [
                { label: "Sher Hosting - 1000" },
                { label: "VPS Hosting - 2500" },
                { label: "AWS Hosting - 3500" },
            ]
        }
    ];

    // Filter pricing plans based on selected category
    const filteredPricingPlans = useMemo(() => {
        console.log("Selected Category:", selectedCategory);
        
        if (selectedCategory === 'All Categories') {
            const allPlans = pricingPlans;
            console.log("Showing all plans:", allPlans.length);
            return allPlans;
        }
        
        const filtered = pricingPlans.filter(plan => plan.title === selectedCategory);
        console.log(`Filtered plans for "${selectedCategory}":`, filtered);
        return filtered;
    }, [selectedCategory, pricingPlans]);

    const handleCategoryClick = (category: string, e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Category clicked:", category);
        setSelectedCategory(category);

        // Scroll the button into view if it's partially visible
        const button = e.currentTarget;
        const buttonRect = button.getBoundingClientRect();

        // Check if button is partially out of view on the right or left
        const isPartiallyVisible = (
            buttonRect.left >= 0 &&
            buttonRect.right <= window.innerWidth
        );

        // If not fully visible, scroll it into view
        if (!isPartiallyVisible) {
            button.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    return (
        <section className="text-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
            {/* Small pill text */}
            <div className="inline-block mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium px-3 py-1 sm:px-4 sm:py-1 border border-gray-300 rounded-full">
                    Boost your productivity
                </span>
            </div>

            {/* Main heading */}
            <Heading>
                <AnimatedText
                    text="Our Pricing Plans"
                    loop={true}
                    loopDelay={5}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0A0A33] dark:text-white mb-3 sm:mb-4"
                />
            </Heading>

            {/* Subtitle */}
            <Paragraph className="text-gray-700 dark:text-gray-300 max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                <AnimatedText
                    text='Effortlessly turn your ideas into a fully functional, responsive, no-code SaaS website in just minutes with the set of free components for Framer.'
                    loop={false}
                    speed={0.005}
                />
            </Paragraph>

            {/* Category Filter */}
            <div className="relative mb-8 mt-6 max-w-[1280px] mx-auto ">
                <div className="flex overflow-x-auto pb-2 hide-scrollbar md:overflow-visible">
                    <div className="flex space-x-2 min-w-max md:min-w-0 bg-gray-50 dark:bg-gray-900 rounded-lg p-1 shadow-sm">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                onClick={(e) => handleCategoryClick(category, e)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg hover:cursor-pointer font-semibold transition-colors duration-200 whitespace-nowrap ${
                                    selectedCategory === category
                                        ? "bg-[#1776BB] text-white shadow-md"
                                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
                
            </div>

            {/* Cards container */}
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 max-w-[1280px] mx-auto">
                {filteredPricingPlans.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No plans found for {selectedCategory}
                        </p>
                        <Button
                            onClick={() => setSelectedCategory('All Categories')}
                            className="mt-4 bg-[#1776BB] text-white px-6 py-2 rounded-lg hover:bg-[#1466a3] transition-colors"
                        >
                            Show All Plans
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 sm:gap-6 ">
                        {filteredPricingPlans.map((plan, index) => (
                            <div key={`${plan.title}-${index}`} className="w-full max-w-[350px] md:max-w-none">
                                <PricingCard
                                    discountLabel={plan.discountLabel}
                                    title={plan.title}
                                    price={plan.price}
                                    period={plan.period}
                                    externalLink={plan?.externalLink}
                                    features={plan.features}
                                    extraLinks={plan.extraLinks}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}