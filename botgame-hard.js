// Rács megrajzolása a vásznon
function drawGrid() {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    const size = 30; // Cellák mérete a táblán, módosítható

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Tábla törlése

    ctx.strokeStyle = "#ff6600"; // Rácsvonalak színe
    ctx.lineWidth = 1; // Rácsvonalak szélessége

    // Függőleges vonalak
    for (let x = 0; x <= canvas.width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Vízszintes vonalak
    for (let y = 0; y <= canvas.height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Az oldal betöltése után fut
window.onload = function() {
    drawGrid(); // Rács megjelenítése
    // Itt kezdődik a botlogika
};
