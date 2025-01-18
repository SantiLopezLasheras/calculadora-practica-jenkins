/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fondoApp: "#0A192F",
        fondoCalculadora: "#112240",
        botonCalculadora: "#2979FF ",
        botonCalculadoraHover: "#039BE5",
        textoBoton: "#64B5F6 ",
        colorBorder: "#448AFF",
        colorResultado: "#2979ff",
      },
    },
  },
  plugins: [],
};
