interface IConfigurationProps {
  appName: string;
  appCode: string;
  baseUrl: string;
  baseUrl2: string;
  databaseResetAPI: string;
  favicon: string;
  logo: string;
  invoiceBanner: string;
  progressMessage: string;
  version: string;
}

const version = "V1.0.0";

//////////// BETA VERSION ////////////

export const appConfiguration: IConfigurationProps = {
  appName: "Tech element",
  appCode: "__t_beta__",
  baseUrl: "https://tech-element-backend.vercel.app/api/v1",
  baseUrl2: "https://tech-element-backend.vercel.app/api/v1",
  databaseResetAPI:
    "null",
  favicon: "/iconic.png",
  logo: "/src/assets/longeng.png",
  version,
  invoiceBanner: "",
  progressMessage:
    "Thank you for your interest! 🚀 We're currently working on implementing this feature. Stay tuned, as we'll be activating it very soon!",
};
