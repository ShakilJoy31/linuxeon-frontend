import PricingCheckout from "@/components/pricing/PricingCheckout";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Pricing Details",
        description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
        keywords: ["tech element it", "software development", "custom software",
      "web development", "app development", "product development",
      "software solutions", "digital transformation", "scalable software",
      "tech partners", "MVP development", "SaaS", "full-stack development"],
    });
}

const ProjectsPage = () => {
    return (
        <div className="mt-16 max-w-[1280px] mx-auto px-2">
            <PricingCheckout></PricingCheckout>
        </div>
    )
}

export default ProjectsPage;








































































// import PaymentMethod from "@/components/pricing/PaymentMethod";
// import PlanDetails from "@/components/pricing/PlanDetails";
// import { generateDynamicMetadata } from "@/metadata/generateMetadata";

// export async function generateMetadata() {
//     return generateDynamicMetadata({
//         title: "Tech Element IT | Pricing Details",
//         description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
//         keywords: ["tech element it", "software development", "custom software",
//       "web development", "app development", "product development",
//       "software solutions", "digital transformation", "scalable software",
//       "tech partners", "MVP development", "SaaS", "full-stack development"],
//     });
// }


// const ProjectsPage = () => {
//     return (
//         <div className="mt-16 max-w-[1280px] mx-auto">

//             <PlanDetails
//                 title="Power Suit Package"
//                 features={[
//                     { text: "User Management"},
//                     { text: "Branco Management" },
//                     { text: "Brance Target Management" },
//                     { text: "Buyer Management" },
//                     { text: "Seller Management" },
//                     { text: "Stock Management" },
//                     { text: "Inventory Management" },
//                     { text: "Stock Adjustment" },
//                     { text: "Stock Transfer" },
//                 ]}
//             />
//             <div className="lg:mx-4 md:mx-2 mx-1 ">
//                 <PaymentMethod></PaymentMethod>
//             </div>

//         </div>
//     )
// }

// export default ProjectsPage;
