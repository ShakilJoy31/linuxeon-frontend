
import CentralSMSConfigurationPage from "@/components/client-components/SMSconfigurations/CentralConfiguration/CentralSMSConfigList";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import { Suspense } from "react";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Central SMS Configuration | Linuxeon",
    description: "Manage central SMS configurations for the Linuxeon platform. Configure SMS gateways, API keys, and message templates for different services.",
    keywords: [
      "linuxeon", "central sms configuration", "sms gateway", "api configuration",
      "sms settings", "message templates", "bulk sms configuration"
    ],
  });
}

const CentralSMSConfigPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading Central Configuration...</p>
        </div>
      </div>
    }>
      <CentralSMSConfigurationPage />
    </Suspense>
  );
}

export default CentralSMSConfigPage;