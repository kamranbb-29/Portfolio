import { useEffect, useState } from "react";
import { aboutApi } from "@/api/about";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/Badge";
import type { About } from "@/types/api";
import { ApiError } from "@/api/client";

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await aboutApi.get();
        setAbout(data);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load about data");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <EmptyState title="About data not available" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Biography */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-white mb-6">About</h1>
            <p className="text-[#ccc] leading-relaxed mb-4">
              {about.biography}
            </p>

            {about.goals && about.goals.length > 0 && (
              <div className="mt-6">
                <h3 className="text-matrix-400 font-medium mb-3">Goals</h3>
                <ul className="space-y-2">
                  {about.goals.map((goal, i) => (
                    <li key={i} className="text-[#ccc] flex items-start">
                      <span className="text-matrix-500 mr-2">&gt;</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Interests */}
          {about.interests && about.interests.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Developer Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {about.interests.map((interest, i) => (
                  <Badge key={i} variant="tech">
                    {interest}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {about.education && about.education.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Education</h2>
              <div className="space-y-6">
                {about.education.map((edu) => (
                  <div
                    key={edu._id || `${edu.institution}-${edu.startYear}`}
                    className="border border-[#222] rounded-lg p-4 bg-[#111]/50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-[#e0e0e0] font-bold">{edu.institution}</h3>
                        <p className="text-matrix-400 text-sm">
                          {edu.degree} in {edu.field}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {edu.startYear}
                        {edu.endYear ? ` – ${edu.endYear}` : " – Present"}
                      </Badge>
                    </div>
                    {edu.description && (
                      <p className="text-[#999] text-sm mt-2">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {about.experience && about.experience.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
              <div className="space-y-6">
                {about.experience.map((exp) => (
                  <div
                    key={exp._id || `${exp.organization}-${exp.startDate}`}
                    className="border border-[#222] rounded-lg p-4 bg-[#111]/50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-[#e0e0e0] font-bold">{exp.organization}</h3>
                        <p className="text-matrix-400 text-sm">{exp.role}</p>
                      </div>
                      <Badge variant="secondary">
                        {exp.startDate}
                        {exp.endDate ? ` – ${exp.endDate}` : " – Present"}
                      </Badge>
                    </div>
                    <p className="text-[#999] text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technologies Summary */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Technologies</h2>
            <p className="text-[#999]">
              View my full technology stack on the{" "}
              <a
                href="/skills"
                className="text-matrix-400 hover:text-matrix-300"
              >
                Skills
              </a>{" "}
              page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
