import { type SelectHTMLAttributes, useId } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = ({
  label,
  error,
  options,
  className = "",
  ...props
}: SelectProps) => {
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

      <select
        id={id}
        className={`w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-[#e0e0e0] focus:outline-none focus:border-matrix-500 focus:shadow-glow transition-all duration-200 ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};
