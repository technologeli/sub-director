/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const rgb = (cssVar) => {
  return `rgb(var(${cssVar}) / <alpha-value>)`;
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          accent: rgb('--color-accent'),
          muted: rgb('--color-muted'),
          primary: rgb('--color-primary'),
          fill: rgb('--color-fill'),
          'fill-secondary': rgb('--color-fill-secondary'),
          'fill-inverted': rgb('--color-fill-inverted'),
          error: rgb('--color-error'),
          'button-fill': rgb('--color-button-fill'),
          'button-fill-inverted': rgb('--color-button-fill-inverted'),
          'button-text': rgb('--color-button-text'),
          'button-text-inverted': rgb('--color-button-text-inverted'),
          text: rgb('--color-text'),
          'text-inverted': rgb('--color-text-inverted'),
        }
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
