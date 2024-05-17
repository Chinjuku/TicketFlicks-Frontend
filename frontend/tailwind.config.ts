import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|progress|button|skeleton|card|ripple|spinner|input|listbox|divider|popover|scroll-shadow).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }
    },
    screens: {
      phone: { min: "275px", max: "611px" },
      tablet: { min: "611px", max: "1120px" },
      laptop: { min: "1121px", max: "1520px" },
      desktop: "1520px"
    }
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      // defaultTheme: "light",
      // defaultExtendTheme: "light",
      themes: {
        light: {
          layout: {},
          colors: {
            primary: "green",
            secondary: "red",
            // @ts-ignore
            tertiary: "blue",
            quaternary: "pink",
            white: "#fff",
            black: "#000",
            yellow: "#FFE500",
            default300: "#15202b",
            default200: "#1e2e3d"
          },
        },
        dark: {
          colors: {
            primary: "#22092C",
            secondary: "#872341",
            // @ts-ignore
            tertiary: "#BE3144",
            quaternary: "#F05941",
            white: "#fff",
            black: "#000",
            yellow: "#FFE500",
            default300: "#15202b",
            default200: "#1e2e3d"
          },
        },
      },
    }),
  ],
};

export default config;
