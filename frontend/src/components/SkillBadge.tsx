import { type Skill } from "@/types/api";
import { Badge } from "@/components/ui/Badge";

interface SkillBadgeProps {
  skill: Skill;
  showDetails?: boolean;
}

const proficiencyColors: Record<string, string> = {
  Beginner: "text-yellow-400",
  Intermediate: "text-accent-400",
  Advanced: "text-matrix-400",
};

const categoryColors: Record<string, string> = {
  Technical: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  "Non-Technical": "bg-purple-500/20 text-purple-300 border-purple-500/40",
};

export const SkillBadge = ({ skill, showDetails = true }: SkillBadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] rounded-lg px-3 py-2 transition-all duration-200 hover:border-matrix-500/30 hover:bg-[#1a1a1a]">
      <span className="font-medium text-[#e0e0e0]">{skill.name}</span>

      {showDetails && (
        <>
          <Badge
            variant="secondary"
            className={`text-xs ${categoryColors[skill.category] || ""}`}
          >
            {skill.category}
          </Badge>
          <span
            className={`text-xs font-medium ${proficiencyColors[skill.proficiency] || ""}`}
          >
            {skill.proficiency}
          </span>
        </>
      )}
    </div>
  );
};
