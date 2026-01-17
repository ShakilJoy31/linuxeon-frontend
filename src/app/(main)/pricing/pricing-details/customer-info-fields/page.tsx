import CustomerInformationFields from "@/components/pricing/CustomerInformation";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Customer Information",
        description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
        keywords: ["tech element it", "software development", "custom software",
            "web development", "app development", "product development",
            "software solutions", "digital transformation", "scalable software",
            "tech partners", "MVP development", "SaaS", "full-stack development"],
    });
}

const CustomerInfo = () => {
    return (
        <CustomerInformationFields></CustomerInformationFields>
    )
}

export default CustomerInfo;