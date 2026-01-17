"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Heading from "../reusable-components/Heading";
import teamMember from '@/assets/About-Us/team-member.png'
import ceo from '@/assets/About-Us/ceo.png'
import Paragraph from "../reusable-components/Paragraph";
import AnimatedText from "../reusable-components/AnimatedText";
import teamMember2 from '@/assets/About-Us/hafsa.png'
import teamMember3 from '@/assets/About-Us/team-menberr (2).png'
import teamMember6 from '@/assets/About-Us/team (2).png'
import teamMember8 from '@/assets/About-Us/WhatsApp Image 2025-08-23 at 13.07.59_322830a0.jpg'
import teamMember9 from '@/assets/About-Us/shakil.png';
import teamMember10 from '@/assets/About-Us/mostofa (2).jpg';
import teamMember11 from '@/assets/About-Us/kawser-app-developer.jpg';

// Social Icons (you can replace these with your actual icon imports)
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const teamMembers = [
    {
        name: "Anamul Hassan",
        title: "HR & Full Stack Developer",
        image: teamMember.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Ms. Hafsa",
        title: "Managing Director (MD)",
        image: teamMember2.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Kamrul Islam",
        title: "Full stack Developer",
        image: teamMember3.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Imran Hossain",
        title: "Frontend Developer",
        image: teamMember6.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Shakidul Islam Shakil",
        title: "Frontend Developer",
        image: teamMember9.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Yousuf Jobayer",
        title: "Frontend Developer",
        image: teamMember8.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Mostofa Kamal",
        title: "Frontend Developer",
        image: teamMember10.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Riyazur Rohman Kawchar",
        title: "Mobile App Developer (Flutter)",
        image: teamMember11.src,
        socials: {
            facebook: "#",
            whatsapp: "#",
            linkedin: "#",
            github: "#"
        }
    },
];

const TeamCard: FC<{ member: typeof teamMembers[0] }> = ({ member }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-[#1a1a1a] rounded-2xl shadow-lg overflow-hidden flex flex-col items-center text-center p-4 relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#222222]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <h3 className="text-lg font-semibold relative z-10">{member.name}</h3>
            <p className="text-gray-400 text-sm mb-[22px] relative z-10">{member.title}</p>

            <div className="w-full h-[280px] flex items-center justify-center overflow-hidden rounded-xl mb-6 bg-white relative">
                <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className={`object-cover transition-all duration-500 ${
                        isHovered ? 'scale-110 brightness-75' : 'scale-100'
                    }`}
                />
                
                {/* Hover gradient effect */}
                <div className={`
                    absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0
                    transition-opacity duration-300
                    ${isHovered ? 'opacity-100' : ''}
                `}></div>
            </div>
        </div>
    );
};

const CEOCard: FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-[#1a1a1a] rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-6 relative w-[282px] group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#222222]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Social Icons Overlay for CEO */}
            <div className={`
                absolute inset-0 bg-black/40 bg-opacity-70 rounded-2xl flex items-center justify-center space-x-4 z-20
                transition-all duration-300 ease-in-out
                ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}>
                <a
                    href="#"
                    className="bg-blue-600 p-3 rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-110 transform"
                >
                    <FacebookIcon />
                </a>
                <a
                    href="#"
                    className="bg-green-600 p-3 rounded-full transition-all duration-300 hover:bg-green-700 hover:scale-110 transform"
                >
                    <WhatsAppIcon />
                </a>
                <a
                    href="#"
                    className="bg-blue-500 p-3 rounded-full transition-all duration-300 hover:bg-blue-600 hover:scale-110 transform"
                >
                    <LinkedInIcon />
                </a>
                <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-full transition-all duration-300 hover:bg-gray-900 hover:scale-110 transform"
                >
                    <GitHubIcon />
                </a>
            </div>

            <h3 className="text-lg font-semibold relative z-10">Md Rasel</h3>
            <p className="text-gray-400 text-sm mb-[22px] relative z-10">Founder & CEO</p>

            <div className="w-full h-[280px] flex items-center justify-center overflow-hidden rounded-xl mb-6 bg-white relative">
                <Image
                    src={ceo}
                    alt='CEO'
                    width={300}
                    height={300}
                    className={`object-cover transition-all duration-500 ${
                        isHovered ? 'scale-110 brightness-75' : 'scale-100'
                    }`}
                />
                
                {/* Hover gradient effect */}
                <div className={`
                    absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0
                    transition-opacity duration-300
                    ${isHovered ? 'opacity-100' : ''}
                `}></div>
            </div>
        </div>
    );
};

const FeaturesSection: FC = () => {
    return (
        <section className="bg-[#111111] text-white pt-8 md:pt-[60px] pb-12 md:pb-[84px] px-4">
            <div className="max-w-[1280px] mx-auto relative">
                {/* Gradient Background */}
                <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] h-[500px] sm:h-[600px] md:h-[800px] lg:h-[1000px] rounded-full opacity-90"
                    style={{ zIndex: 0, background: "linear-gradient(to bottom, #6366F166 0%, #03001400 70%)" }}
                ></div>

                {/* Title */}
                <div className="relative flex justify-center" style={{ zIndex: 10 }}>
                    <Heading>
                        <AnimatedText
                            text='Meet Our Directors'
                            loop={false}
                            className="text-3xl sm:text-4xl md:text-[50px] font-bold text-center mt-8 md:mt-[87px]"
                        />
                    </Heading>
                </div>
                <Paragraph className="text-center mb-[79px]">Meet the Minds Behind the Magic</Paragraph>

                {/* CEO Card */}
                <div className="flex justify-center mb-[70px]">
                    <CEOCard />
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, i) => (
                        <TeamCard key={i} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;