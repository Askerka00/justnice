module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        heebo: ["Heebo", "sans-serif"],
      }
    },
  },
  plugins: [],
}
