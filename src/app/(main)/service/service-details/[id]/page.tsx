import BackButton from "@/components/reusable-components/BackButton";
import BrandExperienceSection from "@/components/service/BrandExperienceSection";
import ServiceDetails from "@/components/service/ServiceDetailsBanner";
import ServiceFAQ from "@/components/service/ServiceFAQ";
import ServiceFeature from "@/components/service/ServiceFeatures";
import ServiceProcess from "@/components/service/ServiceProcess";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Service Details",
        description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
        keywords: ["tech element it", "software development", "custom software",
      "web development", "app development", "product development",
      "software solutions", "digital transformation", "scalable software",
      "tech partners", "MVP development", "SaaS", "full-stack development"],
    });
}

const ProjectsPage = () => {
    return (
        <div className="mt-16">
            <BackButton></BackButton>
            <ServiceDetails></ServiceDetails>
            <ServiceProcess></ServiceProcess>
            <ServiceFeature></ServiceFeature>
            <BrandExperienceSection></BrandExperienceSection>
            <ServiceFAQ></ServiceFAQ>
        </div>
    )
}

export default ProjectsPage;