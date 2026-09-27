import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsApi } from "@/api/projects";
import { skillsApi } from "@/api/skills";
import { homeApi } from "@/api/home";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Project, Skill, Home } from "@/types/api";
import { ApiError } from "@/api/client";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [home, setHome] = useState<Home | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes, homeRes] = await Promise.all([
          projectsApi.getAll(),
          skillsApi.getAll(),
          homeApi.get().catch(() => null),
        ]);
        setProjects(projectsRes.projects);
        setSkills(skillsRes.skills);
        setHome(homeRes);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-[#999] mt-1">Overview of your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-[#222] rounded-lg p-6">
          <div className="text-3xl font-bold text-matrix-400">{projects.length}</div>
          <p className="text-[#999] text-sm mt-1">Projects</p>
          <Link
            to="/admin/projects"
            className="text-matrix-400 text-xs hover:underline mt-2 block"
          >
            Manage projects →
          </Link>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-lg p-6">
          <div className="text-3xl font-bold text-matrix-400">{skills.length}</div>
          <p className="text-[#999] text-sm mt-1">Skills</p>
          <Link
            to="/admin/skills"
            className="text-matrix-400 text-xs hover:underline mt-2 block"
          >
            Manage skills →
          </Link>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-lg p-6">
          <div className="text-3xl font-bold text-matrix-400">
            {home ? "✓" : "—"}
          </div>
          <p className="text-[#999] text-sm mt-1">Home page</p>
          <Link
            to="/admin/home"
            className="text-matrix-400 text-xs hover:underline mt-2 block"
          >
            Edit home →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111] border border-[#222] rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/projects/new">
              <Button variant="secondary" size="sm" className="w-full">
                New Project
              </Button>
            </Link>
            <Link to="/admin/skills/new">
              <Button variant="secondary" size="sm" className="w-full">
                New Skill
              </Button>
            </Link>
            <Link to="/admin/projects">
              <Button variant="ghost" size="sm" className="w-full">
                Manage Projects
              </Button>
            </Link>
            <Link to="/admin/skills">
              <Button variant="ghost" size="sm" className="w-full">
                Manage Skills
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recent Projects</h2>
          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between"
                >
                  <span className="text-[#ccc] text-sm">{project.name}</span>
                  <div className="flex gap-1.5">
                    <Badge variant="tech" className="text-xs">
                      {project.techStack?.length || 0}{" "}
                      {project.techStack?.length === 1 ? "tech" : "techs"}
                    </Badge>
                    <Link to={`/admin/projects/edit/${project._id}`}>
                      <Badge variant="secondary" className="text-xs cursor-pointer">
                        Edit
                      </Badge>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#666] text-sm">No projects yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
