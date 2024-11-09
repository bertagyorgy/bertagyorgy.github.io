// URL paraméter beolvasása
const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty") || "easy";

// A megfelelő JavaScript fájl betöltése a nehézségi szint alapján
let script = document.createElement("script");
script.src = `botgame-${difficulty}.js`; // Például "botgame-easy.js"
document.body.appendChild(script);
