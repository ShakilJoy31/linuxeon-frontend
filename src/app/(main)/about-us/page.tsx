
import ApproachSection from "@/components/about-us/ApproachSection";
import GallerySection from "@/components/about-us/GallerySection";
import OurServey from "@/components/about-us/OurServey";
import OurStory from "@/components/about-us/OurStory";
import PurposeSection from "@/components/about-us/PurposeSection";
import TeamSection from "@/components/about-us/TemMember";
import WhyTechElementIt from "@/components/about-us/WhyTechElementIt";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import backgroundImage from '../../../../public/about-us.jpg'
import BannerComponent from "@/components/reusable-components/Banner";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | About Us",
        description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
        keywords: ["tech element it", "software development", "custom software",
            "web development", "app development", "product development",
            "software solutions", "digital transformation", "scalable software",
            "tech partners", "MVP development", "SaaS", "full-stack development"],
    });
}


const AboutUs = () => {
    return (
        <div className="mt-6">
            <BannerComponent backgroundImage={backgroundImage.src} title={'About Us'} description={'Get To Know The People Behind The Pixels – Discover Our Story, Our Mission, And The Experts Powering Tech Element IT Limited.'}></BannerComponent>
            {/* <AboutUsBanner></AboutUsBanner> */}
            <OurStory></OurStory>
            <PurposeSection></PurposeSection>
            <GallerySection></GallerySection>
            <ApproachSection></ApproachSection>
            <TeamSection></TeamSection>
            <OurServey></OurServey>
            <WhyTechElementIt></WhyTechElementIt>
        </div>
    )
}

export default AboutUs;
