import Banner from "@/components/home/Banner";
import CustomServices from "@/components/home/CustomServices";
import IndustryExpertise from "@/components/home/IndustryExpertise";
import KeyServices from "@/components/home/KeyServices";
import MeetingComponent from "@/components/home/MeetingComponent";
import PortfolioSlider from "@/components/home/PortfolioSlider";
import ReviewSection from "@/components/home/ReviewSection";
import StartBuilding from "@/components/home/StartBuilding";
import TrustedByTeam from "@/components/home/TrustedByTeam";
import WhyTechElement from "@/components/home/WhyTechElement";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Tech Element IT",
    description: "Your Vision Our Code & Technology. Building Software to Solve, Scale, and Succeed. From sparking ideas to driving growth, we guide you through every step of product development.",
    keywords: [
      "tech element it", "software development", "custom software",
      "web development", "app development", "product development",
      "software solutions", "digital transformation", "scalable software",
      "tech partners", "MVP development", "SaaS", "full-stack development"
    ],
  });
}

const Home = () => {
  return (
    <div className="bg-[#F4F6F8] dark:bg-gray-600 overflow-x-hidden ">
      <Banner></Banner>
      <div className="dark:bg-black mt-12 md:mt-0 ">
        <CustomServices></CustomServices>
      </div>
      <KeyServices></KeyServices>
      <PortfolioSlider></PortfolioSlider>
      <div className="lg:m-4 md:m-2 m-1">
        <IndustryExpertise></IndustryExpertise>
      </div>
      <MeetingComponent></MeetingComponent>
      <WhyTechElement></WhyTechElement>
      <TrustedByTeam></TrustedByTeam>
      <div className="lg:mx-4 md:mx-2 mx-1">
        <ReviewSection></ReviewSection>
      </div>
      <StartBuilding></StartBuilding>
    </div>
  )
}

export default Home;
