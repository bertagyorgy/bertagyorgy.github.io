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

document.addEventListener('DOMContentLoaded', function () {
    // Az alapértelmezett rádiógomb értékének beállítása
    const defaultRadio = document.querySelector('input[name="board-size"]:checked');
    if (defaultRadio) {
        boardSize = parseInt(defaultRadio.value, 10); // Alapértelmezett érték eltárolása
    }

    // Rádiógombok eseménykezelése
    document.querySelectorAll('input[name="board-size"]').forEach(radio => {
        radio.addEventListener('change', function () {
            boardSize = parseInt(this.value, 10); // Kiválasztott érték eltárolása
        });
    });
});

// Pályaméret frissítése
function applyBoardSize() {
    const selectedRadio = document.querySelector('input[name="board-size"]:checked');
    if (selectedRadio) {
        boardSize = parseInt(selectedRadio.value, 10); // Frissítjük a boardSize változót
        alert(`Pályaméret frissítve: ${boardSize}x${boardSize}!`);
    } else {
        alert("Hiba: Nincs kiválasztva pályaméret!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("boardSizeForm");
    let selectedGameMode = "twoplayer.html"; // Alapértelmezett játékmód

    // Játékmódok gombjai
    document.querySelectorAll("#gamemodes button").forEach((button) => {
        button.addEventListener("click", () => {
            const href = button.getAttribute("onclick").match(/'(.*?)'/)[1];
            selectedGameMode = href; // A gomb onclick attribútumából lekérjük a megfelelő játékmód URL-t
            console.log(`Játékmód kiválasztva: ${selectedGameMode}`);
        });
    });

    // Form submit esemény kezelése
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Megakadályozzuk az alapértelmezett form submit-ot
        form.action = `${selectedGameMode}?board-size=${boardSize}`; // Dinamikusan beállítjuk a form action-értékét
        console.log(`Form action beállítva: ${form.action}`);
        window.location.href = form.action; // Átirányítás a megfelelő játékmódra
    });
});


