// import TechnologyBanner from "@/components/technology/TechnologyBanner";
import FrontEndDevelopment from "@/components/technology/FrontEndDevelopment";
import BackEndDevelopment from "@/components/technology/BackendTechnology";
import AppDevelopment from "@/components/technology/AppDevelopment";
import PaymentGateway from "@/components/technology/PaymentGateway";
import Deployment from "@/components/technology/Deployment";
import Database from "@/components/technology/DatabaseUsed";
import MeetingComponent from "@/components/home/MeetingComponent";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import BannerComponent from "@/components/reusable-components/Banner";
import backgroundImage from '../../../../public/23966.jpg'

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Technology",
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
            <BannerComponent backgroundImage={backgroundImage.src} title={'Technology'} description={'Tech Element IT Ltd. is committed to delivering exceptional solutions by utilizing cutting-edge technology stacks.'}></BannerComponent>
            <FrontEndDevelopment></FrontEndDevelopment>
            <BackEndDevelopment></BackEndDevelopment>
            <AppDevelopment></AppDevelopment>
            <Database></Database>
            <PaymentGateway></PaymentGateway>
            <Deployment></Deployment>
            <MeetingComponent></MeetingComponent>
        </div>
    )
}

export default ProjectsPage;
