// components/Footer.tsx
import { FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebookF, FaPhone } from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";
import Image from "next/image";
// import siteLogo from "@/assets/Icons/Site-icon.png";
import siteLogo from "@/assets/Logo/navber-logo.png";
import Paragraph from "../reusable-components/Paragraph";
import Heading from "../reusable-components/Heading";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-gray-700 dark:text-gray-300 border-t border-gray-300 pt-8 md:pt-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {/* Logo & Info */}
        <div className="col-span-2">
          <div className="flex gap-x-[29px] mb-3 md:mb-4">
            <Image
              src={siteLogo}
              alt="Tech Element IT Ltd"
              width={160}
              height={60}
              className="w-48 md:w-64 h-8 md:h-12"
            />
            {/* <Paragraph className="text-xs md:text-sm w-full lg:w-[224px] text-center">Instant is a visual, we are ready to give you services</Paragraph> */}
          </div>

          <div className="flex items-start gap-2 mb-2 md:mb-3">
            <MdLocationOn className="text-[#1776BB] text-lg md:text-xl mt-0.5 flex-shrink-0" />
            <Paragraph className="text-xs md:text-sm">
              Lavel, J-16, Lily Pond Center, 3 RK Mission Road, Ittefeq mor, Motijheel, Dhaka-1203
            </Paragraph>
          </div>
          
          <div className="flex items-center gap-2 mb-4 md:mb-2">
            <FaPhone className="text-[#1776BB] rotate-90 flex-shrink-0" />
            <Paragraph className="text-xs md:text-sm">+880 1601-590591</Paragraph>
          </div>
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <MdEmail className="text-[#1776BB] text-lg md:text-xl flex-shrink-0" />
            <Paragraph className="text-xs md:text-sm">techelementit@gmail.com</Paragraph>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
            <Link href="#" className="bg-[#1776BB] hover:bg-[#eb5e30] duration-200 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaTelegramPlane />
            </Link>
            <Link href="#" className="bg-[#1776BB] hover:bg-[#eb5e30] duration-200 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaWhatsapp />
            </Link>
            <Link href="#" className="bg-[#1776BB] hover:bg-[#eb5e30] duration-200 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaInstagram />
            </Link>
            <Link href="#" className="bg-[#1776BB] hover:bg-[#eb5e30] duration-200 text-white p-2 md:p-3 rounded-full text-sm md:text-base">
              <FaFacebookF />
            </Link>
          </div>
        </div>

        {/* Top Trends */}
        <div>
          <Heading className="font-bold mb-2 md:mb-4 text-sm md:text-base">Top Trends</Heading>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
            {[
              "Full-stack Developer",
              "Front-End Development",
              "Back-End Development",
              "Our works",
              "Node.js Developer",
              "React Developer",
              "Android Developer",
              "iOS Developer"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-500 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <Heading className="font-bold mb-2 md:mb-4 text-sm md:text-base">Quick Links</Heading>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
            {[
              "About Us",
              "Contact Us",
              "Technology",
              "Our works",
              "Services",
              "Blogs"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-500 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-2 sm:col-span-1">
          <Heading className="font-bold mb-2 md:mb-4 text-sm md:text-base">Services</Heading>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm grid grid-cols-1">
            {[
              "Full-stack Developer",
              "Front-End Development",
              "Back-End Development",
              "Our works",
              "Node.js Developer",
              "React Developer",
              "Android Developer",
              "iOS Developer"
            ].map((item, index) => (
              <li key={index} className="hover:text-blue-500 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto mt-8 md:mt-10 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center py-4 ">
        <Paragraph className="flex items-center gap-1 mb-2 md:mb-0 text-[14px] ">
          COURTESY 2023 © ALL RIGHTS RESERVED.
        </Paragraph>
        <Paragraph className="flex gap-2 md:gap-4">
          <Link href="/terms-and-condition" className="hover:text-blue-500 cursor-pointer text-[14px]">PRIVACY POLICY</Link>
          <span>|</span>
          <Link href="/terms-and-condition" className="hover:text-blue-500 cursor-pointer text-[14px]">TERMS & CONDITIONS</Link>
        </Paragraph>
      </div>
    </footer>
  );
}