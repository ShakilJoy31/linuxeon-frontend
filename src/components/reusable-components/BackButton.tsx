"use client"

import React from 'react';
import Button from './Button';
import { FaArrowLeft } from "react-icons/fa6";

const BackButton = () => (
    <section>
        <div className="max-w-[1280px] mx-auto pt-6 pl-4 md:pl-0">
                <Button
                    onClick={() => typeof window !== 'undefined' && window.history.back()}
                    className="flex items-center gap-2 text-[#1776BB] hover:text-red-600 font-medium hover:cursor-pointer mb-2 transition-colors duration-200 group py-2 rounded-lg border-none outline-none focus:outline-none focus:ring-0"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-200"><FaArrowLeft size={20}></FaArrowLeft></span>
                    <span>Back to Previous Page</span>
                </Button>
            </div>
    </section>
);

export default BackButton;