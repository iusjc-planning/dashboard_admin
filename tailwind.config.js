// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Analyse les fichiers HTML et TS d'Angular
    "./node_modules/flowbite/**/*.js" // Analyse les fichiers JS de Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite'), // Ajout du plugin Flowbite
  ],
}
