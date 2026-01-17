
import PricingFAQ from "@/components/pricing/PricingFAQ";
import ServiceFAQ from "@/components/service/ServiceFAQ";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | FAQ",
        description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
        keywords: ["tech element it", "software development", "custom software",
      "web development", "app development", "product development",
      "software solutions", "digital transformation", "scalable software",
      "tech partners", "MVP development", "SaaS", "full-stack development"],
    });
}

const ProjectsPage = () => {
  return (
    <div className="">
       <PricingFAQ />
       <div className="h-[2px] w-full bg-gradient-to-r from-[#1776BB] via-white to-[#eb5e30]"></div>
       <ServiceFAQ></ServiceFAQ>
    </div>
  )
}

export default ProjectsPage;
