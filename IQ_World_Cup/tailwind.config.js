/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
          "primary": "#091426",
          "secondary": "#0058be",
          "secondary-container": "#2170e4",
          "tertiary-container": "#3c2300",
          "on-primary": "#ffffff",
          "on-primary-container": "#8590a6",
          "on-surface": "#1b1b1d",
          "on-surface-variant": "#45474c",
          "outline-variant": "#c5c6cd",
          "surface-container-lowest": "#ffffff",
          "surface-container-low": "#f5f3f4",
          "surface-container": "#f0edef",
          "surface-container-high": "#eae7e9",
      },
      "spacing": {
          "stack_md": "16px",
          "stack_sm": "8px",
          "grid_gap": "24px",
          "stack_lg": "24px",
          "container_padding": "32px"
      },
      "fontFamily": {
          "headline-lg": ["Inter", "sans-serif"],
          "headline-md": ["Inter", "sans-serif"],
          "label-sm": ["Inter", "sans-serif"],
          "label-md": ["Inter", "sans-serif"]
      },
      "fontSize": {
          "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
          "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
          "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
          "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600"}]
      }
    },
  },
  plugins: [],
}
