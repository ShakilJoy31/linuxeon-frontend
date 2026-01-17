
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingHeader from "@/components/pricing/PricingHeader";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Pricing",
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
            {/* <PricingBanner></PricingBanner> */}
            <PricingHeader></PricingHeader>
            <PricingFAQ></PricingFAQ>
        </div>
    )
}

export default ProjectsPage;
