import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsApi } from "@/api/projects";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types/api";
import { ApiError } from "@/api/client";

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectsApi.getAll();
      setProjects(data.projects);
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

  useEffect(() => {
    void fetchProjects();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete project "${name}"? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      await projectsApi.delete(id);
      setProjects(projects.filter((p) => p._id !== id));
      setActionMessage(`Project "${name}" deleted successfully`);
    } catch (err) {
      if (err instanceof ApiError) {
        setActionMessage(`Error: ${err.message}`);
      } else {
        setActionMessage("Failed to delete project");
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProjects} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-[#999] mt-1">Manage your portfolio projects</p>
        </div>
        <Link to="/admin/projects/new">
          <Button>Add Project</Button>
        </Link>
      </div>

      {actionMessage && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            actionMessage.includes("Error") || actionMessage.includes("Failed")
              ? "bg-red-500/10 border border-red-500/30 text-red-300"
              : "bg-matrix-500/10 border border-matrix-500/30 text-matrix-300"
          }`}
        >
          {actionMessage}
        </div>
      )}

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          message="Create your first project to get started."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="text-left py-3 text-matrix-400 font-medium">
                  Name
                </th>
                <th className="text-left py-3 text-matrix-400 font-medium">
                  Tech Stack
                </th>
                <th className="text-left py-3 text-matrix-400 font-medium">
                  GitHub
                </th>
                <th className="text-left py-3 text-matrix-400 font-medium">
                  Live
                </th>
                <th className="text-right py-3 text-matrix-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b border-[#1a1a1a] hover:bg-[#111]/50 transition-colors"
                >
                  <td className="py-3 text-[#e0e0e0]">{project.name}</td>
                  <td className="py-3 text-[#999]">
                    {project.techStack?.map((s) => s.name).join(", ") ||
                      "—"}
                  </td>
                  <td className="py-3">
                    {project.githubURL ? (
                      <a
                        href={project.githubURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-matrix-400 hover:text-matrix-300"
                      >
                        Link
                      </a>
                    ) : (
                      <span className="text-[#666]">—</span>
                    )}
                  </td>
                  <td className="py-3">
                    {project.liveURL ? (
                      <a
                        href={project.liveURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-400 hover:text-accent-300"
                      >
                        Live
                      </a>
                    ) : (
                      <span className="text-[#666]">—</span>
                    )}
                  </td>
                  <td className="py-3 text-right space-x-1">
                    <Link to={`/admin/projects/edit/${project._id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={deletingId === project._id}
                      onClick={() => handleDelete(project._id, project.name)}
                    >
                      {deletingId === project._id ? "..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
