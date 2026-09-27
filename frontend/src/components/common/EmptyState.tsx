import { type ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
}

export const EmptyState = ({
  title = "Nothing here yet",
  message = "No items to display at this time.",
  icon,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="text-matrix-500/50 mb-4">{icon}</div>}
      {!icon && (
        <div className="text-matrix-500/50 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a1 1 0 00-1-1h-6a1 1 0 00-1 1v1m1 0l1.5 1.5m-1.5-1.5L11 12m4 10H5a2 2 0 01-2-2V7a2 2 0 012-2h6m5 12a2 2 0 100-4 2 2 0 000 4zm0 0v1m0-1h1m-1 0h-1"
            />
          </svg>
        </div>
      )}
      <h3 className="text-[#e0e0e0] font-medium text-lg mb-2">{title}</h3>
      <p className="text-[#999] text-sm max-w-md">{message}</p>
    </div>
  );
};
