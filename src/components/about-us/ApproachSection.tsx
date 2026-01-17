// components/ApproachSection.tsx
"use client";
import { Plus } from "lucide-react";
import rightArrow from '@/assets/About-Us/right-arrow.svg'
import Image from "next/image";
import AnimatedText from "../reusable-components/AnimatedText";

export default function ApproachSection() {
    return (
        <section className="w-full bg-white dark:bg-black py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Left label */}
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/5">
                        <p className="text-gray-700 dark:text-gray-300 text-lg">Approach</p>
                    </div>

                    {/* Content */}
                    <div className="md:w-4/5">
                        {/* Heading */}
                        <AnimatedText
                            text='Methos of making better result'
                            loop={false}
                            className="text-4xl md:text-[70px] font-semibold leading-tight mb-12"
                        />

                        {/* 3 Columns */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Trust */}
                            <div className="flex-1">
                                <AnimatedText
                                    text='Trust'
                                    loop={false}
                                    className="text-lg font-semibold text-black dark:text-white"
                                />
                                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300 ">
                                    {[
                                        "Build trust",
                                        "Ensure transparency",
                                        "Honest communication",
                                        "Strong relationships",
                                        "Client respect",
                                        "Partner loyalty",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex items-center max-w-[166px] ">
                                <div className="pt-2">
                                    <Image
                                        src={rightArrow}
                                        alt="About Us Banner"
                                        width={600}
                                        height={400}
                                        className="w-[166px] "
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Collaboration */}
                            <div className="flex-1">
                                <AnimatedText
                                    text='Collaboration'
                                    loop={false}
                                    className="text-lg font-semibold text-black dark:text-white"
                                />

                                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300 ">
                                    {[
                                        "Client success",
                                        "True partnership",
                                        "Active support",
                                        "Collaborative ideation",
                                        "Goal alignment",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex items-center">
                                <div className="pt-2 max-w-[166px]">
                                    <Image
                                        src={rightArrow}
                                        alt="About Us Banner"
                                        width={600}
                                        height={400}
                                        className="w-[166px] "
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Commitment */}
                            <div className="flex-1">
                                <AnimatedText
                                    text='Commitment'
                                    loop={false}
                                    className="text-lg font-semibold text-black dark:text-white"
                                />
                                
                                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300 ">
                                    {[
                                        "Client success",
                                        "True partnership",
                                        "Active support",
                                        "Collaborative ideation",
                                        "Goal alignment",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
