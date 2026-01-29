import RecentService from "@/components/service/RecentService";
import ServiceCard from "@/components/service/ServiceCard";
import givingService from "@/assets/Service/giving-service.jpg"
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
        title: "SMS Platform | Services",
        description: "Powerful SMS solutions for business communication. Send bulk SMS, transactional alerts, and marketing campaigns with 99.9% delivery guarantee.",
        keywords: ["sms platform", "bulk sms service", "sms api",
            "transactional sms", "sms marketing", "sms gateway",
            "two-way sms", "sms solutions", "global sms",
            "sms provider", "sms campaign", "sms automation", "sms integration"],
    });
}

// Service data array with different SMS services
const servicesData = [
    {
        id: "001",
        title: "Bulk SMS Service",
        items: [
            "Mass messaging campaigns",
            "Contact list management",
            "SMS scheduling",
            "Delivery reports",
            "Custom sender IDs",
        ],
        image: givingService.src
    },
    {
        id: "002",
        title: "Transactional SMS",
        items: [
            "OTP & authentication",
            "Alerts & notifications",
            "Order confirmations",
            "Appointment reminders",
            "Delivery updates",
        ],
        image: givingService2.src
    },
    {
        id: "003",
        title: "SMS API Integration",
        items: [
            "REST API access",
            "Webhook support",
            "SDK libraries",
            "CRM integration",
            "Custom development",
        ],
        image: givingService3.src
    },
    {
        id: "004",
        title: "Two-Way SMS Platform",
        items: [
            "Inbound message handling",
            "Customer response management",
            "SMS surveys & polls",
            "Interactive campaigns",
            "Auto-responders",
        ],
        image: givingService4.src
    },
    {
        id: "005",
        title: "SMS Marketing Solutions",
        items: [
            "Campaign management",
            "A/B testing",
            "Segmentation tools",
            "Personalization",
            "Analytics & reporting",
        ],
        image: givingService5.src
    },
];

const ProjectsPage = () => {
    return (
        <div className="mt-16">
            <BannerComponent 
                backgroundImage={backgroundImage.src} 
                title={'SMS Services'} 
                description={'Powerful SMS solutions for business communication. Send bulk messages, transactional alerts, and marketing campaigns with 99.9% delivery guarantee.'}
                buttonText="Explore SMS Features"
            />
            <RecentService />
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
                    <Link href='/signup'
                        className="bg-[#1776BB] hover:bg-[#0f5ed1] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center gap-2 mx-auto lg:mx-0 transition text-sm sm:text-base"
                    >
                        <HiSparkles className="text-lg sm:text-xl" />
                        Start Free Trial
                    </Link>
                </div>
            </section>
            <section className="max-w-[1280px] mx-auto mb-[9px] ">
                <ClientSection
                    title="Client Success: Helping businesses communicate better through SMS"
                    description="We empower businesses worldwide with reliable SMS solutions. From startups to enterprises, we provide the tools and support to make your SMS communication seamless and effective."
                    tags={[
                        "99.9% Delivery Rate",
                        "Global Coverage",
                        "Real-Time Analytics",
                        "API First Approach",
                        "24/7 Support",
                        "GDPR Compliant",
                        "Bulk Messaging",
                        "Transactional Alerts",
                        "Two-Way Conversations",
                        "SMS Campaigns",
                        "Scheduled Messages",
                        "Personalization",
                        "Delivery Tracking",
                        "Reporting Dashboard",
                        "Easy Integration",
                        "Scalable Infrastructure",
                        "Multi-Channel Support",
                        "Developer Friendly",
                        "Cost Effective",
                        "Instant Activation",
                    ]}
                />
            </section>
        </div>
    )
}

export default ProjectsPage;