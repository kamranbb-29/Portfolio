import { useEffect, useState } from "react";
import { aboutApi } from "@/api/about";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ApiError } from "@/api/client";
import type {
  About,
  EducationEntry,
  ExperienceEntry,
  UpdateAboutData,
} from "@/types/api";

export default function AboutManagement() {
  const [formData, setFormData] = useState<UpdateAboutData>({
    biography: "",
    interests: [],
    goals: [],
    education: [],
    experience: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await aboutApi.get();

        setFormData({
          biography: data.biography || "",
          interests: data.interests || [],
          goals: data.goals || [],
          education: data.education || [],
          experience: data.experience || [],
        });
      } catch (err) {
        if (err instanceof ApiError && err.message === "About data not found") {
          return;
        }

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

  const updateField = <K extends keyof UpdateAboutData>(
    field: K,
    value: UpdateAboutData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addInterest = () => {
    updateField("interests", [...(formData.interests || []), ""]);
  };

  const updateInterest = (index: number, value: string) => {
    const interests = [...(formData.interests || [])];
    interests[index] = value;
    updateField("interests", interests);
  };

  const removeInterest = (index: number) => {
    updateField(
      "interests",
      (formData.interests || []).filter((_, i) => i !== index),
    );
  };

  const addGoal = () => {
    updateField("goals", [...(formData.goals || []), ""]);
  };

  const updateGoal = (index: number, value: string) => {
    const goals = [...(formData.goals || [])];
    goals[index] = value;
    updateField("goals", goals);
  };

  const removeGoal = (index: number) => {
    updateField(
      "goals",
      (formData.goals || []).filter((_, i) => i !== index),
    );
  };

  const addEducation = () => {
    const entry: EducationEntry = {
      institution: "",
      degree: "",
      field: "",
      startYear: new Date().getFullYear(),
      endYear: undefined,
      description: "",
    };

    updateField("education", [...(formData.education || []), entry]);
  };

  const updateEducation = (
    index: number,
    field: keyof EducationEntry,
    value: string | number | undefined,
  ) => {
    const education = [...(formData.education || [])];

    education[index] = {
      ...education[index],
      [field]: value,
    };

    updateField("education", education);
  };

  const removeEducation = (index: number) => {
    updateField(
      "education",
      (formData.education || []).filter((_, i) => i !== index),
    );
  };

  const addExperience = () => {
    const entry: ExperienceEntry = {
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    updateField("experience", [...(formData.experience || []), entry]);
  };

  const updateExperience = (
    index: number,
    field: keyof ExperienceEntry,
    value: string,
  ) => {
    const experience = [...(formData.experience || [])];

    experience[index] = {
      ...experience[index],
      [field]: value,
    };

    updateField("experience", experience);
  };

  const removeExperience = (index: number) => {
    updateField(
      "experience",
      (formData.experience || []).filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      await aboutApi.update(formData);
      setSuccess("About data updated successfully");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to update about data");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">About Page</h1>
        <p className="text-[#999] mt-1">
          Manage your biography, interests, goals, education and experience.
        </p>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-matrix-500/10 border border-matrix-500/30 rounded text-matrix-300 text-sm">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Biography */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Biography</h2>

          <TextArea
            label="Biography"
            placeholder="Tell visitors about yourself..."
            value={formData.biography || ""}
            onChange={(e) => updateField("biography", e.target.value)}
            rows={6}
          />
        </section>

        {/* Interests */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Interests</h2>

            <Button type="button" size="sm" onClick={addInterest}>
              Add Interest
            </Button>
          </div>

          <div className="space-y-2">
            {(formData.interests || []).map((interest, index) => (
              <div key={index} className="flex gap-2">
                <input
                  className="flex-1 bg-[#111] border border-[#333] rounded px-3 py-2 text-[#e0e0e0] focus:outline-none focus:border-matrix-500"
                  value={interest}
                  onChange={(e) => updateInterest(index, e.target.value)}
                  placeholder="e.g. Open Source"
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removeInterest(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Goals */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Goals</h2>

            <Button type="button" size="sm" onClick={addGoal}>
              Add Goal
            </Button>
          </div>

          <div className="space-y-2">
            {(formData.goals || []).map((goal, index) => (
              <div key={index} className="flex gap-2">
                <input
                  className="flex-1 bg-[#111] border border-[#333] rounded px-3 py-2 text-[#e0e0e0] focus:outline-none focus:border-matrix-500"
                  value={goal}
                  onChange={(e) => updateGoal(index, e.target.value)}
                  placeholder="e.g. Contribute to open source"
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removeGoal(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Education</h2>

            <Button type="button" size="sm" onClick={addEducation}>
              Add Education
            </Button>
          </div>

          <div className="space-y-6">
            {(formData.education || []).map((entry, index) => (
              <div
                key={index}
                className="p-4 border border-[#333] rounded bg-[#111] space-y-3"
              >
                <input
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                  placeholder="Institution"
                  value={entry.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                />

                <input
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                  placeholder="Degree"
                  value={entry.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                />

                <input
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                  placeholder="Field"
                  value={entry.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    className="bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                    placeholder="Start year"
                    value={entry.startYear}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "startYear",
                        Number(e.target.value),
                      )
                    }
                  />

                  <input
                    type="number"
                    className="bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                    placeholder="End year"
                    value={entry.endYear ?? ""}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "endYear",
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                </div>

                <TextArea
                  label="Description"
                  value={entry.description || ""}
                  onChange={(e) =>
                    updateEducation(index, "description", e.target.value)
                  }
                  rows={3}
                  placeholder="Describe your education..."
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removeEducation(index)}
                >
                  Remove Education
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Experience</h2>

            <Button type="button" size="sm" onClick={addExperience}>
              Add Experience
            </Button>
          </div>

          <div className="space-y-6">
            {(formData.experience || []).map((entry, index) => (
              <div
                key={index}
                className="p-4 border border-[#333] rounded bg-[#111] space-y-3"
              >
                <input
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                  placeholder="Organization"
                  value={entry.organization}
                  onChange={(e) =>
                    updateExperience(index, "organization", e.target.value)
                  }
                />

                <input
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                  placeholder="Role"
                  value={entry.role}
                  onChange={(e) =>
                    updateExperience(index, "role", e.target.value)
                  }
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                    value={entry.startDate}
                    onChange={(e) =>
                      updateExperience(index, "startDate", e.target.value)
                    }
                  />

                  <input
                    type="date"
                    className="bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-[#e0e0e0]"
                    value={entry.endDate || ""}
                    onChange={(e) =>
                      updateExperience(index, "endDate", e.target.value)
                    }
                  />
                </div>

                <TextArea
                  label="Description"
                  value={entry.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={3}
                  placeholder="Describe your experience..."
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removeExperience(index)}
                >
                  Remove Experience
                </Button>
              </div>
            ))}
          </div>
        </section>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
