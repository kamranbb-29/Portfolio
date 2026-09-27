import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectsApi } from "@/api/projects";
import { skillsApi } from "@/api/skills";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import type {
  Project,
  Skill,
  CreateProjectData,
  UpdateProjectData,
} from "@/types/api";
import { ApiError } from "@/api/client";

interface ImageField {
  URL: string;
  isPrimary: boolean;
}

const SKILL_CATEGORIES = ["Technical", "Non-Technical"];
const PROFICIENCIES = ["Beginner", "Intermediate", "Advanced"];

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [motivation, setMotivation] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [liveURL, setLiveURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [images, setImages] = useState<ImageField[]>([
    { URL: "", isPrimary: true },
  ]);

  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(!isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) {
      void loadSkills();
    } else {
      void loadSkillsAndProject();
    }
  }, [id]);

  const loadSkills = async () => {
    try {
      const data = await skillsApi.getAll();
      setAllSkills(data.skills);
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

  const loadSkillsAndProject = async () => {
    setLoading(true);
    try {
      const [skillsRes, projectRes] = await Promise.all([
        skillsApi.getAll(),
        projectsApi.getById(id!),
      ]);
      setAllSkills(skillsRes.skills);

      const project = projectRes.project;
      setName(project.name || "");
      setDescription(project.description || "");
      setMotivation(project.motivation || "");
      setGithubURL(project.githubURL || "");
      setLiveURL(project.liveURL || "");
      setVideoURL(project.videoURL || "");
      setTechStack(project.techStack?.map((s) => s._id) || []);
      setImages(
        project.images?.map((img) => ({
          URL: img.URL,
          isPrimary: img.isPrimary,
        })) || [{ URL: "", isPrimary: true }],
      );
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

  const toggleSkill = (skillId: string) => {
    if (techStack.includes(skillId)) {
      setTechStack(techStack.filter((s) => s !== skillId));
    } else {
      setTechStack([...techStack, skillId]);
    }
  };

  const handleImageChange = (
    idx: number,
    field: "URL" | "isPrimary",
    value: string | boolean,
  ) => {
    const newImages = [...images];
    if (field === "isPrimary") {
      newImages.forEach((img, i) => {
        img.isPrimary = i === idx && value === true;
      });
    } else {
      newImages[idx].URL = value as string;
    }
    setImages(newImages);
  };

  const addImage = () => {
    setImages([...images, { URL: "", isPrimary: false }]);
  };

  const removeImage = (idx: number) => {
    if (images.length === 1) return;
    const newImages = images.filter((_, i) => i !== idx);
    if (!newImages.some((img) => img.isPrimary)) {
      newImages[0].isPrimary = true;
    }
    setImages(newImages);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Project name is required";
    if (!description.trim())
      errs.description = "Project description is required";
    if (!motivation.trim()) errs.motivation = "Project motivation is required";
    if (!githubURL.trim()) errs.githubURL = "GitHub URL is required";
    if (techStack.length === 0)
      errs.techStack = "At least one skill is required for tech stack";
    if (images.length === 0) errs.images = "At least one image is required";
    else {
      const validImages = images.every((img) => img.URL.trim().length > 0);
      if (!validImages) errs.images = "All image URLs must be non-empty";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (!validate()) return;

    setSubmitting(true);
    const payload = {
      name,
      description,
      motivation,
      githubURL,
      ...(liveURL && { liveURL }),
      ...(videoURL && { videoURL }),
      techStack,
      images,
    };

    try {
      if (isEdit) {
        await projectsApi.update(id!, payload as UpdateProjectData);
        setSuccess("Project updated successfully");
      } else {
        await projectsApi.create(payload as CreateProjectData);
        setSuccess("Project created successfully");
      }
      setTimeout(() => navigate("/admin/projects"), 1500);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save project");
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

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? "Edit Project" : "New Project"}
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/projects")}
        >
          Cancel
        </Button>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Project Name"
          placeholder="e.g. Portfolio Website"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
          required
        />

        <TextArea
          label="Description"
          placeholder="Short description of the project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={fieldErrors.description}
          rows={3}
          required
        />

        <TextArea
          label="Motivation"
          placeholder="Why did you build this project? What problem does it solve?"
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          error={fieldErrors.motivation}
          rows={4}
          required
        />

        <Input
          label="GitHub URL"
          placeholder="https://github.com/..."
          value={githubURL}
          onChange={(e) => setGithubURL(e.target.value)}
          error={fieldErrors.githubURL}
          required
        />

        <Input
          label="Live URL (optional)"
          placeholder="https://..."
          value={liveURL}
          onChange={(e) => setLiveURL(e.target.value)}
        />

        <Input
          label="Video URL (optional)"
          placeholder="https://www.youtube.com/embed/..."
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-matrix-400 mb-2">
            Tech Stack (select related skills)
          </label>
          {fieldErrors.techStack && (
            <p className="text-red-400 text-sm mb-2">{fieldErrors.techStack}</p>
          )}
          {fieldErrors.skillLoad && (
            <p className="text-red-400 text-sm mb-2">{fieldErrors.skillLoad}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {allSkills.map((skill) => (
              <label
                key={skill._id}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${
                  techStack.includes(skill._id)
                    ? "bg-matrix-500/20 border border-matrix-500 text-matrix-300"
                    : "bg-[#111] border border-[#222] text-[#999] hover:bg-[#1a1a1a]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={techStack.includes(skill._id)}
                  onChange={() => toggleSkill(skill._id)}
                  className="text-matrix-500 focus:ring-matrix-500"
                />
                <span className="text-sm">{skill.name}</span>
                <span className="text-xs opacity-50">({skill.category})</span>
              </label>
            ))}
          </div>
          {allSkills.length === 0 && (
            <p className="text-[#666] text-sm">
              No skills found. Create skills first.
            </p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-matrix-400 mb-2">
            Images
          </label>
          {fieldErrors.images && (
            <p className="text-red-400 text-sm mb-2">{fieldErrors.images}</p>
          )}
          <div className="space-y-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 bg-[#111] border border-[#222] rounded"
              >
                <Input
                  label={`Image URL #${idx + 1}`}
                  placeholder="https://..."
                  value={img.URL}
                  onChange={(e) =>
                    handleImageChange(idx, "URL", e.target.value)
                  }
                  className="flex-1"
                />
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={img.isPrimary}
                    onChange={(e) =>
                      handleImageChange(idx, "isPrimary", e.target.checked)
                    }
                    className="text-matrix-500 focus:ring-matrix-500"
                  />
                  <span className="text-[#ccc]">Primary</span>
                </label>
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-red-400 hover:text-red-300"
                    title="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImage}
            className="mt-2 text-matrix-400 hover:text-matrix-300 text-sm font-medium"
          >
            + Add Image
          </button>
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting
            ? "Saving..."
            : isEdit
              ? "Update Project"
              : "Create Project"}
        </Button>
      </form>
    </div>
  );
}
