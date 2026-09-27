import { useEffect, useState } from "react";
import { homeApi } from "@/api/home";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ApiError } from "@/api/client";
import type { Home, UpdateHomeData } from "@/types/api";

export default function HomeManagement() {
  const [formData, setFormData] = useState<UpdateHomeData>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await homeApi.get();
        setFormData({
          name: data.name,
          headline: data.headline,
          introduction: data.introduction,
          profileImage: data.profileImage,
          resumeLink: data.resumeLink,
          educationSummary: data.educationSummary,
        });
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load home data");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchHome();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSubmitting(true);

    try {
      await homeApi.update(formData);
      setSuccess("Home data updated successfully");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to update home data");
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
        <div>
          <h1 className="text-2xl font-bold text-white">Home Page</h1>
          <p className="text-[#999] mt-1">Edit home page content</p>
        </div>
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

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <Input
          label="Name"
          placeholder="Your name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Headline"
          placeholder="e.g. Full-stack Developer"
          value={formData.headline || ""}
          onChange={(e) =>
            setFormData({ ...formData, headline: e.target.value })
          }
        />

        <TextArea
          label="Introduction"
          placeholder="A short introduction about yourself"
          value={formData.introduction || ""}
          onChange={(e) =>
            setFormData({ ...formData, introduction: e.target.value })
          }
          rows={4}
        />

        <Input
          label="Profile Image URL"
          placeholder="https://..."
          value={formData.profileImage || ""}
          onChange={(e) =>
            setFormData({ ...formData, profileImage: e.target.value })
          }
        />

        <Input
          label="Resume Link"
          placeholder="https://..."
          value={formData.resumeLink || ""}
          onChange={(e) =>
            setFormData({ ...formData, resumeLink: e.target.value })
          }
        />

        <TextArea
          label="Education Summary"
          placeholder="Brief summary of your education"
          value={formData.educationSummary || ""}
          onChange={(e) =>
            setFormData({ ...formData, educationSummary: e.target.value })
          }
          rows={3}
        />

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
