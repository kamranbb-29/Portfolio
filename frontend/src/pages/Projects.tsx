import { useEffect, useState } from "react";
import { projectsApi } from "@/api/projects";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import type { Project, Skill } from "@/types/api";
import { ApiError } from "@/api/client";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getAll();
        setProjects(data.projects);
        setFilteredProjects(data.projects);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load projects");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Full-stack",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) =>
          p.techStack?.some(
            (skill: Skill) =>
              skill.category === category ||
              skill.name.toLowerCase().includes(category.toLowerCase()),
          ),
        ),
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Projects</h1>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={activeCategory === cat ? "primary" : "secondary"}
                className="cursor-pointer"
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects match your filter"
            message="Try adjusting your search or filter criteria."
          />
        )}
      </div>
    </div>
  );
}
