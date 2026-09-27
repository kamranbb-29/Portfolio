import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorMessage = ({
  message,
  onRetry,
  retryText = "Retry",
}: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-red-400 mb-4">
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
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-[#e0e0e0] mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </div>
  );
};

export const ErrorMessageWithHomeLink = ({
  message,
}: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-red-400 mb-4">
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
            d="M12 8v4m0 4h.01M21 12a9 9 0 01-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-[#e0e0e0] mb-4 max-w-md">{message}</p>
      <Link to="/">
        <Button variant="secondary" size="sm">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};
