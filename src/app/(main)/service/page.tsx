import RecentService from "@/components/service/RecentService";
// import ServiceBanner from "@/components/service/ServiceBanner";
import ServiceCard from "@/components/service/ServiceCard";
import givingService from "@/assets/Service/giving-service.jpg"
// import Button from "@/components/reusable-components/Button";
import { HiSparkles } from "react-icons/hi";
import ClientSection from "@/components/service/ClientSection";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import givingService2 from "@/assets/Service/service (1).jpg"
import givingService3 from "@/assets/Service/service (2).jpg"
import givingService4 from "@/assets/Service/service (3).jpg"
import givingService5 from "@/assets/Service/service (4).jpg"
import Link from "next/link";
import BannerComponent from "@/components/reusable-components/Banner";
import backgroundImage from '../../../../public/3359736.jpg'

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Service",
        description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
        keywords: ["tech element it", "software development", "custom software",
            "web development", "app development", "product development",
            "software solutions", "digital transformation", "scalable software",
            "tech partners", "MVP development", "SaaS", "full-stack development"],
    });
}

// Service data array with different content for each service
const servicesData = [
    {
        id: "001",
        title: "UI/UX Design",
        items: [
            "UI/UX Consulting",
            "UX Research",
            "Usability Testing",
            "Wireframing",
            "Prototyping",
        ],
        image: givingService.src
    },
    {
        id: "002",
        title: "Web Development",
        items: [
            "Responsive Web Design",
            "Frontend Development",
            "Backend Development",
            "E-commerce Solutions",
            "CMS Development",
        ],
        image: givingService2.src
    },
    {
        id: "003",
        title: "Mobile App Development",
        items: [
            "iOS App Development",
            "Android App Development",
            "Cross-Platform Apps",
            "App UI/UX Design",
            "App Store Optimization",
        ],
        image: givingService3.src
    },
    {
        id: "004",
        title: "Cloud Solutions",
        items: [
            "Cloud Migration",
            "AWS/Azure/GCP Services",
            "Serverless Architecture",
            "Cloud Security",
            "DevOps Implementation",
        ],
        image: givingService4.src
    },
    {
        id: "005",
        title: "Digital Marketing",
        items: [
            "SEO Optimization",
            "Content Marketing",
            "Social Media Management",
            "PPC Campaigns",
            "Analytics & Reporting",
        ],
        image: givingService5.src
    },
];

const ProjectsPage = () => {
    return (
        <div className="mt-16">
            <BannerComponent backgroundImage={backgroundImage.src} title={'Services'} description={'Our web development service helps you build modern, responsive, and user-friendly websites tailored to your needs.'}></BannerComponent>
            {/* <ServiceBanner></ServiceBanner> */}
            <RecentService></RecentService>
            <section className="max-w-[1280px] mx-auto ">
                {servicesData.map((service, index) => (
                    <ServiceCard
                        key={index}
                        id={service.id}
                        title={service.title}
                        items={service.items}
                        image={service.image}
                    />
                ))}
                <div className="flex justify-center mb-[120px] mt-4 ">
                    <Link href='/projects'
                        className="bg-[#1776BB] hover:bg-[#0f5ed1] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center gap-2 mx-auto lg:mx-0 transition text-sm sm:text-base"
                    >
                        <HiSparkles className="text-lg sm:text-xl" />
                        Let&apos;s build something
                    </Link>
                </div>
            </section>
            <section className="max-w-[1280px] mx-auto mb-[9px] ">
                <ClientSection
                    title="Client: Helping brands to grow and say their success stories to the world"
                    description="We are a great team of creatives with a strongest capabilities to helping progressive fields achieve their goals. With the best talent on every project done successfully."
                    tags={[
                        "Data to Design",
                        "Creative Thinking",

                        "Design. Test. Repeat.",

                        "Empathy in Action",
                        "Visual Consistency",
                        "SEO Optimization",
                        "Prototyping and Testing",
                        "Ongoing Refinement",
                        "Easy Cancellations & Refunds",
                        "24/7 Customer Support",

                        "Custom Design",

                        "Secure Payment Processing",
                        "Custom Design",
                        "Real-time Analytics",
                        "Portfolio Showcase",
                    ]}
                />
            </section>
        </div>
    )
}

export default ProjectsPage;