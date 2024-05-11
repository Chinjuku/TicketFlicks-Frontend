import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors : {
      primary: "#22092C",
      secondary: "#872341",
      tertiary: "#BE3144",
      quaternary: "#F05941",
      white: "#fff",
      black: "#000",
      yellow: "#FFE500"
    },
    screens: {
      phone: { min: "275px", max: "611px" },
      tablet: { min: "611px", max: "1120px" },
      laptop: { min: "1121px", max: "1500px" },
      desktop: "1520px"
    }
  },
  plugins: [],
};
export default config;
