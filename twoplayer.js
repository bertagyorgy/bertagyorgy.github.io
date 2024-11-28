const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// const urlParams = new URLSearchParams(window.location.search);
// const boardSize = parseInt(urlParams.get("board-size"), 10) || 20; // Alapértelmezett: 20

let boardSize = 20;
const cellSize = canvas.width / boardSize;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
let currentPlayer = "X";
let isGameOver = false; // Játék állapotának követése


//Tábla kirajzolása
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ff6600"; // Rácsvonal színe
    ctx.lineWidth = 1;  // Rácsvonal vastagságának visszaállítása

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

// Győzelem ellenőrzése
function checkWin(x, y) {
    const player = board[x][y];
    const directions = [
        { dx: 1, dy: 0 },   // Vízszintes
        { dx: 0, dy: 1 },   // Függőleges
        { dx: 1, dy: 1 },   // Átlós (jobb-le)
        { dx: 1, dy: -1 }   // Átlós (jobb-fel)
    ];

    for (const { dx, dy } of directions) {
        let count = 1;

        // Lépés előre az adott irányban
        for (let step = 1; step < 5; step++) {
            const nx = x + step * dx;
            const ny = y + step * dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }

        // Lépés visszafelé az adott irányban
        for (let step = 1; step < 5; step++) {
            const nx = x - step * dx;
            const ny = y - step * dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }

        // Ellenőrzés, hogy elérte-e az 5-öt
        if (count >= 5) {
            return true;
        }
    }
    return false;
}

// Győztes megjelenítése és tábla zárolása
function showWinner(winner) {
    isGameOver = true; // Játék lezárása
    const winnerModal = document.getElementById("winnerModal");
    const winnerText = document.getElementById("winnerText");
    winnerText.innerText = `A nyertes: ${winner}`;
    winnerModal.style.display = "block";
}

// Játék újraindítása
function restartGame() {
    isGameOver = false; // Játék újraindítása
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Eltüntetjük a régi rajzokat
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null)); // Új tábla
    document.getElementById("winnerModal").style.display = "none"; // Nyertes ablak elrejtése
    currentPlayer = "X"; // Kezdő játékos
    drawBoard(); // Új tábla kirajzolása
}


// Lépés elhelyezése csak akkor, ha a játék nincs lezárva
canvas.addEventListener("click", (e) => {
    if (isGameOver) return; // Ha a játék lezárt, további lépések tiltása

    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);

    if (board[x][y] === null) {
        board[x][y] = currentPlayer;
        drawSymbol(x, y, currentPlayer);
        if (checkWin(x, y)) {
            showWinner(currentPlayer);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
});

// Kezdeti tábla rajzolása
drawBoard();
