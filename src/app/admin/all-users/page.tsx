

import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Users | Linuxeon",
    description: "Linuxeon is a cutting-edge SMS and bulk messaging platform that enables businesses to send transactional, promotional, and OTP messages globally. Reliable, scalable, and feature-rich messaging solutions.",
    keywords: [
      "linuxeon", "sms service", "bulk sms", "sms marketing",
      "text messaging", "sms gateway", "transactional sms",
      "promotional sms", "otp sms", "sms platform", "messaging api",
      "sms automation", "sms campaign", "sms software", "sms provider",
      "enterprise sms", "sms reseller", "sms gateway api", "global sms"
    ],
  });
}

const Home = () => {
  return (
    <div className="">
    <p>Hi, this is the user page. </p>
    </div>
  )
}

export default Home;