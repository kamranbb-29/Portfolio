import { type TextareaHTMLAttributes, useId } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = ({
  label,
  error,
  className = "",
  rows = 4,
  ...props
}: TextAreaProps) => {
  const id = useId();
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-matrix-400 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-[#e0e0e0] placeholder-[#666] focus:outline-none focus:border-matrix-500 focus:shadow-glow transition-all duration-200 resize-y ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};
