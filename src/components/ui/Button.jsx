const VARIANTS = {
  primary:
    "bg-primary text-on-primary shadow-soft hover:bg-primary/90 active:scale-[0.98]",
  secondary:
    "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
  ghost:
    "bg-transparent text-primary hover:bg-primary-container/30",
  outline:
    "bg-transparent border border-outline-variant text-on-surface hover:bg-surface-low",
  danger:
    "bg-error text-on-error hover:bg-error/90",
};

const SIZES = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  pill = true,
  fullWidth = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 font-display font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none",
        pill ? "rounded-full" : "rounded-lg",
        fullWidth ? "w-full" : "",
        VARIANTS[variant],
        SIZES[size],
        className,
      ]
        .join(" ")
        .trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
