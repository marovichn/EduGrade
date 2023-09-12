import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "auth-banner":
          "url(https://as2.ftcdn.net/v2/jpg/02/62/85/83/1000_F_262858317_uFOU2fw0ugoOhg5QoXvX6uiklFieSHpD.jpg)",
      },
    },
  },
  plugins: [],
};
export default config;
