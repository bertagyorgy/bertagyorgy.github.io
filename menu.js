function openMenu(menuId) {
    // Elrejti az alapmenü elemeit
    document.querySelector('.menu-buttons').style.display = 'none';
    
    // Megjeleníti az adott almenüt
    document.getElementById(menuId).style.display = 'block';
}

function closeMenu() {
    // Visszahozza az alapmenü elemeit
    document.querySelector('.menu-buttons').style.display = 'block';
    
    // Elrejti az összes almenüt
    document.querySelectorAll('.submenu').forEach(menu => {
        menu.style.display = 'none';
    });
}
function toggleInfoPopup() {
    const popup = document.getElementById("infoPopup");
    popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}
function openOverlay() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("howtoplay").style.display = "block";
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("howtoplay").style.display = "none";
}

let boardSize = 20;

// document.addEventListener('DOMContentLoaded', function () {
//     // Az alapértelmezett rádiógomb értékének beállítása
//     const defaultRadio = document.querySelector('input[name="board-size"]:checked');
//     if (defaultRadio) {
//         boardSize = parseInt(defaultRadio.value, 10); // Alapértelmezett érték eltárolása
//     }

//     // Rádiógombok eseménykezelése
//     document.querySelectorAll('input[name="board-size"]').forEach(radio => {
//         radio.addEventListener('change', function () {
//             boardSize = parseInt(this.value, 10); // Kiválasztott érték eltárolása
//         });
//     });
// });

// // Pályaméret frissítése és URL-hez csatolása
// document.addEventListener('DOMContentLoaded', function () {
//     let boardSize = 20; // Alapértelmezett méret
//     const defaultRadio = document.querySelector('input[name="board-size"]:checked');
//     if (defaultRadio) {
//         boardSize = parseInt(defaultRadio.value, 10); // Alapértelmezett beolvasása
//     }

//     // Pályaméret változtatása
//     document.querySelectorAll('input[name="board-size"]').forEach(radio => {
//         radio.addEventListener('change', function () {
//             boardSize = parseInt(this.value, 10); // Frissítés a kiválasztott értékkel
//         });
//     });

//     // Form elküldése: pályaméret URL-hez csatolása
//     const form = document.querySelector("form");
//     form.addEventListener("submit", (event) => {
//         event.preventDefault(); // Alapértelmezett működés letiltása
//         const actionUrl = form.getAttribute('action'); // Jelenlegi form célja
//         window.location.href = `${actionUrl}?board-size=${boardSize}`; // Új URL generálása
//     });
// });

// // Játékmód kiválasztása és navigáció
// document.addEventListener("DOMContentLoaded", () => {
//     let selectedGameMode = ""; // Alapértelmezett: nincs kiválasztva

//     // Játékmód gombok kezelése
//     document.querySelectorAll("#gamemodes button").forEach(button => {
//         button.addEventListener("click", () => {
//             const href = button.getAttribute("onclick").match(/'(.*?)'/)[1]; // URL kivonása
//             selectedGameMode = href;
//             console.log(`Játékmód kiválasztva: ${selectedGameMode}`);
//         });
//     });

//     // Ellenőrzés form elküldésekor (ha szükséges)
//     const form = document.getElementById("boardSizeForm");
//     if (form) {
//         form.addEventListener("submit", (event) => {
//             if (selectedGameMode) {
//                 form.action = selectedGameMode; // Dinamikus action beállítása
//                 console.log(`Form action frissítve: ${form.action}`);
//             } else {
//                 console.warn("Nincs játékmód kiválasztva!");
//             }
//         });
//     }
// });




