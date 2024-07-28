import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffff",

          secondary: "#292524",

          accent: "#1c1917",

          neutral: "#292524",

          "base-100": "#111111",

          info: "#075985",

          success: "#166534",

          warning: "#b45309",

          error: "#be123c",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
export default config;
