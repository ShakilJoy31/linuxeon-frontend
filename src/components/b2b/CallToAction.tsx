"use client";

import React from "react";
import bannerBackgroundImage from "../../assets/b2b/b2b.png";
import logo from '@/assets/Logo/navber-logo.png'
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import Button from "../reusable-components/Button";
import AnimatedText from "../reusable-components/AnimatedText";
import { useRouter } from "next/navigation";

const CallToActionComponent = () => {
    const router = useRouter();
    return (
        <section className="min-h-screen w-full relative overflow-x-hidden">
            {/* Full-width background container */}
            <div
                className="absolute inset-0 w-screen"
                style={{
                    backgroundImage: `url(${bannerBackgroundImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>

            {/* Centered content container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-[1280px] mx-auto px-4">
                {/* Logo */}
                <Image
                    src={logo}
                    alt="Service Banner"
                    width={600}
                    height={400}
                    className="w-[300px] md:w-[400px] h-auto"
                    priority
                />

                <AnimatedText
                    text="Are you ready? Let&apos;s be our client"
                    loop={true}
                    loopDelay={5}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 text-center mt-8"
                />
                <h1 >

                </h1>

                {/* Button */}
                <Button onClick={()=> router.push('/contact')} className="flex items-center gap-2 bg-[#1776BB] hover:bg-[#1E40AF] text-white font-medium px-6 py-3 rounded-lg transition-all">
                    <FaRegStar />
                    Start your project
                </Button>
            </div>
            
        </section>
    );
};

export default CallToActionComponent;