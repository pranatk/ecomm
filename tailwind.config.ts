import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#007aff",
          secondary: "#0033ff",
          accent: "#ff3900",
          neutral: "#00181e",
          "base-100": "#2a2c3d",
          info: "#00daff",
          success: "#00fda5",
          warning: "#ffd800",
          error: "#ff6e9a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
