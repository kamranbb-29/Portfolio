import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { skillsApi } from "@/api/skills";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import type { CreateSkillData, UpdateSkillData } from "@/types/api";
import { ApiError } from "@/api/client";

const CATEGORY_OPTIONS = [
  { value: "", label: "Select category" },
  { value: "Technical", label: "Technical" },
  { value: "Non-Technical", label: "Non-Technical" },
];

const PROFICIENCY_OPTIONS = [
  { value: "", label: "Select proficiency" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

export default function SkillForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      void loadSkill();
    }
  }, [id]);

  const loadSkill = async () => {
    if (!id) return;

    setLoading(true);

    try {
      const data = await skillsApi.getById(id);
      const skill = data.skill;

      setName(skill.name || "");
      setCategory(skill.category || "");
      setProficiency(skill.proficiency || "");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to load skill");
      }
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = "Skill name is required";
    }

    if (!category) {
      errs.category = "Category is required";
    }

    if (!proficiency) {
      errs.proficiency = "Proficiency level is required";
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
      category: category as CreateSkillData["category"],
      proficiency: proficiency as CreateSkillData["proficiency"],
    };

    try {
      if (isEdit) {
        await skillsApi.update(id!, payload as UpdateSkillData);
        setSuccess("Skill updated successfully");
      } else {
        await skillsApi.create(payload as CreateSkillData);
        setSuccess("Skill created successfully");
      }

      setTimeout(() => navigate("/admin/skills"), 1500);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save skill");
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
          {isEdit ? "Edit Skill" : "New Skill"}
        </h1>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/skills")}
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

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <Input
          label="Skill Name"
          placeholder="e.g. TypeScript"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
          required
        />

        <Select
          label="Category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={fieldErrors.category}
          required
        />

        <Select
          label="Proficiency"
          options={PROFICIENCY_OPTIONS}
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          error={fieldErrors.proficiency}
          required
        />

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Saving..." : isEdit ? "Update Skill" : "Create Skill"}
        </Button>
      </form>
    </div>
  );
}
