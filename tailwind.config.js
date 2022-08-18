/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e83b6c",
        tags: "#7D6AFF",
        secondary: "#6F5CF1",
        subText: "#757781",
        subButton: "#555b69"
      }
    },
  },
  plugins: [],
}
