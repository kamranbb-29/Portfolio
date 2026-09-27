import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { skillsApi } from "@/api/skills";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/Button";
import type { Skill } from "@/types/api";
import { ApiError } from "@/api/client";

export default function SkillManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
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

  useEffect(() => {
    void fetchSkills();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      await skillsApi.delete(id);
      setSkills(skills.filter((s) => s._id !== id));
      setActionMessage(`Skill "${name}" deleted successfully`);
    } catch (err) {
      if (err instanceof ApiError) {
        setActionMessage(`Error: ${err.message}`);
      } else {
        setActionMessage("Failed to delete skill");
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
    return <ErrorMessage message={error} onRetry={fetchSkills} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-[#999] mt-1">Manage your skills</p>
        </div>
        <Link to="/admin/skills/new">
          <Button>Add Skill</Button>
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

      {skills.length === 0 ? (
        <EmptyState
          title="No skills yet"
          message="Create your first skill to get started."
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
                  Category
                </th>
                <th className="text-left py-3 text-matrix-400 font-medium">
                  Proficiency
                </th>
                <th className="text-right py-3 text-matrix-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr
                  key={skill._id}
                  className="border-b border-[#1a1a1a] hover:bg-[#111]/50 transition-colors"
                >
                  <td className="py-3 text-[#e0e0e0]">{skill.name}</td>
                  <td className="py-3 text-[#999]">{skill.category}</td>
                  <td className="py-3 text-[#999]">{skill.proficiency}</td>
                  <td className="py-3 text-right space-x-1">
                    <Link to={`/admin/skills/edit/${skill._id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={deletingId === skill._id}
                      onClick={() => handleDelete(skill._id, skill.name)}
                    >
                      {deletingId === skill._id ? "..." : "Delete"}
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
