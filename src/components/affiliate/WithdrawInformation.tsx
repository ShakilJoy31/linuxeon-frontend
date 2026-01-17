// components/ReferralLink.tsx
"use client";
import React from "react";
import Paragraph from "../reusable-components/Paragraph";
import Button from "../reusable-components/Button";
import { HiSparkles } from "react-icons/hi";

const WithdrayInfo = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center py-16 px-4 dark:bg-gray-900">
            <div>
                <Paragraph className="text-center ">You are able to request a withdrawal as well as your balance reaches the <br /> minimal required amount BDT 1,000</Paragraph>
                <div className="mt-6 flex justify-center ">
                    <Button
                        
                        className="bg-[#EB5C2E] w-[344px] hover:cursor-pointer flex justify-center text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium items-center gap-2 mx-auto lg:mx-0 transition text-sm sm:text-base"
                    >
                        <HiSparkles className="text-lg sm:text-xl" />
                        Request Withdrawal
                    </Button>

                </div>
            </div>
        </section>
    );
};

export default WithdrayInfo;
