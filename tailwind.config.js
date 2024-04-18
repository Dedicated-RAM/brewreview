/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        "accent-1": "#FFF8EB",
        "accent-2": "#FFECCC",
        "accent-3": "#DAC095",
        "accent-4": "#7A633E",
        "accent-5": "#634832",
        "accent-6": "#38220F",
      },
      fontFamily: {
        "short-stack": ["'Short Stack'", "cursive"],
      },
    },
  },
  daisyui: {
    darkTheme: false,
  },
  plugins: [require("daisyui")],
};
