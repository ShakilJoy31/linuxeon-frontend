import SignupSection from "@/components/projects/SignupSection";
import TemplateFeatures from "@/components/theme/TemplateFeatures";
import TemplateShowcase from "@/components/theme/TemplateShowcase";
import TemplateStats from "@/components/theme/TemplateStats";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

// Define the theme interfaces based on your API response
export interface ThemeImage {
  id: number;
  themeId: number;
  image: string;
}

export interface Theme {
  id: number;
  name: string;
  description: string;
  link: string;
  image?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  ThemeImage: ThemeImage[];
}

export interface ThemesResponse {
  success: boolean;
  statusCode: number;
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  message: string;
  data: Theme[];
}

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "Tech Element IT | Theme",
        description: "Discover stunning, responsive e-commerce templates built with modern technology. Ready-to-use themes for online stores, organic food markets, and more.",
        keywords: ["e-commerce templates", "website themes", "online store templates", "responsive design", "premium templates", "organic food website", "modern e-commerce"],
    });
}

// Fetch themes data on the server
async function getThemes(): Promise<ThemesResponse> {
  try {
    const response = await fetch('https://tech-element-backend.vercel.app/api/v1/theme/get-theme-all', {
      // Add cache revalidation if needed
      next: { 
        revalidate: 60 // Revalidate every 60 seconds
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch themes');
    }

    const themes: ThemesResponse = await response.json();
    return themes;
  } catch (error) {
    console.error('Error fetching themes:', error);
    // Return empty data structure on error
    return {
      success: false,
      statusCode: 500,
      meta: { page: 1, size: 10, total: 0, totalPage: 1 },
      message: 'Failed to fetch themes',
      data: []
    };
  }
}

const ThemesPage = async () => {
  // Fetch themes data on the server
  const themesData = await getThemes();

  // Log the data for debugging
  console.log('Themes data fetched:', {
    success: themesData.success,
    totalThemes: themesData.data.length,
    themesWithImages: themesData.data.filter(theme => theme.ThemeImage && theme.ThemeImage.length > 0).length
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* <ThemeBanner /> */}
      {/* Pass the fetched data to TemplateShowcase component */}
      <TemplateShowcase themesData={themesData} />
      <TemplateFeatures />
      <TemplateStats />
      <SignupSection />
    </div>
  )
}

export default ThemesPage;