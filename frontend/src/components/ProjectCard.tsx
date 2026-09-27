import { type Project } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const primaryImage =
    project.images?.find((img) => img.isPrimary) || project.images?.[0];

  return (
    <Link to={`/projects/${project._id}`} className="block group">
      <article className="bg-[#111] border border-[#222] rounded-lg overflow-hidden transition-all duration-300 hover:border-matrix-500/40 hover:shadow-glow">
        {primaryImage ? (
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={primaryImage.URL}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-[#1a1a1a] flex items-center justify-center border-b border-[#222]">
            <span className="text-[#666]">No image</span>
          </div>
        )}

        <div className="p-4">
          <h3 className="text-[#e0e0e0] font-bold text-lg mb-2 group-hover:text-matrix-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-[#999] text-sm mb-3 line-clamp-2">
            {project.description}
          </p>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.techStack.slice(0, 5).map((skill) => (
                <Badge key={skill._id} variant="tech" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
              {project.techStack.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.techStack.length - 5}
                </Badge>
              )}
            </div>
          )}

          {project.liveURL && (
            <span className="text-xs text-accent-400">Live demo available</span>
          )}
        </div>
      </article>
    </Link>
  );
};
