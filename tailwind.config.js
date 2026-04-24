/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        "var(--color-bg)",
        surface:   "var(--color-surface)",
        "surface-dim":     "var(--color-surface-dim)",
        "surface-bright":  "var(--color-surface-bright)",
        "surface-lowest":  "var(--color-surface-container-lowest)",
        "surface-low":     "var(--color-surface-container-low)",
        "surface-container":         "var(--color-surface-container)",
        "surface-high":    "var(--color-surface-container-high)",
        "surface-highest": "var(--color-surface-container-highest)",
        "surface-variant": "var(--color-surface-variant)",

        "on-surface":          "var(--color-on-surface)",
        "on-surface-variant":  "var(--color-on-surface-variant)",
        "inverse-surface":     "var(--color-inverse-surface)",
        "inverse-on-surface":  "var(--color-inverse-on-surface)",

        outline:           "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",

        primary:                  "var(--color-primary)",
        "on-primary":             "var(--color-on-primary)",
        "primary-container":      "var(--color-primary-container)",
        "on-primary-container":   "var(--color-on-primary-container)",
        "inverse-primary":        "var(--color-inverse-primary)",

        secondary:                "var(--color-secondary)",
        "on-secondary":           "var(--color-on-secondary)",
        "secondary-container":    "var(--color-secondary-container)",
        "on-secondary-container": "var(--color-on-secondary-container)",

        tertiary:                 "var(--color-tertiary)",
        "on-tertiary":            "var(--color-on-tertiary)",
        "tertiary-container":     "var(--color-tertiary-container)",
        "on-tertiary-container":  "var(--color-on-tertiary-container)",

        error:                   "var(--color-error)",
        "on-error":              "var(--color-on-error)",
        "error-container":       "var(--color-error-container)",
        "on-error-container":    "var(--color-on-error-container)",
      },
      fontFamily: {
        sans:    ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
    },
  },
  plugins: [],
}
