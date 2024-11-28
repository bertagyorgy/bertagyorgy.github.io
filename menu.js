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

function applyBoardSize() {
    // Ellenőrizzük az aktuálisan kiválasztott rádiógombot
    const selectedRadio = document.querySelector('input[name="board-size"]:checked');
    if (selectedRadio) {
        boardSize = parseInt(selectedRadio.value, 10); // Frissítjük a boardSize változót
        // let myVariable = boardSize;
        // document.getElementById("hiddenValue").textContent = myVariable;
        // console.log(document.getElementById("hiddenValue").textContent);
        alert(`Pályaméret frissítve: ${boardSize}x${boardSize}!`);
    } else {
        alert("Hiba: Nincs kiválasztva pályaméret!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("boardSizeForm");
    let selectedGameMode = "twoplayer.html"; // Alapértelmezett játékmód

    // Gombok a játékmódokhoz (az eredeti menüből)
    document.querySelectorAll("#gamemodes button").forEach((button) => {
        button.addEventListener("click", () => {
            const href = button.getAttribute("onclick").match(/'(.*?)'/)[1];
            selectedGameMode = href;
            console.log(`Játékmód kiválasztva: ${selectedGameMode}`);
        });
    });

    // A form action dinamikus frissítése
    form.addEventListener("submit", (event) => {
        form.action = selectedGameMode; // Beállítja a célt a formban
        console.log(`Form action: ${form.action}`);
    });
});



