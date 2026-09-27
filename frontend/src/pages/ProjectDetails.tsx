import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsApi } from "@/api/projects";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessageWithHomeLink } from "@/components/common/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SkillBadge } from "@/components/SkillBadge";
import type { Project } from "@/types/api";
import { ApiError } from "@/api/client";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid project ID");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const data = await projectsApi.getById(id);
        setProject(data.project);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load project");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <ErrorMessageWithHomeLink message={error} />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <EmptyState
            title="Project not found"
            message="The requested project does not exist or has been removed."
          />
        </div>
      </div>
    );
  }

  const primaryImage =
    project.images?.find((img) => img.isPrimary) || project.images?.[0];

  const handleBack = () => {
    navigate("/projects");
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          onClick={handleBack}
          className="text-matrix-400 hover:text-matrix-300 text-sm font-medium mb-6 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </button>

        <article className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {project.name}
            </h1>
            <p className="text-matrix-400 font-mono text-sm mb-4">
              &gt; {project.description}
            </p>
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((skill) => (
                <SkillBadge key={skill._id} skill={skill} />
              ))}
            </div>
          )}

          {primaryImage && (
            <div className="border border-[#222] rounded-lg overflow-hidden shadow-glow">
              <img
                src={primaryImage.URL}
                alt={project.name}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {project.images && project.images.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images
                .filter((img) => img !== primaryImage)
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="border border-[#222] rounded-lg overflow-hidden aspect-[4/3]"
                  >
                    <img
                      src={img.URL}
                      alt={`${project.name} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          )}

          {project.videoURL && (
            <div className="border border-[#222] rounded-lg overflow-hidden shadow-glow">
              <iframe
                src={project.videoURL}
                title={`${project.name} video`}
                className="w-full aspect-video"
                allowFullScreen
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.githubURL && (
              <a
                href={project.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-matrix-500/30 rounded-lg px-4 py-3 bg-[#111] hover:bg-[#1a1a1a] hover:border-matrix-500/50 transition-all text-matrix-400 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.284-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.527.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.649.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.605-5.475 5.98.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              GitHub Repository
            </a>
            )}

            {project.liveURL && (
              <a
                href={project.liveURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-accent-500/30 rounded-lg px-4 py-3 bg-[#111] hover:bg-[#1a1a1a] hover:border-accent-500/50 transition-all text-accent-400 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H8c-1.657 0-3 .895-3 2v8a2 2 0 002 2h8a2 2 0 002-2v-4M8 6l6 6 6-6"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>

          {project.motivation && (
            <div className="border-t border-[#222] pt-6">
              <h2 className="text-xl font-bold text-white mb-3">
                Project Motivation
              </h2>
              <p className="text-[#ccc] leading-relaxed">
                {project.motivation}
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
