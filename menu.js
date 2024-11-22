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

document.addEventListener('DOMContentLoaded', function() {
    // Gombok eseménykezelése, a setActiveButton és setBoardSize hívásával
    document.querySelectorAll('.bbtn').forEach(button => {
        button.addEventListener('click', function() {
            setActiveButton(this);
            const boardSize = this.getAttribute('data-size'); // Kiolvassuk a gomb data-size attribútumát
            setBoardSize(boardSize); // Hívjuk meg a setBoardSize-t a kiválasztott mérettel
        });
    });

    // Az alapértelmezett gomb, ami aktív lesz betöltéskor
    const defaultButton = document.querySelector('.bbtn.active');
    if (defaultButton) {
        setActiveButton(defaultButton);
        const boardSize = defaultButton.getAttribute('data-size');
        setBoardSize(boardSize); // Beállítjuk a táblaméretet alapértelmezetten
    }
});

// A setActiveButton függvény, ami az 'active' osztályt kezeli
function setActiveButton(button) {
    // Minden gombból eltávolítjuk az 'active' osztályt
    const buttons = document.querySelectorAll('.bbtn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Az újonnan választott gombhoz hozzáadjuk az 'active' osztályt
    button.classList.add('active');
}

// A setBoardSize függvény, ami a táblaméretet beállítja
function setBoardSize(size) {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");

    // Frissítjük a boardSize értékét és kiszámítjuk a cellák méretét
    const newBoardSize = parseInt(size); // A gomb data-size attribútuma a méret
    const cellSize = canvas.width / newBoardSize;

    // Frissítjük a tábla méretét
    boardSize = newBoardSize;
    canvas.height = newBoardSize * 30; // A tábla magasságának frissítése is
    canvas.width = newBoardSize * 30;  // A tábla szélessége is változik

    // Frissítjük a táblát, újrarajzoljuk
    drawBoard(cellSize, ctx);
}

// Tábla kirajzolása
function drawBoard(cellSize, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Töröljük a régi táblát
    ctx.strokeStyle = "#ff6600";
    ctx.lineWidth = 1;
    for (let i = 0; i <= boardSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

// Szimbólum kirajzolása (X vagy O)
function drawSymbol(x, y, player) {
    const centerX = x * cellSize + cellSize / 2;
    const centerY = y * cellSize + cellSize / 2;
    const radius = cellSize / 3;

    ctx.lineWidth = 4;
    if (player === "X") {
        ctx.strokeStyle = "#ff0000"; // Piros X
        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY - radius);
        ctx.lineTo(centerX + radius, centerY + radius);
        ctx.moveTo(centerX + radius, centerY - radius);
        ctx.lineTo(centerX - radius, centerY + radius);
        ctx.stroke();
    } else {
        ctx.strokeStyle = "#0000ff"; // Kék O
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

// Kezdeti tábla kirajzolása
drawBoard(cellSize, ctx);


