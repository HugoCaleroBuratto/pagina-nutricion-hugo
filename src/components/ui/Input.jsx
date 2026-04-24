import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { label, suffix, error, className = "", id, ...rest },
  ref
) {
  const inputId = id ?? rest.name;
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wider text-outline uppercase"
        >
          {label}
        </label>
      )}
      <div className="flex items-baseline gap-2">
        <input
          id={inputId}
          ref={ref}
          className="flex-1 bg-transparent border-none p-0 text-2xl font-display font-semibold text-primary focus:outline-none focus:ring-0"
          {...rest}
        />
        {suffix && <span className="text-sm text-outline">{suffix}</span>}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
});
