import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { homeApi } from "@/api/home";
import { skillsApi } from "@/api/skills";
import { projectsApi } from "@/api/projects";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBadge } from "@/components/SkillBadge";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Home as HomeData, Skill, Project } from "@/types/api";
import { ApiError } from "@/api/client";

export default function Home() {
  const [home, setHome] = useState<HomeData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeData, skillsData, projectsData] = await Promise.all([
          homeApi.get(),
          skillsApi.getAll(),
          projectsApi.getAll(),
        ]);
        setHome(homeData);
        setSkills(skillsData.skills);
        setProjects(projectsData.projects);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load page data");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!home) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState title="Home data not available" />
      </div>
    );
  }

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {home.headline}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Hi, I'm <span className="text-matrix-400">{home.name}</span>
              </h1>
              <p className="text-2xl text-matrix-400 font-mono animate-pulse-glow inline-block">
                &gt; {home.headline}
              </p>
            </div>

            <p className="text-[#ccc] text-lg leading-relaxed">
              {home.introduction}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/projects">
                <Button>View My Work</Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary">Get in Touch</Button>
              </Link>
            </div>

            {home.resumeLink && (
              <div className="pt-2">
                <a
                  href={home.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-matrix-400 hover:text-matrix-300 transition-colors text-sm font-medium"
                >
                  <span>📄 Download Resume</span>
                </a>
              </div>
            )}
          </div>

          {home.profileImage && (
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-matrix-500/30 shadow-glow-lg">
                <img
                  src={home.profileImage}
                  alt={home.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Preview */}
      <section className="container mx-auto px-4 py-12 border-t border-matrix-500/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
          <Link
            to="/skills"
            className="text-matrix-400 hover:text-matrix-300 text-sm font-medium"
          >
            View all
          </Link>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 12).map((skill) => (
              <SkillBadge key={skill._id} skill={skill} />
            ))}
          </div>
        ) : (
          <EmptyState title="No skills listed yet" />
        )}
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-12 border-t border-matrix-500/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
          <Link
            to="/projects"
            className="text-matrix-400 hover:text-matrix-300 text-sm font-medium"
          >
            View all
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState title="No projects yet" />
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 border-t border-matrix-500/10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Let's build something together
          </h2>
          <p className="text-[#999] mb-6 max-w-md mx-auto">
            I'm currently open to collaborate on interesting projects. Feel
            free to reach out!
          </p>
          <Link to="/contact">
            <Button size="lg">Contact Me</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
