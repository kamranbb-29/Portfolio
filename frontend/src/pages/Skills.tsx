import { useEffect, useState } from "react";
import { skillsApi } from "@/api/skills";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState";
import { SkillBadge } from "@/components/SkillBadge";
import { Badge } from "@/components/ui/Badge";
import type { Skill, SkillCategory } from "@/types/api";
import { ApiError } from "@/api/client";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillsApi.getAll();
        setSkills(data.skills);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load skills");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchSkills();
  }, []);

  const categories: SkillCategory[] = ["Technical", "Non-Technical"];
  const proficiencies = ["Beginner", "Intermediate", "Advanced"];

  const skillsByCategory = (category: SkillCategory) =>
    skills.filter((skill) => skill.category === category);

  const skillsByProficiency = (proficiency: string) =>
    skills.filter((skill) => skill.proficiency === proficiency);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Skills</h1>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Skills</h1>
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Skills</h1>
          <p className="text-[#999] max-w-2xl">
            A collection of my technical and non-technical skills.
          </p>
        </div>

        {skills.length === 0 ? (
          <EmptyState title="No skills listed yet" />
        ) : (
          <div className="space-y-10">
            {categories.map((category) => {
              const catSkills = skillsByCategory(category);
              if (catSkills.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-matrix-400 mb-4">
                    {category}
                  </h2>
                  <div className="space-y-6">
                    {proficiencies.map((prof) => {
                      const profSkills = catSkills.filter(
                        (s) => s.proficiency === prof,
                      );
                      if (profSkills.length === 0) return null;

                      return (
                        <div key={prof} className="space-y-3">
                          <h3 className="text-[#999] font-medium text-sm flex items-center">
                            <Badge variant="tech">{prof}</Badge>
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {profSkills.map((skill) => (
                              <SkillBadge key={skill._id} skill={skill} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
