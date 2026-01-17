import ImageCollage from "@/components/projects/ImageCollage";
import ProjectDescription from "@/components/projects/ProjectDescription";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import FeaturesSection from "@/components/projects/FeaturesSection";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import BackButton from "@/components/reusable-components/BackButton";
import { ProjectResponse } from "@/types/projectType";

// Server-side data fetching
async function getProjectData(id: string): Promise<ProjectResponse | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://tech-element-backend.vercel.app/api/v1';
    const response = await fetch(`${baseUrl}/project/get-project-by-id/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.status}`);
    }
    const data: ProjectResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectData = await getProjectData(id);

  if (!projectData || !projectData.data) {
    return generateDynamicMetadata({
      title: "Project Not Found | Tech Element IT",
      description: "The requested project could not be found.",
    });
  }

  return generateDynamicMetadata({
    title: `${projectData.data.name} | Tech Element IT`,
    description: projectData.data.description,
    keywords: ["tech element it", "software development", projectData.data.category.toLowerCase(), "web development"],
  });
}

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const { id } = await params;
  const projectData = await getProjectData(id);

  if (!projectData || !projectData.data) {
    return (
      <div className="mt-16">
        <BackButton />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4">The project you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const project = projectData.data;

  return (
    <div className="mt-16">
      <BackButton />
      <ProjectShowcase project={project} />
      <ProjectDescription project={project} />
      <ImageCollage project={project} />
      <FeaturesSection project={project} />
    </div>
  );
}

export default ProjectDetailsPage;